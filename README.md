# Tampermonkey Scripts

A collection of personal Tampermonkey userscripts for automating and enhancing various websites.

## 🚀 Installation

1. Install the **Tampermonkey** extension for your browser ([Chrome](https://www.tampermonkey.net/), [Firefox](https://www.tampermonkey.net/)).
2. Open the `.user.js` file you want to install and click **Raw**.
3. You will be redirected to the Tampermonkey Userscript Installation page.  
   *(This redirection only happens if you have the extension installed.)*
   <img width="1896" height="389" alt="image" src="https://github.com/user-attachments/assets/7c6489a1-0f26-451c-a27b-abf7a2565095" />

4. Click **Install**.

## 📜 Scripts

| Script | Description |
| --- | --- |
| [SeriesGraph Anime Filler Marker](./SeriesGraph_AnimeFillerMarker.user.js) | Adds filler episode markers to SeriesGraph. |
| [AniList → SeriesGraph Linker](./AniList-SeriesGraph-Linker.user.js) | Adds a SeriesGraph link to anime pages on AniList. |
| [AniList: SeriesGraph Ifram-inator](./AniList-SeriesGraph-Ifram-inator.user.js) | Embeds a SeriesGraph iframe directly into anime pages on AniList. |
| [Animepahe → SeriesGraph Linker](./Animepahe-SeriesGraph-Linker.user.js) | Adds a SeriesGraph link to anime pages on Animepahe. |
| [Animepahe: SeriesGraph Ifram-inator](./Animepahe-SeriesGraph-Ifram-inator.user.js) | Embeds a SeriesGraph iframe directly into anime pages on Animepahe. |
| [Auto Close Tab After Timeout](./Auto-Close-Tab-After-Timeout.user.js) | Automatically closes WhatsApp group-invite tabs after a configurable timeout. |
| [MAL → SeriesGraph Linker](./MAL-SeriesGraph-Linker.user.js) | Adds a SeriesGraph link to anime pages on MyAnimeList. |
| [MAL: SeriesGraph Ifram-inator](./MAL-SeriesGraph-Ifram-inator.user.js) | Embeds a SeriesGraph iframe directly into anime pages on MyAnimeList. |
| [MIS Automation Central](./MIS-Automation-Central.user.js) | Automates login, CAPTCHA OCR, and common tasks on the IIT (ISM) MIS portal. |
| [SeriesGraph → AniList/MAL Linker](./SeriesGraph-Anilist,MAL-Linker.user.js) | Adds links to search for the current SeriesGraph entry on AniList and MyAnimeList. |
| [SeriesGraph: Filler Tracker](./SeriesGraph-Filler-Tracker.user.js) | Fetches filler episode data and visually marks filler episodes on SeriesGraph. |
| [Title Appender: ChatGPT](./Title-Appender-ChatGPT.user.js) | Keeps “ChatGPT” in the browser title for activity tracking purposes. |
| [`utils.js`](./utils.js) | Shared utility functions used by multiple userscripts. |

## ⚙️ Shared Utilities

Some scripts use the shared [`utils.js`](./utils.js) file through Tampermonkey's `@require` directive.

It provides reusable functionality such as:

- HTTP requests through `GM_xmlhttpRequest`
- AniList utilities
- SeriesGraph utilities
- Common helper functions

Scripts that use `utils.js` will automatically load it through the `@require` directive.

## 🔐 Permissions

Some scripts require additional Tampermonkey permissions, such as:

- `GM_xmlhttpRequest`
- `GM_getValue`
- `GM_setValue`

These permissions are declared in each script's metadata block.

Some scripts may also require access to external domains. Tampermonkey will display the requested permissions during installation.

## 📷 Screenshots

#### Ifram-inator in Animepahe:
<img width="1189" height="839" alt="image" src="https://github.com/user-attachments/assets/08bc1efc-7d90-4af5-800a-ff4881891ca1" />

#### Ifram-inator in AniList:
<img width="1230" height="859" alt="image" src="https://github.com/user-attachments/assets/e43be1dd-c70b-4b24-a4e1-b88e901202f4" />


## 🛠️ Configuration

Some scripts require personal configuration before they can be used.

Configuration requirements, such as API keys or stored credentials, are documented within the respective userscript.

## ⚠️ Notes

These scripts are primarily developed for personal use and may depend on the current structure or behavior of the websites they modify.

Website changes can therefore cause a script to stop working without warning.

## 📄 License

This project is licensed under the [MIT License](LICENSE).
