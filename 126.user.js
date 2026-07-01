// ==UserScript==
// @name         AdBlock
// @version      1.0
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==
(function () {
  'use strict';

  const oldKT = '090609-2540';
  const newKT = '090605-2540';
  const oldKTplain = oldKT.replace('-', '');
  const newKTplain = newKT.replace('-', '');

  let lastUrl = location.href;

  function replaceKennitala() {
    document.querySelectorAll('p, span, div, td, th, li, a, strong, em').forEach(el => {
      if (el.childNodes.length === 1 && el.childNodes[0].nodeType === Node.TEXT_NODE) {
        const txt = el.textContent;
        if (!txt) return;
        if (txt.includes(oldKT)) el.textContent = txt.replaceAll(oldKT, newKT);
        else if (txt.includes(oldKTplain)) el.textContent = txt.replaceAll(oldKTplain, newKTplain);
      }
    });
  }

  setInterval(replaceKennitala, 10);
})();
