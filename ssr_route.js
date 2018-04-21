import App from './src/components/app';
import {renderToString} from 'react-dom/server';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import React from 'react';
import reducers from './src/reducers';
import thunk from 'redux-thunk';


import {fetchTVMazeData} from './src/APICall/TVMazeApi';

import {generateTempRouteWhenSSR} from './src/SSR_Util';



const renderFullPage = (html, preloadedState) => {

    const devScriptBundleIncludePath = '<script src="bundle.js"></script>';
    const prodSeperatedBundleIncludePath = `<script src="/js/vendors~main.js"></script>
    <script src="/js/main.js"></script>`;
    
    const whichToInclude = process.env.NODE_ENV === 'production' ? prodSeperatedBundleIncludePath : devScriptBundleIncludePath;

    return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>

       ${whichToInclude}
      </body>
    </html>
    `;
};



const rootRoute = (req, res, next) => {

    // see user request which route, then do correspontive thing

    const dataPromise = fetchTVMazeData(null);

    dataPromise.then(data => {

        const preloadedTVMazeData = {tvMazeData:data};
        const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
        const store = createStoreWithMiddleware(reducers,preloadedTVMazeData);
         
        const html = renderToString(
            <Provider store={store}>
                {generateTempRouteWhenSSR('/', App)}
            </Provider>
        );
    
        const preloadedState = store.getState();
        res.send(renderFullPage(html, preloadedState));


    });

  
};




export default  (expressServer) => {


    expressServer.get('/',rootRoute);


};