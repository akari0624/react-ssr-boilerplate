import React from 'react';
import {StaticRouter, Route} from 'react-router-dom';

export const generateTempRouteWhenSSR = (path, routedComponent, initProps) => {
   
    if(initProps){
        return (
            <StaticRouter>
                <Route path={path} render={() => <routedComponent data={initProps} />} />
            </StaticRouter>  
        );
    }else{
        return (
            <StaticRouter>
                <Route path={path} component={routedComponent} />
            </StaticRouter>  
        );
    }

};