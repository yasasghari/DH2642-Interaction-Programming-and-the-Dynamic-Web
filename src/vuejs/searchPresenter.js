import promiseNoData from "../views/promiseNoData"
import doSearch from "../DinnerModel"
import SearchResultsView from "../views/searchResultsView"
import SearchFormView from "../views/searchFormView"
import DinnerModel from "../DinnerModel"
export default function SearchPresenter(props){
    let searchResultData;
    function select(prop){
        props.model.setSearchType(prop)
    }
    function doSearchData(){
        props.model.doSearch(props.model.searchParams)}
    function setQuery(prop){
        props.model.setSearchQuery(prop)
    }
    
    if(!props.model.searchResultsPromiseState.promise) searchResultData = props.model.doSearch();
    return( <div>
        <SearchFormView selectEvent = {select}inputEvent = {setQuery} buttonClickEvent = {doSearchData} dishTypeOptions={["starter", "main course", "dessert"]}> //always
        </SearchFormView>
        {promiseNoData(props.model.searchResultsPromiseState) 
        || <SearchResultsView
                chooseFoodEvent = {function chooseFood(dish){
                props.model.setCurrentDish(dish.id)}}
                searchResults = {props.model.searchResultsPromiseState.data}> 
        //conditional or between searchResultPromiseState and SearchResultView
        </SearchResultsView>} 

        
    </div>)
}