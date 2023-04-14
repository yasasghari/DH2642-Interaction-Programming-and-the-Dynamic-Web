import DetailsView from "../views/detailsView";
import promiseNoData from "../views/promiseNoData";
export default function DetailsPresenter(props){
    const [,setPeople] = React.useState();
    const [,setDishData] = React.useState();
    const [, setPromise] = React.useState();
    const [, setError] = React.useState();
    const [, setDishes] = React.useState();
    function observerNoticed(){
        setPeople(props.model.numberOfGuests)
        setDishData(props.model.currentDishPromiseState.data)
        setPromise(props.model.currentDishPromiseState.promise)
        setError(props.model.currentDishPromiseState.error)
        setDishes(props.model.dishes)
    }
    function superACB(){
        props.model.addToMenu(props.model.currentDishPromiseState.data)
        return props.model.currentDishPromiseState.data
    }
    React.useEffect(function observer(){
        observerNoticed()
        props.model.addObserver(observerNoticed)
        return function removeItself(){
            props.model.removeObserver(observerNoticed)
        }
    },[]) //functions for addign or removing observer

    function callback(dish){
        return dish.id === props.model.currentDish
    }

    return (promiseNoData(props.model.currentDishPromiseState) ||
    <DetailsView
    dishData = {props.model.currentDishPromiseState.data}
    guests = {props.model.numberOfGuests}
    isDishInMenu = {props.model.dishes.some(callback)} 
    superCustomEvent = {superACB}/>)}