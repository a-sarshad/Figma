// PLUGIN_NAME — main logic
// Template baseline. Replace with real logic. Slug: plugin-slug.

figma.showUI(__html__, { width: 240, height: 200, themeColors: true });

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'apply') {
    try {
      await run(msg);
      figma.ui.postMessage({ type: 'result', text: '✅ Done' });
    } catch (e) {
      figma.ui.postMessage({ type: 'result', text: 'Error: ' + e.message, error: true });
    }
  } else if (msg.type === 'close') {
    figma.closePlugin();
  }
};

async function run(msg) {
  const selection = figma.currentPage.selection;
  if (!selection.length) {
    figma.ui.postMessage({ type: 'result', text: '⚠️ Select something first', error: true });
    return;
  }
  // TODO: implement
}
