(function(){
    window.lampa_plugins = window.lampa_plugins || [];
    window.lampa_plugins.push({
        name: 'lampa_ua',
        type: 'video',
        version: '1.0',
        description: 'Пошук фільмів на uafix.net',

        search: async function(query, callback) {
            const url = `https://uafix.net/?s=${encodeURIComponent(query)}`;
            try {
                const res = await fetch(url);
                const html = await res.text();

                const items = [];
                const matches = [...html.matchAll(/<div class="shortstory">([\s\S]*?)<\/div>/g)];

                for (const match of matches) {
                    const block = match[1];

                    const linkMatch = block.match(/href="([^"]+)"/);
                    const imgMatch = block.match(/<img[^>]+src="([^"]+)"/);
                    const titleMatch = block.match(/<a[^>]*>([^<]+)<\/a>/);
                    const descrMatch = block.match(/<div class="shortstory__descr">([\s\S]*?)<\/div>/);

                    const link = linkMatch?.[1] || '';
                    const img = imgMatch?.[1] || '';
                    const title = titleMatch?.[1]?.trim() || 'Без назви';
                    const descr = descrMatch?.[1]?.trim().replace(/<[^>]+>/g, '') || '';

                    if (link) {
                        items.push({
                            title,
                            link,
                            img,
                            descr,
                            source: 'uafix.net'
                        });
                    }
                }

                callback(items);
            } catch (e) {
                console.error('UAFIX search error:', e);
                callback([]);
            }
        },

        item: function(item, render) {
            render({
                title: item.title,
                cover: item.img,
                description: item.descr,
                onPlay: function() {
                    Lampa.Player.play(item.link, 'iframe');
                }
            });
        }
    });
})();
