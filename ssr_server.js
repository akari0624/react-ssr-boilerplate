import path from 'path';
import express from 'express';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import React from 'react';
import reducers from './src/reducers';
import thunk from 'redux-thunk';

import Webpack from 'webpack';
import webpackDevConfig from './webpack.config.dev';

import App from './src/components/app';
import {renderToString} from 'react-dom/server';
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

const handleRender = (req, res) => {

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


const setServerStaticFileMiddleware = (app) => {

    app.use(express.static('static'));
    app.use('/js', express.static('builded'));
  

};

const setExpressSSRFirstRouteMiddleware = (app) => {

    app.use(handleRender);
}



const port = process.env.PORT || 3000;

try{

    const mode = process.env.NODE_ENV;

    console.log('node_env:',mode);

    if(mode === 'production'){
        
        console.log('in production mode');
        const app = express();
      
        setServerStaticFileMiddleware(app);
        setExpressSSRFirstRouteMiddleware(app);


        app.listen(port,()=>{

            console.log(`ssr server is up and listening port ${port}`);
        });

    }else if(mode === 'development'){

        console.log('in development mode');
        const webpackCompiler = Webpack(webpackDevConfig);
       

        
        const app = express();
        app.use(require('webpack-dev-middleware')(webpackCompiler, {
            hot:true
        }));

        app.use(require('webpack-hot-middleware')(webpackCompiler));
            
        app.use(express.static(path.resolve(__dirname, 'src')));
        setExpressSSRFirstRouteMiddleware(app);

        app.listen(port, '127.0.0.1', ()=>{
            console.log(`webpack-dev-server is up and listening port ${port}`);
        });

        

    

    }

}catch(e){
    console.error(`server start up error ${e}`);
    process.exit(1);


}