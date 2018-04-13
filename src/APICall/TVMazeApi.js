
import fetch from 'isomorphic-unfetch';
const tvMazeBatManURL = 'https://api.tvmaze.com/search/shows?q=batman';

export const fetchTVMazeData = async (params) => {


       try{
         const response = await fetch(tvMazeBatManURL);
         const data =  await response.json();

         return data;
         
       }catch(error){

          throw new Error(error);
       }
    
}