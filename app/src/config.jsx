const environment = {
    development: {
        isProduction: false
    },
    production: {
        isProduction: true
    }
}[process.env.NODE_ENV || 'development'];

export default Object.assign({
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 3000,
    apiHost: process.env.APIHOST || 'localhost',
    apiPort: process.env.APIPORT || 3001,
    app: {
        title: 'React Redux Example',
        description: 'All the modern best practices in one example.',
        head: {
            titleTemplate: 'React Redux Example: %s',
            meta: [
                {
                    name: 'description',
                    content: 'All the modern best practices in one example.'
                }, {
                    charset: 'utf-8'
                }, {
                    property: 'og:site_name',
                    content: ''
                }, {
                    property: 'og:image',
                    content: ''
                }, {
                    property: 'og:locale',
                    content: ''
                }, {
                    property: 'og:title',
                    content: ''
                }, {
                    property: 'og:description',
                    content: ''
                }, {
                    property: 'og:card',
                    content: ''
                }, {
                    property: 'og:site',
                    content: ''
                }, {
                    property: 'og:creator',
                    content: ''
                }, {
                    property: 'og:image:width',
                    content: ''
                }, {
                    property: 'og:image:height',
                    content: ''
                }
            ]
        }
    }
}, environment);
