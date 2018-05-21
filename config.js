const environment = {
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

const agent = {
    isNode: Object.prototype.toString.call(typeof process) === '[object process]',
};

const api = {
    gqlApiURL: process.env.GQL_API_URL,
};

module.exports = Object.assign({
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 3000,
    app: {
        title: 'React Web App Boilerplate',
        description: 'React + apollo + ssr + hot bolilerplate',
        head: {
            titleTemplate: '%s',
            meta: [
                {
                    name: 'description',
                    content: 'React + apollo + ssr + hot bolilerplate',
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
}, environment, agent, api);
