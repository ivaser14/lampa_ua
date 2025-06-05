(function() {
    window.plugin = {
        name: 'lampa_ua_minimal',
        version: '1.0',
        description: 'Мінімальний плагін для тесту',
        icon: 'https://uafix.net/favicon.ico',

        search: function(query) {
            return new Promise((resolve) => {
                console.log('Пошук:', query);
                resolve([]);
            });
        },

        get: function(id) {
            return new Promise((resolve) => {
                resolve({
                    title: 'Тестовий фільм',
                    descr: 'Опис відсутній',
                    img: '',
                    seasons: []
                });
            });
        },

        watch: function(id) {
            return new Promise((resolve) => {
                resolve([]);
            });
        }
    };

    window.lampa.register(plugin);
})();
