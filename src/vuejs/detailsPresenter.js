import DetailsView from "../views/detailsView";
import promiseNoData from "../views/promiseNoData"
export default function DetailsPresenter(props){
    let dishIsInMenu  = true;
    function isDishCB(currentID){
        if(!currentID) return false
        let arr = props.model.dishes
        if(arr.length === 0) return false;
        let result = arr.filter(dish => dish.id === currentID)
        return (result.length >= 1)
    }
    function superACB(){
        props.model.addToMenu(props.model.currentDishPromiseState.data)
        return props.model.currentDishPromiseState.data
    }
    dishIsInMenu = isDishCB(props.model.currentDishPromiseState.data?.id);

    //detailsview
    return (promiseNoData(props.model.currentDishPromiseState) || <DetailsView dishData = {props.model.currentDishPromiseState.data} guests = {props.model.numberOfGuests} isDishInMenu = {dishIsInMenu} superCustomEvent = {superACB}/>)
}