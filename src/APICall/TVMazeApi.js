
import fetch from 'isomorphic-unfetch';
const tvMazeBatManURL = 'https://api.tvmaze.com/search/shows?q=batman';
const tvMazeQueryShowDataByIdURL = 'https://api.tvmaze.com/shows/';


export const fetchTVMazeData = async (params) => {


       try{
         const response = await fetch(tvMazeBatManURL);
         const data =  await response.json();

         return data;
         
       }catch(error){

          throw new Error(error);
       }
    
}


export const fetchOneShowDataById = async (id) => {


  try{
    const url = `${tvMazeQueryShowDataByIdURL}${id}`;
    const response = await fetch(url);
    const data =  await response.json();

    return data;
    
  }catch(error){

     throw new Error(error);
  }

}