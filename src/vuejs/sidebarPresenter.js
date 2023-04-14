import SidebarView from "../views/sidebarView";

export default
function Sidebar(props){
    function numberChangeACB(nr){
        props.model.setNumberOfGuests(nr); 
    }

    function removeDishACB(dish){
        props.model.removeFromMenu(dish);
    }
    function setCurrentDishCB(dish){
        props.model.setCurrentDish(dish.id); 
    }

    return <SidebarView dishes={props.model.dishes} removeFromMenu={removeDishACB} setCurrentDish={setCurrentDishCB} onNumberChange={numberChangeACB} number={props.model.numberOfGuests}/> //ingredients={[] /* empty array for starters */}/>;
}
