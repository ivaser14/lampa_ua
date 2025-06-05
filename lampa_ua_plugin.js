import cheerio from 'cheerio';

async function searchUafix(query) {
    const url = `https://uafix.net/?s=${encodeURIComponent(query)}`;
    let results = [];

    try {
        const response = await fetch(url);
        const text = await response.text();

        const $ = cheerio.load(text);

        $('.shortstory').each((i, elem) => {
            const a = $(elem).find('a').first();
            const title = a.text().trim() || 'Без назви';
            const link = a.attr('href');

            const img = $(elem).find('img').attr('src') || '';

            const descr = $(elem).find('.shortstory__descr').text().trim() || '';

            if(link) {
                results.push({
                    id: link,
                    title: title,
                    img: img,
                    descr: descr,
                    source: 'uafix.net',
                    link: link
                });
            }
        });

    } catch(e) {
        console.warn('Помилка парсингу uafix.net', e);
    }

    return results;
}

export default function() {
    return {
        name: 'lampa_ua',
        version: '1.0',
        icon: 'https://uafix.net/favicon.ico',
        description: 'Українські джерела: uafix.net',

        search: async function(query) {
            const results = [];
            const uafixResults = await searchUafix(query);
            results.push(...uafixResults);
            return results;
        },

        getMovie: async function(id) {
            // Можна реалізувати детальний опис за посиланням id
            // Зараз повертаємо заглушку
            return {
                title: 'Детальна інформація недоступна',
                descr: '',
                img: '',
                seasons: []
            };
        },

        watch: async function(id) {
            // Для uafix.net треба реалізувати логіку вилучення потоків
            // Поки що повертаємо порожній масив
            return [];
        }
    };
}
