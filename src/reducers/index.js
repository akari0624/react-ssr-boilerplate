import { combineReducers } from 'redux';

import TVMazeReducer from './TVMazeReducer';

const rootReducer = combineReducers({
    tvMazeData:TVMazeReducer
});

export default rootReducer;
