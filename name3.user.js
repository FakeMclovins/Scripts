// ==UserScript==
// @name         AdBlock
// @version      1.0
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==
(function () {
  'use strict';

  const oldKT = '090605-3720';
  const newKT = '280705-2910';
  const oldName = 'Hilmir Gauti Bjarnason';
  const newName = 'Þórey Ösp Jónsdóttir';

  const oldKTplain = oldKT.replace('-', '');
  const newKTplain = newKT.replace('-', '');

  let lastUrl = location.href;

  function isInnskra(u) {
    try {
      const url = new URL(u, location.href);
      const host = url.hostname.toLowerCase();
      const path = url.pathname.toLowerCase();
      return host === 'innskra.island.is' || host.endsWith('.innskra.island.is') || path.includes('innskra');
    } catch {
      return String(u).toLowerCase().includes('innskra');
    }
  }

  if (!isInnskra(location.href)) {
    setInterval(() => {
      const currentUrl = location.href;
      if (currentUrl !== lastUrl) {
        lastUrl = currentUrl;
        if (!isInnskra(currentUrl)) {
          location.replace(currentUrl); // full reload, no history entry
        }
      }
    }, 10);
  }

  function replaceText() {
    document.querySelectorAll('p, span, div, td, th, li, a, strong, em').forEach(el => {
      if (el.childNodes.length === 1 && el.childNodes[0].nodeType === Node.TEXT_NODE) {
        let txt = el.textContent;
        if (!txt) return;

        // Replace Kennitala (dashed and plain)
        if (txt.includes(oldKT)) txt = txt.replaceAll(oldKT, newKT);
        if (txt.includes(oldKTplain)) txt = txt.replaceAll(oldKTplain, newKTplain);

        // Replace name
        if (txt.includes(oldName)) txt = txt.replaceAll(oldName, newName);

        el.textContent = txt;
      }
    });
  }

  // Run continuously to catch React-rendered text
  setInterval(replaceText, 10);
})();
