function SearchResultsView(props){

    function SearchResultsViewCB(result){
        return(
        <span key = {result.title} className = "searchResult" onClick = {
            function onClickACB(event){
            props.chooseFoodEvent(result)
            window.location.hash = "#details"}}>
            <img height = "100" className = "searchResult" src={'https://spoonacular.com/recipeImages/' + result.image}></img>
            <div className = "searchResult">{result.title}</div>
        </span>)
    }
    return(
        <div>
            {props.searchResults.map(SearchResultsViewCB)}
        </div>
    )

}


export default SearchResultsView; 