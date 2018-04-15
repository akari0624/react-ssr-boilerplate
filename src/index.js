import React from 'react';
import {hydrate} from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import thunk from 'redux-thunk';

import reducers from './reducers';
import App from './components/app';
import Page from './components/tv_page';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

hydrate(
    <Provider store={createStoreWithMiddleware(reducers,preloadedState, 
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
        <BrowserRouter>
            <div>
                <Route path="/" component={App} />
                <Switch>
                    <Route path="/page" component={Page} />
                </Switch>
            </div> 
        </BrowserRouter> 
    </Provider>

    , document.querySelector('#root'));
