//Reusable Utility functions for Tamper Monkey

var dataFetch = {
    request:
    function request({method = "GET", url, headers = {}, data = null, responseType = "json"}){
        return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                method,
                url,
                headers,
                data,

                onload: (res) => {
                    if (res.status < 200 || res.status >= 300) {
                        reject(new Error(`HTTP ${res.status}`));
                        return;
                    }

                    try {
                        let result = res.responseText;

                        if (responseType === "json") {
                            result = JSON.parse(result);
                        }

                        resolve(result);
                    } catch (err) {
                        reject(err);
                    }
                },

                onerror: () => {
                    reject(new Error("Request failed"));
                }
            });
        });
    }
};

var animeUtils = {

    cleanTitle:
    function cleanTitle(text) {
        return text
            .replace(/(?:\s+)?(?:Season|S|2nd|3rd|4th|Part)\s+\d+/gi, '')
            .split(/[:–-]/)[0]
            .replace(/[!?]+$/, '')
            .trim();
    }

};

var seriesGraph = {

    search:
    async function search(query) {
        const res = await dataFetch.request({
            method: "GET",
            url: `https://seriesgraph.com/api/shows/search?searchTerm=${encodeURIComponent(query)}`
        });

        return res.results?.map(({ id }) => id) ?? [];
    },

    generateSrc:
    async function generateSrc(title){
        const res = await seriesGraph.search(title);

        return res.length === 1
            ? `https://seriesgraph.com/show/${res[0]}`
            : `https://seriesgraph.com/show/search/${encodeURIComponent(title)}`;
    },

    generateIframe:
    async function generateIframe(title) {

        const src = await seriesGraph.generateSrc(title);

        const block = document.createElement("div");
        block.id = "seriesGraphIframeBlock";

        const header = document.createElement("div");
        header.id = "seriesGraphIframeHeader";

        const openInNewTab = document.createElement("a");
        openInNewTab.id = "seriesGraphIframeRedirect";
        openInNewTab.href = src;
        openInNewTab.target = "_blank";
        openInNewTab.rel = "noopener noreferrer";

        openInNewTab.innerHTML = `
            <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
            >
                <path d="M14 3h7v7"/>
                <path d="M10 14L21 3"/>
                <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"/>
            </svg>
        `;

        const button = document.createElement("button");
        button.id = "seriesGraphIframeButton";
        button.textContent = "Expand Series Graph";
        
        const container = document.createElement("div");
        container.id = "seriesGraphIframeContainer";
        container.style.display = "none";
        
        const iframe = document.createElement("iframe");
        iframe.id = "seriesGraphIframe";
        iframe.src = src;
        
        header.append(openInNewTab,button);
        container.appendChild(iframe);

        block.append(header, container);

        button.onclick = () => {
            const hidden = container.style.display === "none";

            container.style.display = hidden ? "" : "none";
            button.textContent = hidden
                ? "Collapse Series Graph"
                : "Expand Series Graph";
        };

        return block;
    },

    generateIcon:
    async function generateIcon(title){
        const div = document.createElement("div");
        div.id = "seriesGraphLinker";
        div.style.float = "right";
        div.style.userSelect = "none";
        div.style.marginRight = "5px";
        div.style.marginLeft = "5px";

        const a = document.createElement("a");
        a.href = await seriesGraph.generateSrc(title);
        a.target = "_blank";
        a.title = "SeriesGraph";
        a.className = "link";

        const img = document.createElement("img");
        img.src = "https://seriesgraph.com/favicon-16x16.png";
        img.setAttribute("width","16");
        img.setAttribute("height","15");

        a.appendChild(img);
        div.appendChild(a);

        return div;
    },

    addStyles:
    function addStyles(){
        if (document.querySelector("#seriesGraphStyles")) return;

        const style = document.createElement("style");
        style.id = "seriesGraphStyles";

        style.textContent = `
            #seriesGraphIframeHeader {
                width: 100%;
                margin-bottom: 16px;
                background: rgb(17, 22, 29);
                color: rgb(201, 215, 227);
                display: flex;
                border: 1px solid rgb(49, 56, 68);
                border-radius: 10px;
                font-size: 1.4rem;
                font-weight: 600;
                transition:
                    background 0.18s ease,
                    border-color 0.18s ease,
                    transform 0.18s ease;
                box-sizing: border-box;
            }
            
            #seriesGraphIframeRedirect {
                width: 50px;
                aspect-ratio: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 10px 0 0 10px;
                border-right : 1px solid rgb(49, 56, 68);
                text-decoration: none;
                color: inherit;
            }

            #seriesGraphIframeButton{
                flex:1;
                padding: 14px 18px;
                border: none;
                border-left: 1px solid rgb(49, 56, 68);
                border-radius: 0 10px 10px 0;
                background: transparent;
                color: inherit;
                font: inherit;
                cursor: pointer;
            }

            #seriesGraphIframeRedirect:hover {
                background: rgb(26, 33, 43);
                border-color: rgb(61, 180, 242);
                color: rgb(61, 180, 242);
            }

            #seriesGraphIframeButton:hover {
                background: rgb(26, 33, 43);
                border-color: rgb(61, 180, 242);
            }

            #seriesGraphIframeRedirect:active,
            #seriesGraphIframeButton:active {
                transform: scale(0.985);
            }

            #seriesGraphIframeContainer {
                width: 100%;
                height: 700px;
                resize: vertical;
                overflow: auto;
                min-height: 400px;
                border-radius: 12px;
                box-shadow: 0 10px 30px rgba(0,0,0,.28);
            }

            #seriesGraphIframe {
                width: 100%;
                height: 100% !important;
                border: none;
                display: block;
            }
        `;

        document.head.appendChild(style);
    }

};

var aniList = {

    search:
    async function search(search) {
        const query = `
            query ($search: String!) {
                Page {
                    media(search: $search, type: ANIME) {
                        id
                        title {
                            romaji
                            english
                        }
                        coverImage {
                            medium
                        }
                        season
                        seasonYear
                        episodes
                        averageScore
                    }
                }
            }
        `;

        const res = await dataFetch.request({
            method: "POST",
            url: "https://graphql.anilist.co",
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                query,
                variables: {
                    search
                }
            })
        });

        return res.data.Page.media;
    },

    //todo : add floating window feature with results from query
    generateIcon:
    function generateIcon(){
        const anilistLink = document.createElement("a");
        const AnilistLogo = document.createElement("img");
        anilistLink.href = "https://anilist.co/search/anime?search="+encodeURIComponent(titleText);
        anilistLink.target="_blank"
        AnilistLogo.src = "https://camo.githubusercontent.com/0e9a12578d9495f77ac45315e2ba04463884c3a2180a8bbe09d19026f65a2c9b/68747470733a2f2f616e696c6973742e636f2f696d672f69636f6e732f69636f6e2e737667"
        AnilistLogo.style.width = "70px"
        AnilistLogo.style.height = "auto" // Ensure aspect ratio is maintained
        anilistLink.appendChild(AnilistLogo);
        
        return AnilistLogo;
    }
};

var test = {
    greet :
    function greet(){
        console.log("HELLO");
    }
};
