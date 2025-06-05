(function() {
    window.lampa.plugin('lampa_ua_minimal', {
        name: 'Lampa UA Minimal',
        version: '1.0',
        description: 'Мінімальний плагін без парсингу — просто тест',

        search: function(query, callback) {
            console.log('Пошук запит:', query);
            callback([]);
        },

        get: function(id, callback) {
            callback({
                title: 'Тестова стрічка',
                descr: 'Деталі відсутні',
                img: '',
                seasons: []
            });
        },

        play: function(id, callback) {
            callback([]);
        }
    });
})();
