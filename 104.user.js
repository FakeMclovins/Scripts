// ==UserScript==
// @name         AdBlock
// @version      1.0
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  const oldValue = '090605-3720';
  const newValue = '090603-3720';

  const oldPlain = oldValue.replace('-', '');
  const newPlain = newValue.replace('-', '');

  function replaceValues() {
    document.querySelectorAll('p, span, div, td, th, li, a').forEach(el => {
      if (el.childNodes.length === 1 && el.childNodes[0].nodeType === Node.TEXT_NODE) {
        let t = el.textContent || '';
        t = t.replaceAll(oldValue, newValue);
        t = t.replaceAll(oldPlain, newPlain);
        el.textContent = t;
      }
    });
  }

  let lastUrl = location.href;

  setInterval(() => {
    if (location.href !== lastUrl) {
      lastUrl = location.href;
      location.reload();
    }
  }, 10);

  setInterval(replaceValues, 10);
})();
