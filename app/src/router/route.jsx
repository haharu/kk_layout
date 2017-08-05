import React from 'react';
import {Route, Switch} from 'react-router-dom';

import {PageNotFound, WorkBox} from '../containers/App';
import Header from '../components/Header';
import Nav from '../components/Nav';

const Routes = () => (
    <Switch>
        <Route exact path="/" component={() => (
            <div>
                <Nav/>
                <Header title="WorkBox"/>
                <WorkBox/>
            </div>
        )}/>
        <Route path="*" component={() => (
            <div>
                <Nav/>
                <Header/>
                <PageNotFound/>
            </div>
        )}/>
    </Switch>
);

export default Routes;
