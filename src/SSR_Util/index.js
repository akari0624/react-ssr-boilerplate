import React from 'react';
import {StaticRouter, Route} from 'react-router-dom';

export const generateTempRouteWhenSSR = (path, RoutedComponent, initProps) => {
   
    const context = {};


/**
 * Line 17 used to be, but the html return by react-dom/server.renderToString  will become empty string, WHY ??
 * <Route path={path} render={() => <RoutedComponent data={initProps} /> } />
 *  */

    if(initProps){
        return (
            <StaticRouter  context={context}>
                <RoutedComponent data={initProps} />
            </StaticRouter>  
        );
    }else{
        return (
            <StaticRouter  context={context}>
                <Route path={path} component={RoutedComponent} />
            </StaticRouter>  
        );
    }

};

