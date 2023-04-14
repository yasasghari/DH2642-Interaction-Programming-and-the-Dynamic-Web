// Add relevant imports here 
import React from "react"
import App from "../views/app.js"
import { firebaseModelPromise, updateFirebaseFromModel, updateModelFromFirebase } from "../firebaseModel"
import resolvePromise from "../resolvePromise";
import promiseNoData from "../views/promiseNoData";

// Define the ReactRoot component
function ReactRoot(){
    const [,reRender] = React.useState()
    const [promiseState] = React.useState({});
    function notifyACB(){
        if(promiseState.data){
            updateFirebaseFromModel(promiseState.data)
            updateModelFromFirebase(promiseState.data)
        }
        reRender({});

    }
    
    React.useEffect(
        function callback(){
            resolvePromise(firebaseModelPromise(), promiseState, notifyACB)}, [])
    return promiseNoData(promiseState)||<App model = {promiseState.data}/>
}

// Export the ReactRoot component 
export default ReactRoot

//get webstorm