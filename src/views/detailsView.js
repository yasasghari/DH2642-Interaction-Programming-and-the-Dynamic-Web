import { genPropsAccessExp } from "@vue/shared";



function DetailsView(props) {
    function detailsCB(){
        window.location.hash = "#search"
        props.superCustomEvent();
    }
    function cancelCB(){
        window.location.hash = "#search"
    }

    function ingredientCB(ingr) {

        return (
                <span key = {props.dishData.title + "."+ ingr.name}className="test">
                    {ingr.name} - {(ingr.amount).toFixed(2)} { ingr.unit}</span>
        )
    }
    return (
        <div>
            <span className="cellThree">
                <span className="title">{props.dishData.title}</span>
                <img className="searchResult" src={props.dishData.image}></img>
            </span>
            <div className = "item"> 
                <span className ="test">Price:{props.dishData.pricePerServing.toFixed(0)}</span>
                <span className = "test" >Price for {props.guests}: {(props.dishData.pricePerServing*props.guests).toFixed(0)}</span>
            </div>
            <br></br>
            <button onClick = {detailsCB} disabled = {props.isDishInMenu}>Add to menu</button>
            <button onClick = {cancelCB}>Cancel</button>
            <div className = "invis"></div>
            <div>
                {props.dishData.extendedIngredients.map(ingredientCB)}
            </div>
            <div className = "wrapped-text">
                {props.dishData.instructions}
            </div>
            <a href = {props.dishData.sourceUrl}>More information!</a>

        </div>
    )

}

export default DetailsView; 
