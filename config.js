let environment = {
    development: {
        isProduction: false,
    },
    staging: {
        isProduction: false,
    },
    production: {
        isProduction: true,
    },
}[process.env.NODE_ENV || 'development'];

let dbEnvironment = {
    development: {
        isProductionDB: false,
    },
    staging: {
        isProductionDB: false,
    },
    production: {
        isProductionDB: true,
    },
}[process.env.DB_ENV || 'development'];

let agent = {
    isNode: Object.prototype.toString.call(typeof process) === '[object process]',
};

module.exports = Object.assign({
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 3000,
    apiHost: process.env.APIHOST || 'localhost',
    apiPort: process.env.APIPORT || 3001,
    app: {
        title: 'KKday guide backend',
        description: 'backend for guide',
        head: {
            titleTemplate: 'KKday guide backend: %s',
            meta: [
                {
                    name: 'description',
                    content: 'backend for guide',
                }, {
                    charset: 'utf-8',
                }, {
                    property: 'og:site_name',
                    content: '',
                }, {
                    property: 'og:image',
                    content: '',
                }, {
                    property: 'og:locale',
                    content: '',
                }, {
                    property: 'og:title',
                    content: '',
                }, {
                    property: 'og:description',
                    content: '',
                }, {
                    property: 'og:card',
                    content: '',
                }, {
                    property: 'og:site',
                    content: '',
                }, {
                    property: 'og:creator',
                    content: '',
                }, {
                    property: 'og:image:width',
                    content: '',
                }, {
                    property: 'og:image:height',
                    content: '',
                },
            ],
        },
    },
}, environment, dbEnvironment, agent);
