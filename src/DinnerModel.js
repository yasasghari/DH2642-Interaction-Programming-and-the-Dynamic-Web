/* This is an example of a JavaScript class. actual
   The Model keeps only abstract data and has no notions of graohics or interaction
*/
import { propsToAttrMap } from "@vue/shared";
import { getDishDetails, searchDishes } from "./dishSource";
import resolvePromise from "./resolvePromise";

class DinnerModel{
    constructor(nrGuests=2, dishArray=[], currentDish){
        this.setNumberOfGuests(nrGuests);
        this.dishes = dishArray;
        this.searchResultsPromiseState = {}
        this.searchParams = {}
        this.currentDishPromiseState = {}
        this.observers = new Array();  
    }
    setSearchQuery(q){
        this.searchParams.query = q;
    }
    setSearchType(t){
        this.searchParams.type = t;
    }
    doSearchACB(){
        return this.doSearch;
    }

    addObserver(observer){
        this.observers.push(observer); 
    }
    removeObserver(observer){
        this.observers.splice(this.observers.indexOf(observer),1); 
    }
    notifyObservers(payload){
        function invokeObserverCB(obs){
            try{ return obs(payload); }
            catch(err){
                console.error(err);
            }
        }
            if(!this.observers) return;
            try{this.observers.forEach(invokeObserverCB); }
            catch(err){
                console.error(err)
            }

    }
    doSearch(queryAndType){
        function notifyCB(){
            return this.notifyObservers();
        }
        this.searchResultsPromiseState.data = null;
        this.searchResultsPromiseState.error = null;

        this.searchResultsPromiseState.promise = searchDishes(this.searchParams);
        
        resolvePromise(this.searchResultsPromiseState.promise, this.searchResultsPromiseState, notifyCB.bind(this))

    }
    setCurrentDish(id){
        function notifyCB(){
            return this.notifyObservers();
        }

        if(typeof id === 'undefined') return false;
        if(typeof this.currentDish !== 'undefined')
            if(this.currentDish === id) return false;
        this.currentDishPromiseState.data = null;
        this.currentDishPromiseState.error = null;
        this.currentDishPromiseState.promise = null;

        this.currentDishPromiseState.promise = getDishDetails(id);
        this.currentDish = id
        resolvePromise(this.currentDishPromiseState.promise, this.currentDishPromiseState, notifyCB.bind(this))
        this.notifyObservers({settedID : id}); 

    
        return 1;
    }

    setNumberOfGuests(nr){

        // if() and throw exercise

        // TODO throw an error if the argument is smaller than 1 or not an integer
        // the error message must be exactly "number of guests not a positive integer"
        // to check for integer: test at the console Number.isInteger(3.14)
        let prenumr = this.numberOfGuests; 
        if (nr < 1 || !Number.isInteger(nr)){
            throw("number of guests not a positive integer");
          }
          else{
            this.numberOfGuests = nr;
          }
        if(prenumr !== nr){
            this.notifyObservers({numrguests : nr}); 
        }  
        // TODO if the argument is a valid number of guests, store it in this.numberOfGuests

        // when this is done the TW1.1 DinnerModel "can set the number of guests" should pass
        // also "number of guests is a positive integer"
    }

    addToMenu(dishToAdd){
        function callback(dish){
            return dish.id === dishToAdd.id
        }
        if(this.dishes.some(callback)) return;
        else{
            this.dishes= [...this.dishes, dishToAdd];
            this.notifyObservers({addDish : dishToAdd});
        }
        /*if(!dishToAdd || !dishToAdd.id) return;
        // array spread syntax example. Make sure you understand the code below.
        // It sets this.dishes to a newx array [   ] where we spread (...) the previous value
        let v = this.isDishInMenu(dishToAdd.id);
        this.dishes= [...this.dishes, dishToAdd];
        if(!v){
            this.notifyObservers({addDish : dishToAdd}); }*/
        

    }

    removeFromMenu(dishToRemove){
        // callback exercise! Also return keyword exercise
        function hasSameIdCB(dish){
            // TODO return true if the id property of dish is _different_ from the dishToRemove's id property
            if(dish.id != dishToRemove.id){
                return true;
            }
            return false;
            // This will keep the dish when we filter below.
            // That is, we will not keep the dish that has the same id as dishToRemove (if any)
        }
        let allDishes = [...this.dishes]; 
        this.dishes = this.dishes.filter(hasSameIdCB);
        if(allDishes.length !== 0){
            this.notifyObservers({removed : dishToRemove}); 
        }
        // the test "can remove dishes" should pass
    }
    /*
       ID of dish currently checked by the user.
       A strict MVC/MVP Model would not keep such data,
       but we take a more relaxed, "Application state" approach.
       So we store also abstract data that will influence the application status.
     */

}

export default DinnerModel;
