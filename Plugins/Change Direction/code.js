// Change Direction — flip Auto Layout + text direction (RTL/LTR), with UI + report.
// Frame geometry uses the swapPair engine (fewest writes; preserves variable bindings).
// Handles HORIZONTAL (reverse + padding + align), VERTICAL/GRID (align), corner radius,
// stroke weights, and shadow offset. GRID cells are NOT reordered (unsupported).
// On top of it:
//   - v2 UI (RTL / LTR + Swap-icons checkbox + Apply).
//   - direction-aware + idempotent via pluginData('cd_dir') (re-running same direction = no-op).
//   - report (count table) + master-components list behind touched instances (click to select).
//   - instances handled by reconcileInstance (v1-complex formula): mirror ONLY the radius/border
//     props the instance already overrides; internals are never opened.
//   - bounded swap-icons (SECTION-scoped counterpart search, no full-document scan).
// Manifest uses documentAccess: "dynamic-page" (required — full access errors the plugin env on
// large libraries). Master resolution goes through getMainComponentAsync (async path below).

figma.showUI(__html__, { width: 340, height: 480, themeColors: true });

let origin = null;       // page+selection+viewport snapshot for the Return button
let lastTarget = 'RTL';
let topMasters = [];

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'apply') {
    try { await run(msg.target, !!msg.swapIcons, !!msg.swapAbsolute); }
    catch (e) { figma.ui.postMessage({ type: 'result', error: true, text: 'خطای کلی: ' + e.message }); }
  } else if (msg.type === 'selectInstances') {
    await selectInstances(msg.ids);
  } else if (msg.type === 'drill') {
    await drillInto(msg.id);
  } else if (msg.type === 'goSelection') {
    await goSelection();
  } else if (msg.type === 'navigate') {
    await navigateTo(msg.id);
  } else if (msg.type === 'return') {
    await returnToOrigin();
  } else if (msg.type === 'close') {
    figma.closePlugin();
  }
};

function newStats() {
  return { frames: 0, texts: 0, instances: 0, icons: 0, iconsMissed: 0, shapes: 0, errors: 0, masters: 0, absolutes: 0 };
}

// ---------- Orchestrator ----------
async function run(target /* 'RTL' | 'LTR' */, swapIcons, swapAbsolute) {
  const selection = figma.currentPage.selection;
  if (!selection.length) {
    figma.ui.postMessage({ type: 'result', error: true, text: '⚠️ چیزی انتخاب نشده' });
    return;
  }

  origin = {
    pageId: figma.currentPage.id,
    selectionIds: selection.map(n => n.id),
    center: { x: figma.viewport.center.x, y: figma.viewport.center.y },
    zoom: figma.viewport.zoom
  };

  lastTarget = target;
  const stats = newStats();
  const t0 = Date.now();

  const instanceNodes = await applyToNodes(selection, target, swapIcons, swapAbsolute, stats);
  stats.applyMs = Date.now() - t0;

  const tMasters = Date.now();
  const masters = await collectMasters(instanceNodes, target);
  stats.mastersMs = Date.now() - tMasters;
  stats.masters = masters.length;
  topMasters = masters;

  stats.elapsedMs = Date.now() - t0;

  figma.ui.postMessage({ type: 'result', target: target, stats: stats });
  figma.ui.postMessage({ type: 'masters', items: masters, root: true });
}

async function applyToNodes(nodes, target, swapIcons, swapAbsolute, stats) {
  const textNodes = [];
  const iconNodes = [];
  const instanceNodes = [];
  const absoluteNodes = [];
  for (const node of nodes) traverse(node, target, swapIcons, swapAbsolute, stats, textNodes, iconNodes, instanceNodes, absoluteNodes);
  await flipTexts(textNodes, target, stats);
  await swapIconsPhase(iconNodes, target, stats);
  for (const inst of instanceNodes) reconcileInstance(inst, target, stats);
  swapAbsolutePhase(absoluteNodes, target, stats);
  return instanceNodes;
}

// ---------- Traversal ----------
function traverse(node, target, swapIcons, swapAbsolute, stats, textNodes, iconNodes, instanceNodes, absoluteNodes) {
  try {
    const already = ('getPluginData' in node) && node.getPluginData('cd_dir') === target;

    // 0) absolute-positioned node — collect for the position-mirror phase (self-idempotent,
    //    so collected regardless of `already`; works for any node type incl. INSTANCE).
    if (swapAbsolute && ('layoutPositioning' in node) && node.layoutPositioning === 'ABSOLUTE') {
      absoluteNodes.push(node);
    }

    // 1) left/right icon instance — swap component (not flipped). Checked before instance.
    if (swapIcons && iconNeedsSwap(node)) {
      if (!already) iconNodes.push(node);
      return;
    }

    // 2) instance — collect for reconcile; internals not opened.
    if (node.type === 'INSTANCE') {
      instanceNodes.push(node);
      stats.instances++;
      return;
    }

    const isAuto = (node.type === 'FRAME' || node.type === 'COMPONENT' || node.type === 'COMPONENT_SET')
      && 'layoutMode' in node && node.layoutMode !== 'NONE';

    // alignment is independent of the cd_dir swap-guard (flipAlignment self-guards via cd_align),
    // so it is corrected even when this node already has a stale cd_dir tag.
    if (isAuto) flipAlignment(node, target, stats);

    if (!already) {
      if (isAuto) {
        if (node.layoutMode === 'HORIZONTAL') {
          reverseChildrenOrder(node, stats);
          swapPadding(node, stats);
        } else if (node.layoutMode === 'GRID') {
          swapPadding(node, stats); // cells are NOT reordered — grid cell-reversal is unsupported
        }
        swapCornerRadius(node, stats);
        swapBorders(node, stats);
        flipEffects(node, stats);
        stats.frames++;
      } else {
        swapCornerRadius(node, stats);
        swapBorders(node, stats);
        flipEffects(node, stats);
        if (node.type !== 'TEXT') stats.shapes++;
      }

      markDir(node, target);
    }

    if (node.type === 'TEXT') textNodes.push(node);

    if ('children' in node) {
      for (const child of node.children) traverse(child, target, swapIcons, swapAbsolute, stats, textNodes, iconNodes, instanceNodes, absoluteNodes);
    }
  } catch (e) {
    stats.errors++;
  }
}

function markDir(node, target) {
  try { if ('setPluginData' in node) node.setPluginData('cd_dir', target); } catch (e) {}
}

// ---------- Master list + navigation (report) ----------
async function collectMasters(instanceNodes, target) {
  const map = new Map();
  for (const inst of instanceNodes) {
    try {
      const m = inst.getMainComponentAsync ? await inst.getMainComponentAsync() : inst.mainComponent;
      if (!m) continue;
      const tgt = (m.parent && m.parent.type === 'COMPONENT_SET') ? m.parent : m;
      const e = map.get(tgt.id);
      if (e) { e.count++; e.instanceIds.push(inst.id); }
      else {
        const applied = ('getPluginData' in tgt) && tgt.getPluginData('cd_dir') === target;
        map.set(tgt.id, { id: tgt.id, name: tgt.name, count: 1, instanceIds: [inst.id], applied: applied });
      }
    } catch (e) {}
  }
  return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
}

function collectInstancesUnder(node, out) {
  if (node.type === 'INSTANCE') { out.push(node); return; }
  if ('children' in node) for (const c of node.children) collectInstancesUnder(c, out);
}

async function drillInto(id) {
  try {
    const node = await figma.getNodeByIdAsync(id);
    if (!node) return;
    await navigateTo(id);
    const out = [];
    collectInstancesUnder(node, out);
    const masters = await collectMasters(out, lastTarget);
    figma.ui.postMessage({ type: 'masters', items: masters, root: false });
  } catch (e) {}
}

async function goSelection() {
  await returnToOrigin();
  figma.ui.postMessage({ type: 'masters', items: topMasters, root: false });
}

async function selectInstances(ids) {
  try {
    const nodes = [];
    for (const id of (ids || [])) { const n = await figma.getNodeByIdAsync(id); if (n) nodes.push(n); }
    if (!nodes.length) return;
    let page = nodes[0]; while (page && page.type !== 'PAGE') page = page.parent;
    if (page && figma.currentPage.id !== page.id) await figma.setCurrentPageAsync(page);
    const onPage = nodes.filter(n => { let p = n; while (p && p.type !== 'PAGE') p = p.parent; return p && p.id === figma.currentPage.id; });
    if (!onPage.length) return;
    figma.currentPage.selection = onPage;
    figma.viewport.scrollAndZoomIntoView(onPage);
  } catch (e) {}
}

async function navigateTo(id) {
  try {
    const node = await figma.getNodeByIdAsync(id);
    if (!node) return;
    let page = node;
    while (page && page.type !== 'PAGE') page = page.parent;
    if (page && figma.currentPage.id !== page.id) await figma.setCurrentPageAsync(page);
    figma.currentPage.selection = [node];
    figma.viewport.scrollAndZoomIntoView([node]);
  } catch (e) {}
}

async function returnToOrigin() {
  if (!origin) return;
  try {
    const page = await figma.getNodeByIdAsync(origin.pageId);
    if (page && page.type === 'PAGE' && figma.currentPage.id !== page.id) await figma.setCurrentPageAsync(page);
    const nodes = [];
    for (const id of origin.selectionIds) { const n = await figma.getNodeByIdAsync(id); if (n) nodes.push(n); }
    if (nodes.length) figma.currentPage.selection = nodes;
    figma.viewport.center = origin.center;
    figma.viewport.zoom = origin.zoom;
  } catch (e) {}
}

// ---------- Instances: reconcile ONLY own overrides (v1-complex formula) ----------
function reconcileInstance(inst, target, stats) {
  try {
    const f = instanceOwnOverrides(inst);

    // alignment: governed by its OWN cd_align tag (flipAlignment self-guards), independent of the
    // cd_dir swap-guard below. Flip ONLY when the horizontal-axis align field is itself overridden,
    // so we never write a new override onto an inherited field.
    if (f && f.length) {
      const alignAxis = inst.layoutMode === 'HORIZONTAL' ? 'primaryAxisAlignItems'
                      : (inst.layoutMode === 'VERTICAL' || inst.layoutMode === 'GRID') ? 'counterAxisAlignItems'
                      : null;
      if (alignAxis && f.indexOf(alignAxis) !== -1) flipAlignment(inst, target, stats);
    }

    // swaps below are non-idempotent toggles → gated by the cd_dir guard.
    if (('getPluginData' in inst) && inst.getPluginData('cd_dir') === target) return;
    if (!f || !f.length) { markDir(inst, target); return; }
    const has = (n) => f.indexOf(n) !== -1;

    if (has('topLeftRadius') || has('topRightRadius') || has('bottomLeftRadius') ||
        has('bottomRightRadius') || has('cornerRadius') || has('rectangleCornerRadii')) {
      swapPairIfAsym(inst, 'topLeftRadius', 'topRightRadius', stats);
      swapPairIfAsym(inst, 'bottomLeftRadius', 'bottomRightRadius', stats);
    }
    if (has('strokeLeftWeight') || has('strokeRightWeight') || has('strokeWeight')) {
      swapPairIfAsym(inst, 'strokeLeftWeight', 'strokeRightWeight', stats);
    }
    if (has('paddingLeft') || has('paddingRight')) {
      swapPairIfAsym(inst, 'paddingLeft', 'paddingRight', stats);
    }
    if (has('effects')) {
      mirrorEffectsOffset(inst);
    }
    markDir(inst, target);
  } catch (e) { stats.errors++; }
}

function instanceOwnOverrides(inst) {
  try {
    const ov = inst.overrides;
    if (!ov || !ov.length) return null;
    for (const o of ov) if (o.id === inst.id && o.overriddenFields) return o.overriddenFields;
    return null;
  } catch (e) { return null; }
}

function swapPairIfAsym(el, leftField, rightField, stats) {
  try {
    if (!(leftField in el && rightField in el)) return false;
    if (el[leftField] === el[rightField]) return false;
    swapPair(el, leftField, rightField, stats);
    return true;
  } catch (e) { return false; }
}

function mirrorEffectsOffset(node) {
  if (!('effects' in node) || !node.effects || !node.effects.length) return false;
  let changed = false;
  const eff = node.effects.map(e => {
    if ((e.type === 'DROP_SHADOW' || e.type === 'INNER_SHADOW') && e.offset && e.offset.x !== 0) {
      changed = true;
      return Object.assign({}, e, { offset: { x: -e.offset.x, y: e.offset.y } });
    }
    return e;
  });
  if (changed) node.effects = eff;
  return changed;
}

// minimal-write left/right pair swap (used by reconcileInstance only)
function swapPair(el, leftField, rightField, stats) {
  try {
    if (!(leftField in el && rightField in el)) return;
    const lv = el[leftField], rv = el[rightField];
    const bv = el.boundVariables || {};
    const lb = bv[leftField], rb = bv[rightField];
    const canBind = 'setBoundVariable' in el;
    if (lb && rb) {
      if (lb === rb) return;
      if (canBind) { el.setBoundVariable(leftField, rb); el.setBoundVariable(rightField, lb); }
    } else if (lb && !rb) {
      if (canBind) { el.setBoundVariable(rightField, lb); el.setBoundVariable(leftField, null); }
      el[leftField] = rv;
    } else if (!lb && rb) {
      if (canBind) { el.setBoundVariable(leftField, rb); el.setBoundVariable(rightField, null); }
      el[rightField] = lv;
    } else {
      if (lv === rv) return;
      el[leftField] = rv; el[rightField] = lv;
    }
  } catch (e) { stats.errors++; }
}

// ---------- Frame geometry (swapPair engine — fewest writes, preserves variable bindings) ----------
function swapPadding(element, stats) {
  swapPair(element, 'paddingLeft', 'paddingRight', stats);
}

function swapCornerRadius(element, stats) {
  swapPair(element, 'topLeftRadius', 'topRightRadius', stats);
  swapPair(element, 'bottomLeftRadius', 'bottomRightRadius', stats);
}

function swapBorders(element, stats) {
  swapPair(element, 'strokeLeftWeight', 'strokeRightWeight', stats);
}

// flip horizontal offset of drop/inner shadows; no-op when offset.x === 0 (symmetric shadows)
function flipEffects(node, stats) {
  try {
    if (!('effects' in node) || !node.effects || !node.effects.length) return;
    let changed = false;
    const eff = node.effects.map(e => {
      if ((e.type === 'DROP_SHADOW' || e.type === 'INNER_SHADOW') && e.offset && e.offset.x !== 0) {
        changed = true;
        return Object.assign({}, e, { offset: { x: -e.offset.x, y: e.offset.y } });
      }
      return e;
    });
    if (changed) node.effects = eff;
  } catch (error) { stats.errors++; }
}

function reverseChildrenOrder(frame, stats) {
  try {
    if (frame.layoutMode === 'HORIZONTAL' && frame.children.length > 1) {
      const children = [...frame.children];
      children.reverse();
      children.forEach((child, index) => frame.insertChild(index, child));
      return true;
    }
    return false;
  } catch (error) { stats.errors++; return false; }
}

// Symmetric horizontal MIRROR of an auto-layout frame's alignment: swap the left/right axis BOTH
// ways (MIN<->MAX), so a right-aligned (MAX) row flips to left (MIN) and vice-versa. Reads the axis
// that maps to left/right: primaryAxisAlignItems for HORIZONTAL, counterAxisAlignItems for
// VERTICAL/GRID. CENTER / SPACE_BETWEEN are left untouched.
// Idempotency: a mirror is its own inverse, so the value alone can't tell "already mirrored" from
// "authored that way". Each node is tagged with pluginData('cd_align') = the direction it was last
// mirrored to; an UNTAGGED node is treated as authored 'LTR'. RTL on untagged -> flip + tag RTL;
// RTL again -> no-op; LTR -> un-mirror; LTR on untagged (assumed LTR) -> no-op. INDEPENDENT of the
// geometry 'cd_dir' tag, so alignment is corrected on the first press even when cd_dir is stale.
function flipAlignment(frame, target, stats) {
  try {
    const cur = (('getPluginData' in frame) && frame.getPluginData('cd_align')) || 'LTR';
    if (cur === target) return false;
    const axis = frame.layoutMode === 'HORIZONTAL' ? 'primaryAxisAlignItems'
               : (frame.layoutMode === 'VERTICAL' || frame.layoutMode === 'GRID') ? 'counterAxisAlignItems'
               : null;
    if (!axis) return false;
    const a = frame[axis];
    let changed = false;
    if (a === 'MIN') { frame[axis] = 'MAX'; changed = true; }
    else if (a === 'MAX') { frame[axis] = 'MIN'; changed = true; }
    if (changed && ('setPluginData' in frame)) frame.setPluginData('cd_align', target);
    return changed;
  } catch (error) { stats.errors++; return false; }
}

// ---------- Absolute-positioned nodes (optional, behind "Swap absolute" checkbox) ----------
// Symmetric horizontal MIRROR: swap the horizontal constraint BOTH ways (MIN<->MAX) and mirror x
// within the parent (x = parentW - x - width), preserving the edge gap. A right-pinned (MAX) close
// button moves to the left (MIN); a left-pinned (MIN) element moves right. Only MIN/MAX handled —
// CENTER/STRETCH/SCALE left untouched.
// Idempotency: a mirror is its own inverse, so each node is tagged with its current direction in
// pluginData('cd_abs'); an UNTAGGED node is treated as authored 'LTR'. Re-running the same
// direction is a no-op; the opposite direction un-mirrors. Independent of the geometry 'cd_dir'
// tag, so phase ordering vs reconcileInstance doesn't matter. Works on any node incl. INSTANCE
// (writes an x/constraints override on the instance's OWN node only).
function swapAbsolutePhase(nodes, target, stats) {
  for (const n of nodes) {
    try {
      const cur = (('getPluginData' in n) && n.getPluginData('cd_abs')) || 'LTR';
      if (cur === target) continue; // already in this direction
      if (!('constraints' in n) || !n.constraints) continue;
      const c = n.constraints;
      const parent = n.parent;
      if (!parent || !('width' in parent)) continue;
      if (c.horizontal === 'MIN' || c.horizontal === 'MAX') {
        n.x = parent.width - n.x - n.width;
        n.constraints = { horizontal: c.horizontal === 'MIN' ? 'MAX' : 'MIN', vertical: c.vertical };
        if ('setPluginData' in n) n.setPluginData('cd_abs', target);
        stats.absolutes++;
      }
    } catch (e) { stats.errors++; }
  }
}

// ---------- Text (target-aware, mixed-font safe) ----------
async function flipTexts(nodes, target, stats) {
  if (!nodes.length) return;
  const key = (f) => f.family + '__' + f.style;
  const fonts = new Map();
  for (const n of nodes) {
    try {
      if (n.fontName === figma.mixed) {
        const segs = n.getStyledTextSegments(['fontName']);
        for (const s of segs) fonts.set(key(s.fontName), s.fontName);
      } else {
        fonts.set(key(n.fontName), n.fontName);
      }
    } catch (e) {}
  }
  await Promise.all([...fonts.values()].map(f => figma.loadFontAsync(f).catch(() => {})));

  const fromAlign = target === 'RTL' ? 'LEFT' : 'RIGHT';
  const toAlign = target === 'RTL' ? 'RIGHT' : 'LEFT';
  const toDir = target === 'RTL' ? 'RIGHT_TO_LEFT' : 'LEFT_TO_RIGHT';

  for (const n of nodes) {
    try {
      if (n.textAlignHorizontal === fromAlign) n.textAlignHorizontal = toAlign;
      const len = n.characters.length;
      if (len > 0 && 'setRangeTextDirection' in n) n.setRangeTextDirection(0, len, toDir);
      markDir(n, target);
      stats.texts++;
    } catch (e) { stats.errors++; }
  }
}

// ---------- Swap-icons (bounded v2 engine) ----------
function iconNeedsSwap(node) {
  if (node.type !== 'INSTANCE') return false;
  if (/(^|[^a-z])(left|right)([^a-z]|$)/i.test(node.name || '')) return true;
  try {
    const p = node.componentProperties;
    for (const k in (p || {})) {
      const v = p[k];
      if (v && v.type === 'VARIANT' && typeof v.value === 'string' && /^(left|right)$/i.test(v.value)) return true;
    }
  } catch (e) {}
  return false;
}

function swapLR(s) {
  return s.replace(/(^|[^a-zA-Z])(left|right)([^a-zA-Z]|$)/gi, function (m, pre, word, post) {
    const lower = word.toLowerCase();
    let rep = lower === 'left' ? 'right' : 'left';
    if (word === word.toUpperCase()) rep = rep.toUpperCase();
    else if (word[0] === word[0].toUpperCase()) rep = rep[0].toUpperCase() + rep.slice(1);
    return pre + rep + post;
  });
}

function eqName(a, b) { return (a || '').toLowerCase() === (b || '').toLowerCase(); }

async function findCounterpart(wantedName, main, ctx) {
  const ck = wantedName.toLowerCase();
  if (ctx.cache.has(ck)) return ctx.cache.get(ck);
  let found = null;
  try {
    const p = main.parent;
    if (p && 'children' in p) found = p.children.find(c => c.type === 'COMPONENT' && eqName(c.name, wantedName)) || null;
  } catch (e) {}
  if (!found) {
    try {
      const set = main.parent;
      if (set && set.type === 'COMPONENT_SET') found = set.children.find(c => c.type === 'COMPONENT' && eqName(c.name, wantedName)) || null;
    } catch (e) {}
  }
  if (!found) {
    try {
      let scope = main.parent;
      while (scope && scope.type !== 'SECTION' && scope.type !== 'PAGE') scope = scope.parent;
      if (scope && scope.type === 'SECTION' && scope.findOne) {
        found = scope.findOne(c => c.type === 'COMPONENT' && eqName(c.name, wantedName)) || null;
      }
    } catch (e) {}
  }
  ctx.cache.set(ck, found);
  return found;
}

async function swapIconsPhase(nodes, target, stats) {
  if (!nodes.length) return;
  const ctx = { cache: new Map() };
  for (const node of nodes) {
    let ok = false;
    try {
      const props = node.componentProperties;
      for (const k in (props || {})) {
        const p = props[k];
        if (p && p.type === 'VARIANT' && typeof p.value === 'string' && /^(left|right)$/i.test(p.value)) {
          const o = {}; o[k] = swapLR(p.value);
          node.setProperties(o);
          ok = true;
          break;
        }
      }
    } catch (e) {}
    if (!ok) {
      try {
        const main = node.getMainComponentAsync ? await node.getMainComponentAsync() : node.mainComponent;
        if (main && /(^|[^a-z])(left|right)([^a-z]|$)/i.test(main.name)) {
          const wanted = swapLR(main.name);
          if (wanted !== main.name) {
            const cp = await findCounterpart(wanted, main, ctx);
            if (cp) { node.swapComponent(cp); ok = true; }
          }
        }
      } catch (e) { stats.errors++; }
    }
    if (ok) { markDir(node, target); stats.icons++; }
    else { stats.iconsMissed++; }
  }
}
