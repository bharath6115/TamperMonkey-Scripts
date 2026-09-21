//Reusable Utility functions for Tamper Monkey

const dataFetch = {
    request({method = "GET", url, headers = {}, data = null, responseType = "json"}){
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

const seriesGraph = {

    async search(query) {
        const res = await dataFetch.request({
            method: "GET",
            url: `https://seriesgraph.com/api/shows/search?searchTerm=${encodeURIComponent(query)}`
        });

        return res.results?.map(({ id }) => id) ?? [];
    }

    async generateIFrame() {
        const button = document.createElement("button");
        button.id = "seriesGraphIFRAMEButton";
        button.textContent = "Expand Series Graph";

        const res = await query(title);

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
    }

};

const aniList = {

    async search(search) {
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
    }

    //todo : add floating window feature with results from query
    generateIcon(){
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

}
