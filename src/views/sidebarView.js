import { dishType } from "../utilities";
import { sortDishes } from "../utilities";
import { menuPrice } from "../utilities";
import {BASE_URL, API_KEY} from "/src/apiConfig.js";



function SidebarView(props) {
    function ExportItemCB(dish) {
        function setCurrentDishCB() {
            props.setCurrentDish(dish)
        }
        function removeFromMenuCB() {
            props.removeFromMenu(dish)
        }

        return <tr key={dish.id} className = "fixedWidth">
            <td>{<button id="remove" onClick={removeFromMenuCB}>x</button>}</td>
            <td><a href="#details" onClick={setCurrentDishCB}>{dish.title}</a></td>
            <td>{dishType(dish)}</td>
            <td className="todo">{(dish.pricePerServing*props.number).toFixed(2)}</td>
        </tr>
    }

    function incrementACB() {
        props.onNumberChange(props.number + 1);
    }
    function decrementACB() {
        props.onNumberChange(props.number - 1);

    }

    return (

        <div className="tree">
            <button id="decrement" onClick={decrementACB} disabled={
                props.number <= 1}>-</button>
            <span title="amount of guests">{props.number}</span>
            <button id="increment" onClick={incrementACB}>+</button>
            <table>
                <tbody>
                    {sortDishes(props.dishes).map(ExportItemCB)}
                    <tr>
                        <td></td>
                        <td>Total:</td>
                        <td></td>
                        <td className="todo">{(menuPrice(props.dishes) * props.number).toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}



export default SidebarView; 