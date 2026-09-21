// ==UserScript==
// @name         Auto Close Tab After Timeout
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Closes a tab after a specific timeout using the window.close() function.
// @author       Bharath
// @match        https://chat.whatsapp.com/*
// @grant        window.close
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    // Configure the duration here: 10000 milliseconds = 10 seconds
    const TIMEOUT_MS = 10000;

    // The @grant window.close above tells Tampermonkey to inject the necessary
    // permissions, fulfilling the "grant" requirement.

    console.log(`Auto-Close Script: Timer started. Tab will attempt to close in ${TIMEOUT_MS / 1000} seconds.`);

    setTimeout(function() {
        // Attempt to close the current tab.
        // This is still subject to browser security, meaning it works best
        // on tabs opened by a script or user gesture.
        window.close();
        // This log will ONLY show if the script runs successfully before the tab closes
        console.log("Auto-Close Script: window.close() command executed.");
    }, TIMEOUT_MS);
})();
