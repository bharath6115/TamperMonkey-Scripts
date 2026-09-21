// ==UserScript==
// @name         Title Appender: ChatGPT
// @namespace    http://tampermonkey.net/
// @version      2026-02-28
// @description  Ensure ChatGPT is present in title when using it, to properly monitor the usage while using activity tracker apps
// @author       You
// @match        https://chatgpt.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=chatgpt.com
// @grant        window.onurlchange
// @run-at       document-start
// ==/UserScript==

function updateTitle() {
    if (!document.title.includes("ChatGPT")) {
        document.title += " | ChatGPT";
    }
}

if (window.onurlchange === null) {
    window.addEventListener('urlchange', updateTitle);
} else {
    const origPush = history.pushState;
    history.pushState = function (...args) {
        origPush.apply(this, args);
        updateTitle();
    };
    window.addEventListener('popstate', updateTitle);
}

// Run on initial load
updateTitle();
