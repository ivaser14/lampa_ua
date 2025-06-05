// ==UserScript==
// @name         Lampa UA Plugin
// @namespace    https://github.com/yourname/lampa-ua-plugin
// @version      1.0
// @description  Додає українські ресурси в Lampa: eneyida.tv, uakino.me, uaserials.pro, uafix.net, hdrezka-ua.com
// @author       Ти
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    const sources = [/* всі обробники як раніше (без змін) */];

    function createSearchUI() {
        const input = document.createElement('input');
        input.placeholder = 'Пошук UA фільмів...';
        input.style = 'position:fixed;top:10px;left:10px;z-index:99999;padding:8px;font-size:16px;width:300px;border-radius:8px;border:1px solid #ccc;';

        const resultsBox = document.createElement('div');
        resultsBox.style = 'position:fixed;top:50px;left:10px;width:320px;max-height:80vh;overflow:auto;background:#111;color:#fff;padding:10px;z-index:99999;border-radius:8px;box-shadow:0 0 10px rgba(0,0,0,0.5);';

        input.addEventListener('keydown', async (e) => {
            if (e.key === 'Enter') {
                const query = input.value.trim();
                if (!query) return;

                resultsBox.innerHTML = '<b>Шукаємо...</b>';
                let allResults = [];

                for (const source of sources) {
                    try {
                        const handler = source.handler;
                        const proxy = [];
                        await handler(query, proxy => proxy.push(...proxy));
                    } catch (err) {
                        console.warn(`Помилка ${source.name}:`, err);
                    }
                }

                if (allResults.length === 0) {
                    resultsBox.innerHTML = '<b>Нічого не знайдено.</b>';
                } else {
                    resultsBox.innerHTML = allResults.map(r => `
                        <div style="margin-bottom:10px;border-bottom:1px solid #555;padding-bottom:5px;">
                            <img src="${r.img}" width="100%" style="border-radius:4px;"/>
                            <div><b>${r.title}</b></div>
                            <div style="font-size:12px;color:#aaa;">${r.source}</div>
                            <div style="font-size:14px;">${r.descr}</div>
                            <a href="${r.link}" target="_blank" style="color:#0cf">Перегляд</a>
                        </div>`).join('');
                }
            }
        });

        document.body.appendChild(input);
        document.body.appendChild(resultsBox);
    }

    async function searchAllSources(query) {
        for (const source of sources) {
            try {
                await source.handler(query);
            } catch (e) {
                console.warn(`Помилка у джерелі ${source.name}:`, e);
            }
        }
    }

    window.lampaUAPlugin = {
        search: searchAllSources,
        sources
    };

    document.addEventListener("DOMContentLoaded", () => {
        createSearchUI();
    });
})();
