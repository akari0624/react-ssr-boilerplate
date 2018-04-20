import React from 'react';
import {StaticRouter, Route} from 'react-router-dom';

export const generateTempRouteWhenSSR = (path, component) => (
    
    <StaticRouter>
        <Route path={path} component={component} />
    </StaticRouter>      
);