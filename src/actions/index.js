import fetch from 'isomorphic-unfetch';
import {RETRIEVETVMazeData} from '../type/typeHolder';
import {fetchTVMazeData} from '../APICall/TVMazeApi';

const tvMazeBatManURL = 'https://api.tvmaze.com/search/shows?q=batman';





export function retrieveTVMazeData(param){

    return (dispatch) => {


        try {
       
            const data = fetchTVMazeData(param);

            data.then(d => {

                dispatch({
                    type:RETRIEVETVMazeData,
                    payload:d
                });
            });
           

               
        }catch(err){
            console.log('network error!'+err);
        }
        

     

    };
}


