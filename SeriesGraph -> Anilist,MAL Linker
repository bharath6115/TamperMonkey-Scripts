// ==UserScript==
// @name          SeriesGraph -> Anilist/MAL linker
// @namespace     http://tampermonkey.net/
// @version       1.1
// @description   Generate logos linking series graph to Anilist and MAL after dynamic content loads.
// @author        Bharath
// @icon          https://www.google.com/s2/favicons?sz=64&domain=seriesgraph.com
// @match         https://seriesgraph.com/*
// @grant         none
// ==/UserScript==

(function() {
    'use strict';

    // Selectors for the elements we need to find
    const TARGET_PARENT_SELECTOR = ".rt-Grid";
    const TARGET_TITLE_SELECTOR = ".rt-Heading";
    const INJECTED_ID = 'mal-anilist-links'; // ID for the div we inject to prevent duplicates

    // --- Core Injection Function ---
    // This function will run on initial load and every time the DOM changes (route change)
    function injectLinks() {

        const url = window.location.pathname; // Example: "/show/bleach/"
        const segments = url.split('/').filter(Boolean);
        if(segments.length != 2) return;

        // 1. Check for required elements
        const x = document.querySelectorAll(TARGET_PARENT_SELECTOR);
        const title = document.querySelectorAll(TARGET_TITLE_SELECTOR);

        if (x.length === 0 || title.length === 0) {
            return; // Exit if elements haven't loaded yet
        }

        // 2. Prevent Duplicate Injection: Check if the link container already exists inside the target
        if (x[0].querySelector(`#${INJECTED_ID}`)) {
            return; // Links are already present, do nothing
        }

        // --- START OF YOUR ORIGINAL LOGIC BLOCK ---

        const div = document.createElement("div");
        div.id = INJECTED_ID;
        div.style.padding = "10px";
        div.style.display = "flex";
        div.style.gap = "10px";

        const titleText = title[0].innerText.trim();

        // --- Anilist Link ---
        const anilistLink = document.createElement("a");
        const AnilistLogo = document.createElement("img");
        anilistLink.href = "https://anilist.co/search/anime?search="+encodeURIComponent(titleText);
        anilistLink.target="_blank"
        AnilistLogo.src = "https://camo.githubusercontent.com/0e9a12578d9495f77ac45315e2ba04463884c3a2180a8bbe09d19026f65a2c9b/68747470733a2f2f616e696c6973742e636f2f696d672f69636f6e732f69636f6e2e737667"
        AnilistLogo.style.width = "70px"
        AnilistLogo.style.height = "auto" // Ensure aspect ratio is maintained
        anilistLink.appendChild(AnilistLogo);
        div.appendChild(anilistLink);

        // --- MAL Link ---
        const malLink = document.createElement("a");
        const malLogo = document.createElement("img");
        malLink.href = "https://myanimelist.net/search/all?q="+encodeURIComponent(titleText);
        malLink.target="_blank"
        malLogo.src = "https://cdn.myanimelist.net/s/common/uploaded_files/1520493956-348f874be24776afc4ca9b34210d2527.png"
        malLogo.style.width = "70px"
        malLogo.style.height = "auto" // Ensure aspect ratio is maintained
        malLink.appendChild(malLogo);
        div.appendChild(malLink);

        // --- Append the final container ---
        x[0].appendChild(div);
        console.log(`Links injected for: ${titleText}`);

    }

    // --- Mutation Observer Setup (The SPA Fix) ---
    // This watcher automatically calls injectLinks() whenever the page's structure changes.
    const observer = new MutationObserver((mutationsList, observer) => {
        injectLinks();
    });

    // Start observing the entire document body for any additions/removals of child elements
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Run once immediately in case the elements are loaded instantly
    injectLinks();
})();
