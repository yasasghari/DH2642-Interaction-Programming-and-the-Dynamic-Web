import SidebarView from "../views/sidebarView";

export default
function Sidebar(props){
    const [,setPeople] = React.useState();
    const [,setDishes] = React.useState();
    function numberChangeACB(nr){
        props.model.setNumberOfGuests(nr); 
    }

    function removeDishACB(dish){
        props.model.removeFromMenu(dish);
    }
    function setCurrentDishCB(dish){
        props.model.setCurrentDish(dish.id); 
    }
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
    },[]) //functions for a ddign or removing observer

    return <SidebarView 
    dishes={props.model.dishes} 
    removeFromMenu={removeDishACB} 
    setCurrentDish={setCurrentDishCB} 
    onNumberChange={numberChangeACB} 
    number={props.model.numberOfGuests}/>
}
