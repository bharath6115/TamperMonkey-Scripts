//Reusable Utility functions for Tamper Monkey

var dataFetch = {
    request: function request({method = "GET", url, headers = {}, data = null, responseType = "json"}){
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

var seriesGraph = {

    search: async function search(query) {
        const res = await dataFetch.request({
            method: "GET",
            url: `https://seriesgraph.com/api/shows/search?searchTerm=${encodeURIComponent(query)}`
        });

        return res.results?.map(({ id }) => id) ?? [];
    },

    generateIFrame: async function generateIFrame(title) {
        const button = document.createElement("button");
        button.id = "seriesGraphIFRAMEButton";
        button.textContent = "Expand Series Graph";

        const res = await seriesGraph.search(title);

        button.onclick = () => {
            let container = document.querySelector("#seriesGraphIFRAMEContainer");

            if (container) {
                const hidden = container.style.display === "none";

                container.style.display = hidden ? "" : "none";
                button.textContent = hidden
                    ? "Collapse Series Graph"
                    : "Expand Series Graph";

                return;
            }

            container = document.createElement("div");
            container.id = "seriesGraphIFRAMEContainer";

            const iframe = document.createElement("iframe");
            iframe.id = "seriesGraphIFRAME";

            iframe.src = res.length === 1
                ? `https://seriesgraph.com/show/${res[0]}`
                : `https://seriesgraph.com/show/search/${encodeURIComponent(title)}`;

            container.appendChild(iframe);

            button.insertAdjacentElement("afterEnd", container);
            button.textContent = "Collapse Series Graph";
        };

        return button;
    },

    addStyles: function addStyles(){
        if (document.querySelector("#seriesGraphStyles")) return;

        const style = document.createElement("style");
        style.id = "seriesGraphStyles";

        style.textContent = `
            #seriesGraphIFRAMEButton {
                width: 100%;
                padding: 14px 18px;
                margin-bottom: 16px;
                background: rgb(17, 22, 29);
                color: rgb(201, 215, 227);
                border: 1px solid rgb(49, 56, 68);
                border-radius: 10px;
                font-size: 1.4rem;
                font-weight: 600;
                cursor: pointer;
                transition:
                    background 0.18s ease,
                    border-color 0.18s ease,
                    transform 0.18s ease;
            }

            #seriesGraphIFRAMEButton:hover {
                background: rgb(26, 33, 43);
                border-color: rgb(61, 180, 242);
            }

            #seriesGraphIFRAMEButton:active {
                transform: scale(0.985);
            }

            #seriesGraphIFRAMEContainer {
                width: 100%;
                height: 700px;
                resize: vertical;
                overflow: auto;
                min-height: 400px;
                border-radius: 12px;
                box-shadow: 0 10px 30px rgba(0,0,0,.28);
            }

            #seriesGraphIFRAME {
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

    search: async function search(search) {
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
    generateIcon: function generateIcon(){
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
    greet : function greet(){
        console.log("HELLO");
    }
};
