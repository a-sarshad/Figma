// Change Direction v2 — RTL/LTR converter (direction-aware, fast)
// تبدیل جهت دیزاین‌سیستم: master اول، bottom-up. instanceها باز نمی‌شوند (سریع).
// idempotent: هر node با pluginData('cd_dir') علامت می‌خورد؛ اجرای دوبارهٔ همان جهت کاری نمی‌کند.

figma.showUI(__html__, { width: 248, height: 268, themeColors: true });

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'apply') {
    try {
      await run(msg.target, !!msg.swapIcons);
    } catch (e) {
      figma.ui.postMessage({ type: 'result', text: 'خطای کلی: ' + e.message, error: true });
    }
  } else if (msg.type === 'close') {
    figma.closePlugin();
  }
};

// ---------- Orchestrator ----------
async function run(target /* 'RTL' | 'LTR' */, swapIcons) {
  const selection = figma.currentPage.selection;
  if (!selection.length) {
    figma.ui.postMessage({ type: 'result', text: '⚠️ چیزی انتخاب نشده', error: true });
    return;
  }

  const stats = { frames: 0, texts: 0, instances: 0, icons: 0, iconsMissed: 0, shapes: 0, errors: 0 };
  const textNodes = [];
  const iconNodes = [];

  // Phase 1 — geometry (sync, no await => fast burst)
  for (const node of selection) traverse(node, target, swapIcons, stats, textNodes, iconNodes);

  // Phase 2 — text (fonts batched, async)
  await flipTexts(textNodes, target, stats);

  // Phase 3 — left/right icon component swap (async, only if matched)
  await swapIconsPhase(iconNodes, target, stats);

  figma.ui.postMessage({ type: 'result', text: summarize(stats, target) });
}

function summarize(s, target) {
  const dir = target === 'RTL' ? '→ RTL' : '→ LTR';
  let m = `✅ ${dir}  |  فریم ${s.frames} · متن ${s.texts} · instance ${s.instances} · شکل ${s.shapes}`;
  if (s.icons) m += ` · آیکون swap ${s.icons}`;
  if (s.iconsMissed) m += ` · آیکون بدون جفت ${s.iconsMissed}`;
  if (s.errors) m += ` · ⚠️ خطا ${s.errors}`;
  return m;
}

// ---------- Traversal ----------
function traverse(node, target, swapIcons, stats, textNodes, iconNodes) {
  try {
    const already = ('getPluginData' in node) && node.getPluginData('cd_dir') === target;

    // 1) left/right icon — collect for component swap (NOT flipped). Checked before instance.
    if (swapIcons && iconNeedsSwap(node)) {
      if (!already) iconNodes.push(node);
      return; // no geometry, no recurse
    }

    // 2) instance — per bottom-up workflow: DO NOT open it; only its own overrides
    if (node.type === 'INSTANCE') {
      if (!already) {
        swapCornerRadius(node, stats);
        swapBorders(node, stats);
        flipEffects(node, stats);
        markDir(node, target);
      }
      stats.instances++;
      return; // children skipped (already fixed at master level)
    }

    const isAuto = (node.type === 'FRAME' || node.type === 'COMPONENT' || node.type === 'COMPONENT_SET')
      && 'layoutMode' in node && node.layoutMode !== 'NONE';

    if (!already) {
      if (isAuto) {
        if (node.layoutMode === 'HORIZONTAL') {
          reverseChildrenOrder(node, stats);
          swapPadding(node, stats);
        } else if (node.layoutMode === 'GRID') {
          swapPadding(node, stats); // reverse گرید پیچیده است؛ فعلاً فقط padding/align
        }
        flipAlignment(node);
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

      // absolute-positioned children + free (non-auto) frame children => mirror x
      if ('children' in node) {
        const free = !('layoutMode' in node) || node.layoutMode === 'NONE';
        for (const child of node.children) {
          if (child.layoutPositioning === 'ABSOLUTE' || free) mirrorAbsoluteChild(node, child);
        }
      }

      markDir(node, target);
    }

    if (node.type === 'TEXT') textNodes.push(node);

    if ('children' in node) {
      for (const child of node.children) traverse(child, target, swapIcons, stats, textNodes, iconNodes);
    }
  } catch (e) {
    stats.errors++;
  }
}

function markDir(node, target) {
  try { if ('setPluginData' in node) node.setPluginData('cd_dir', target); } catch (e) {}
}

// ---------- Geometry helpers ----------
function swapPadding(el, stats) {
  try {
    if (!('paddingLeft' in el && 'paddingRight' in el)) return;
    const L = el.paddingLeft, R = el.paddingRight;
    if (L === R) return;
    const bv = el.boundVariables || {};
    const lb = bv.paddingLeft, rb = bv.paddingRight;
    if (lb && 'setBoundVariable' in el) el.setBoundVariable('paddingLeft', null);
    if (rb && 'setBoundVariable' in el) el.setBoundVariable('paddingRight', null);
    el.paddingLeft = R; el.paddingRight = L;
    if (rb && 'setBoundVariable' in el) el.setBoundVariable('paddingLeft', rb);
    if (lb && 'setBoundVariable' in el) el.setBoundVariable('paddingRight', lb);
  } catch (e) { stats.errors++; }
}

function swapCornerRadius(el, stats) {
  try {
    if (!('topLeftRadius' in el && 'topRightRadius' in el &&
          'bottomLeftRadius' in el && 'bottomRightRadius' in el)) return;
    const TL = el.topLeftRadius, TR = el.topRightRadius, BL = el.bottomLeftRadius, BR = el.bottomRightRadius;
    const needTop = TL !== TR, needBot = BL !== BR;
    if (!needTop && !needBot) return;
    const bv = el.boundVariables || {};
    const setBV = (f, v) => { try { if ('setBoundVariable' in el) el.setBoundVariable(f, v); } catch (e) {} };
    if (needTop) {
      if (bv.topLeftRadius) setBV('topLeftRadius', null);
      if (bv.topRightRadius) setBV('topRightRadius', null);
      el.topLeftRadius = TR; el.topRightRadius = TL;
      if (bv.topLeftRadius) setBV('topRightRadius', bv.topLeftRadius);
      if (bv.topRightRadius) setBV('topLeftRadius', bv.topRightRadius);
    }
    if (needBot) {
      if (bv.bottomLeftRadius) setBV('bottomLeftRadius', null);
      if (bv.bottomRightRadius) setBV('bottomRightRadius', null);
      el.bottomLeftRadius = BR; el.bottomRightRadius = BL;
      if (bv.bottomLeftRadius) setBV('bottomRightRadius', bv.bottomLeftRadius);
      if (bv.bottomRightRadius) setBV('bottomLeftRadius', bv.bottomRightRadius);
    }
  } catch (e) { stats.errors++; }
}

function swapBorders(el, stats) {
  try {
    if (!('strokeLeftWeight' in el && 'strokeRightWeight' in el)) return;
    const L = el.strokeLeftWeight, R = el.strokeRightWeight;
    if (L === R) return;
    const bv = el.boundVariables || {};
    const lb = bv.strokeLeftWeight, rb = bv.strokeRightWeight;
    if (lb && 'setBoundVariable' in el) el.setBoundVariable('strokeLeftWeight', null);
    if (rb && 'setBoundVariable' in el) el.setBoundVariable('strokeRightWeight', null);
    el.strokeLeftWeight = R; el.strokeRightWeight = L;
    if (rb && 'setBoundVariable' in el) el.setBoundVariable('strokeLeftWeight', rb);
    if (lb && 'setBoundVariable' in el) el.setBoundVariable('strokeRightWeight', lb);
  } catch (e) { stats.errors++; }
}

function reverseChildrenOrder(frame, stats) {
  try {
    if (frame.layoutMode !== 'HORIZONTAL' || frame.children.length < 2) return;
    const kids = frame.children.slice().reverse();
    kids.forEach((child, i) => frame.insertChild(i, child));
  } catch (e) { stats.errors++; }
}

function flipAlignment(frame) {
  try {
    if (frame.layoutMode === 'HORIZONTAL') {
      const a = frame.primaryAxisAlignItems;
      if (a === 'MAX') frame.primaryAxisAlignItems = 'MIN';
      else if (a === 'MIN') frame.primaryAxisAlignItems = 'MAX';
    } else if (frame.layoutMode === 'VERTICAL' || frame.layoutMode === 'GRID') {
      const a = frame.counterAxisAlignItems;
      if (a === 'MAX') frame.counterAxisAlignItems = 'MIN';
      else if (a === 'MIN') frame.counterAxisAlignItems = 'MAX';
    }
  } catch (e) {}
}

function flipEffects(node, stats) {
  try {
    if (!('effects' in node) || !node.effects || !node.effects.length) return;
    let changed = false;
    const eff = node.effects.map((e) => {
      if ((e.type === 'DROP_SHADOW' || e.type === 'INNER_SHADOW') && e.offset && e.offset.x !== 0) {
        changed = true;
        return Object.assign({}, e, { offset: { x: -e.offset.x, y: e.offset.y } });
      }
      return e;
    });
    if (changed) node.effects = eff;
  } catch (e) { stats.errors++; }
}

function mirrorAbsoluteChild(parent, child) {
  try {
    if (!('width' in parent) || !('x' in child)) return;
    child.x = parent.width - child.x - child.width;
    if ('constraints' in child && child.constraints) {
      const h = child.constraints.horizontal;
      if (h === 'MIN' || h === 'MAX') {
        child.constraints = { horizontal: h === 'MIN' ? 'MAX' : 'MIN', vertical: child.constraints.vertical };
      }
    }
  } catch (e) {}
}

// ---------- Icons: swap left <-> right component (NO flip) ----------
// sync predicate used during traversal
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

// swap "left" <-> "right" preserving case, only on word-ish boundaries
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

// Scoped counterpart search — NEVER scans the whole document (would freeze on big libraries).
// Order: cache -> direct siblings -> component set -> the single page that holds `main`.
async function findCounterpart(wantedName, main, ctx) {
  const ck = wantedName.toLowerCase();
  if (ctx.cache.has(ck)) return ctx.cache.get(ck);

  let found = null;
  // 1) direct siblings of main (already loaded, instant)
  try {
    const p = main.parent;
    if (p && 'children' in p) {
      found = p.children.find(function (c) { return c.type === 'COMPONENT' && eqName(c.name, wantedName); }) || null;
    }
  } catch (e) {}
  // 2) variant siblings if main lives in a component set
  if (!found) {
    try {
      const set = main.parent;
      if (set && set.type === 'COMPONENT_SET') {
        found = set.children.find(function (c) { return c.type === 'COMPONENT' && eqName(c.name, wantedName); }) || null;
      }
    } catch (e) {}
  }
  // 3) search ONLY the page that contains main (load that one page, not all)
  if (!found) {
    try {
      let page = main;
      while (page && page.type !== 'PAGE') page = page.parent;
      if (page) {
        if (!ctx.loadedPages.has(page.id)) {
          if (page.loadAsync) await page.loadAsync();
          ctx.loadedPages.add(page.id);
        }
        found = page.findOne(function (c) { return c.type === 'COMPONENT' && eqName(c.name, wantedName); }) || null;
      }
    } catch (e) {}
  }

  ctx.cache.set(ck, found);
  return found;
}

async function swapIconsPhase(nodes, target, stats) {
  if (!nodes.length) return;
  const ctx = { cache: new Map(), loadedPages: new Set() };
  for (const node of nodes) {
    let ok = false;
    // A) variant property swap (fast, no page load)
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
    // B) swap to counterpart component by name
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

// ---------- Text (Phase 2) ----------
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
  await Promise.all([...fonts.values()].map((f) => figma.loadFontAsync(f).catch(() => {})));

  const fromAlign = target === 'RTL' ? 'LEFT' : 'RIGHT';
  const toAlign = target === 'RTL' ? 'RIGHT' : 'LEFT';
  const toDir = target === 'RTL' ? 'RIGHT_TO_LEFT' : 'LEFT_TO_RIGHT';

  for (const n of nodes) {
    try {
      if (n.textAlignHorizontal === fromAlign) n.textAlignHorizontal = toAlign;
      const len = n.characters.length;
      if (len > 0 && 'setRangeTextDirection' in n) n.setRangeTextDirection(0, len, toDir);
      stats.texts++;
    } catch (e) { stats.errors++; }
  }
}
