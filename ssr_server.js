import path from 'path';
import express from 'express';
import Webpack from 'webpack';
import webpackDevConfig from './webpack.config.dev';

import router from './ssr_route';







const setServerStaticFileMiddleware = (app) => {

    app.use(express.static('static'));
    app.use('/js', express.static('builded'));
  

};

const setExpressSSRFirstRouteMiddleware = (app) => {


    router(app);
};



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