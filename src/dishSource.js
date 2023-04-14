import { API_KEY } from "./apiConfig";
import { BASE_URL } from "./apiConfig";

function getDishDetails(id){
    function treatHTTPResponseACB(response){ 
        if(!response.ok) throw new Error("API problem "+response.status);  // or response.status!==200 
        return response.json(); 
        }
        
        return fetch(BASE_URL+'recipes/'+id+'/information', {  // object literal
        "method": "GET",              // HTTP method
        "headers": {                  // HTTP headers, also object literal
     'X-Mashape-Key': API_KEY,
"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
     } // end of headers object
}/* end of second fetch parameter, object */
)
  .then(treatHTTPResponseACB)   ;
}
function searchDishes(params){
    function treatHTTPResponseACB(response){ 
        if(!response.ok) throw new Error("API problem "+response.status);  // or response.status!==200 
        return response.json(); 
        }
        function transformACB(promise){
            return promise.results;
        }
        
    return fetch(BASE_URL+'recipes/search?'+new URLSearchParams(params), {  // object literal
        "method": "GET",              // HTTP method
        "headers": {                  // HTTP headers, also object literal
     'X-Mashape-Key': API_KEY,
"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
     } // end of headers object
}/* end of second fetch parameter, object */
)
  .then(treatHTTPResponseACB).then(transformACB)   ;
}
export {getDishDetails, searchDishes}