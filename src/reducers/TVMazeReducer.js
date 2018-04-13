import {RETRIEVETVMazeData} from '../type/typeHolder';


export default (state = [], action) => {

    switch(action.type){
    case RETRIEVETVMazeData:
    {
        return action.payload;             
    }


    default:
        return state;
    }

};