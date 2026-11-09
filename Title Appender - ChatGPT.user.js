// ==UserScript==
// @name         Title Appender: ChatGPT
// @namespace    http://tampermonkey.net/
// @version      2026-11-09
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
    //Tampermonkey-provided property, not a standard browser API. Tampermonkey exposes it to userscripts to indicate whether URL-change events are supported
    window.addEventListener('urlchange', updateTitle);
} else {
    
    // pushState() is called when APPLICATION changes the url.
    // NO event is dispatched. So need to manually override the default function:
    const origPush = history.pushState;
    history.pushState = function (...args) {
        // executes the original browser functionality.
        origPush.apply(this, args);
        // updates the document title based on the new URL/page.
        updateTitle();
    };
    
    // popstate event is dispatched when USER navigates through the history
    // Calls updateTitle() whenever the browser fires a popstate event. This typically happens when the user: Clicks Back, Clicks Forward, Navigates through browser history.
    window.addEventListener('popstate', updateTitle);
}

// Run on initial load and keep trying incase it fails.
updateTitle();
setInterval(updateTitle, 40*1000);
