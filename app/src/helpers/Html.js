import React, {Component} from 'react';
import PropTypes from 'prop-types';
import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';

export default class Html extends Component {
    static propTypes = {
        assets: PropTypes.object,
        component: PropTypes.node,
        state: PropTypes.object,
    };

    render() {
        const {assets, component, state} = this.props;
        const head = Helmet.rewind();

        return (
            <html>
                <head>
                    {head.base.toComponent()}
                    {head.title.toComponent()}
                    {head.meta.toComponent()}
                    {head.link.toComponent()}
                    {head.script.toComponent()}
                    <link rel="shortcut icon" href="/favicon.ico" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    {Object.keys(assets.styles).map((style, i) => <link href={assets.styles[style]} key={i} media="screen, projection" rel="stylesheet" type="text/css" charSet="UTF-8" />)}
                </head>
                <body>
                    <div id="app">
                        {component}
                    </div>
                    <script dangerouslySetInnerHTML={{
                        __html: `
                            window.__APOLLO_STATE__=${serialize(state)};
                        `,
                    }} charSet="UTF-8" />
                    {Object.keys(assets.javascript).map((script, i) =>
                        <script src={assets.javascript[script]} key={i} />
                    )}
                </body>
            </html>
        );
    }
}
