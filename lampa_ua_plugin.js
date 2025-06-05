(function() {
    function searchUafix(query) {
        const url = `https://uafix.net/?s=${encodeURIComponent(query)}`;
        return fetch(url)
            .then(res => res.text())
            .then(html => {
                const results = [];
                const matches = [...html.matchAll(/<div class="shortstory">([\s\S]+?)<\/div>\s*<\/div>/g)];

                for (const match of matches) {
                    const block = match[1];

                    const titleMatch = block.match(/<a[^>]+>(.*?)<\/a>/);
                    const linkMatch = block.match(/<a href="([^"]+)"/);
                    const imgMatch = block.match(/<img[^>]+src="([^"]+)"/);
                    const descrMatch = block.match(/<div class="shortstory__descr">([\s\S]+?)<\/div>/);

                    const title = titleMatch ? titleMatch[1].trim() : 'Без назви';
                    const link = linkMatch ? linkMatch[1] : '';
                    const img = imgMatch ? imgMatch[1] : '';
                    const descr = descrMatch ? descrMatch[1].replace(/<[^>]+>/g, '').trim() : '';

                    if (link) {
                        results.push({
                            id: link,
                            title: title,
                            img: img,
                            descr: descr,
                            source: 'uafix.net',
                            link: link
                        });
                    }
                }

                return results;
            })
            .catch(e => {
                console.warn('Помилка uafix.net:', e);
                return [];
            });
    }

    window.lampa.plugin('lampa_ua_uafix', {
        type: 'video',
        name: 'UAFix',
        version: '1.0',
        icon: 'https://uafix.net/favicon.ico',
        description: 'Джерело з uafix.net',

        search: function(query, callback) {
            searchUafix(query).then(results => {
                callback(results);
            });
        },

        get: function(id, callback) {
            callback({
                title: 'UAFix фільм',
                descr: '',
                img: '',
                seasons: []
            });
        },

        play: function(id, callback) {
            callback([]);
        }
    });
})();
