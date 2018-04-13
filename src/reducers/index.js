import { combineReducers } from 'redux';
import {reducer as form} from 'redux-form';

import TVMazeReducer from './TVMazeReducer';

const rootReducer = combineReducers({
    form:form, 
    tvMazeData:TVMazeReducer
});

export default rootReducer;
