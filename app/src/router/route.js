import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Loadable from 'react-loadable';

import {PrivateRoute} from 'App/components/Route';
import Loader from 'App/components/Loader';
import Header from 'App/components/Header';

const PageNotFound = Loadable({
    loader: () => import('App/containers/App').then((resp) => {
        return resp.PageNotFound;
    }),
    loading() {
        return <Loader />;
    },
});

export default class Routes extends Component {
    render() {
        return (
            <Switch>
                <PrivateRoute exact path="/" component={() => (
                    <div>
                        <Header>
                            <h1 className="title">
                                Workbox
                            </h1>
                            <h2 className="subtitle">
                                react + SSR + hot + universal + graphql + http2 boilerplate
                            </h2>
                        </Header>
                        <section className="section bg-transparent">
                            <article className="message is-primary">
                                <div className="message-body">
                                    Start your project.
                                </div>
                            </article>
                        </section>
                    </div>
                )} />
                <Route path="*" component={() => (
                    <div>
                        <Header />
                        <PageNotFound />
                    </div>
                )} />
            </Switch>
        );
    }
}
