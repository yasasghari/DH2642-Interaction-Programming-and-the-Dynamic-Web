import {sortIngredients} from "../utilities";
import {BASE_URL, API_KEY} from "/src/apiConfig.js";

/* Functional JSX component. Name starts with capital letter */
function SummaryView(props){
    function returntoSearchCB(){
        window.location.hash = "search"
    }
    return (
            <div className="debug">
                Summary for <span title="nr guests">{props.people}</span> persons:
                {  //  <---- we are in JSX; with this curly brace, we go back to JavaScript, and can write JS code and comments.
                   // Then we can come back to JSX <tags>
                    
                   
                       renderIngredients(props.ingredients, props.people)               }
                       <button onClick={returntoSearchCB}>Return to search</button>

            </div>

            
    );
}

/* For TW1.5. If you are at TW1.2, wait :) */
/* This is an ordinary JS function, not a component. It will be invoked from the component above */
function renderIngredients(ingredientArray, people){
    function ingredientTableRowCB(ingr){
         
        return <tr key={ingr.id}><td>{ingr.name}</td><td> {ingr.aisle}</td><td className="todo">{(ingr.amount*people).toFixed(2)}{/* multiply by number of people! Display with 2 decimals, use a CSS classs to align right */
                                                                                      }</td><td> {ingr.unit} </td></tr>;
    }
    
    
    return <table>
        <thead>
        <tr><th>Name</th><th>Aisle</th><th>Quantity</th><th>unit</th></tr>
        </thead>
        <tbody>

           {  //  <---- we are in JSX, with this curly brace, we go back to JavaScript
                     sortIngredients(ingredientArray).map(ingredientTableRowCB)
             // TODO sort the ingredients. Import the needed function from utilities.js 
          }

        </tbody>
        </table>;
}

export default SummaryView;
export {renderIngredients};   // we export so that tests can analyze the source code
