import React, {Component} from 'react';

import Routes from './route';

import {ApolloClient} from 'apollo-client';
import {HttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {ApolloProvider} from 'react-apollo';

import {BrowserRouter} from 'react-router-dom';

import {gqlApiURL} from 'Root/config';
import {baseFetch} from 'App/helpers/Request';

import {hot} from 'react-hot-loader';

const client = new ApolloClient({
    link: new HttpLink({
        uri: `${gqlApiURL}/graphql`,
        fetch: baseFetch,
    }),
    cache: new InMemoryCache({
        addTypename: false,
    }).restore(window.__APOLLO_STATE__),
});

@hot(module)
export default class Root extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <BrowserRouter>
                    <Routes />
                </BrowserRouter>
            </ApolloProvider>
        );
    }
}
