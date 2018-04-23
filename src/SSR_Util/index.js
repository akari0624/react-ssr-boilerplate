import React from 'react';
import {StaticRouter, Route} from 'react-router-dom';

export const generateTempRouteWhenSSR = (path, routedComponent) => (
   

    <StaticRouter>
        <Route path={path} component={routedComponent} />
    </StaticRouter>  


);