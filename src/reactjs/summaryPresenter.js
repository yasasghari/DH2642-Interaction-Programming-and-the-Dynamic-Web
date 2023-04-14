import React from "react"
import SummaryView from "../views/summaryView"
import { shoppingList } from "../utilities";
export default
function SummaryPresenter(props){
    const [,setPeople] = React.useState();
    const [,setDishes] = React.useState();// this is value, setter for that value. React.useState makes a new component state.
    function observerNoticed(){
        setPeople(props.model.numberOfGuests)
        setDishes(props.model.dishes)
    }
    React.useEffect(function observer(){
        props.model.addObserver(observerNoticed)
        observerNoticed()
        return function removeItself(){
            props.model.removeObserver(observerNoticed)
        }
    },[]) //when something with brackets changes we updatte using somethingchangedcallback

    return <SummaryView 
    people={props.model.numberOfGuests} 
    ingredients={[...shoppingList(props.model.dishes)]}/>;
}