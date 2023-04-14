import React from "react";
import resolvePromise from "../resolvePromise";
import SearchFormView from "../views/searchFormView";
import SearchResultsView from "../views/searchResultsView";
import promiseNoData from "../views/promiseNoData";
import { searchDishes } from "../dishSource";
function SearchPresenter(props){ 
    const [, reRender]= React.useState();

    const [promiseState]= React.useState(function f(){const v = {};  resolvePromise(searchDishes(), v, notifyACB); return v});   // state hook
    const [text, setText] = React.useState(""); // this is value, setter for that value. React.useState makes a new component state.
    const [type, setType] = React.useState("");
    function resolve(promise){
        resolvePromise(promise, promiseState, notifyACB)
    }
    function anElementChanged(){
        resolve(searchDishes({query:text, type:type}))
    }
    function notifyACB(){ reRender({})}
    React.useEffect(anElementChanged,[]) //when something with brackets changes we updatte using somethingchangedcallback
    return (<div> 
        <SearchFormView 
            selectEvent = {function select(type){setType(type)}}
            inputEvent = {function text(t){setText(t)}}
            buttonClickEvent = {anElementChanged}
            dishTypeOptions={["starter", "main course", "dessert"]}>
        </SearchFormView>
        {promiseNoData(promiseState) 
        || <SearchResultsView
                chooseFoodEvent = {function chooseFood(dish){
                    props.model.setCurrentDish(dish.id)}}
                    searchResults = {promiseState.data}> 
        //conditional or between searchResultPromiseState and SearchResultView
        </SearchResultsView>} 
         </div>)
 }
 export default SearchPresenter