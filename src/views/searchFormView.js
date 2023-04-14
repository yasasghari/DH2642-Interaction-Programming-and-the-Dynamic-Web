function SearchFormView(props){
    function inputChangeACB(event){
        props.inputEvent(event.target.value)
    }
    function selectChangedACB(event){
        props.selectEvent(event.target.value)
    }
    function buttonClickACB(){
        props.buttonClickEvent();
    }
    function seeSummaryCB(){
        window.location.hash = "#summary"
    }
    function SearchFormViewsCB(optionString){
        return(
            <option key={optionString} value= {optionString}>{optionString}</option>
        )

    }
    return (
        <div>
        <div className="searchTypeBox">
            <input type="search" onChange={inputChangeACB}>
            </input>
            <select onChange = {selectChangedACB}>
                <option value = "">Choose:</option>
                {props.dishTypeOptions.map(SearchFormViewsCB)}
            </select>
            <button onClick = {buttonClickACB}>Search!</button>
        </div>
        <button onClick={seeSummaryCB}>See summary</button>

        </div>

    )
            }

export default SearchFormView; 