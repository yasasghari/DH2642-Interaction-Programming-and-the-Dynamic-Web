import React from "react";
import firebaseConfig from "/src/firebaseConfig.js";
import { getDishDetails, searchDishes } from "./dishSource";
import resolvePromise from "./resolvePromise";
import DinnerModel from "./DinnerModel";
firebase.initializeApp(firebaseConfig);
const REF="dinnerModel97";
firebase.database().ref(REF+"/test").set("dummy");



// Initialise firebase

function observerRecap(model) {
    function notifyCB(payload){
        return observerCB(payload);
    }
    console.log(model)
    function observerCB(payload){
        console.log(payload)
    }
    model.addObserver(notifyCB)
}

function firebaseModelPromise() {
    function makeDishPromiseCB(dishID){
        return getDishDetails(dishID)
    }
    function makeBigPromiseACB(firebaseData) {
        if(!firebaseData.val()) return new DinnerModel();
        function createModelACB(dish){ //making a new dinnermodel
            return new DinnerModel(firebaseData.val().numberOfGuests, dish)
        }
        const dishPromiseArray= Object.keys(firebaseData.val().yourDishesPath || []).map(makeDishPromiseCB); //getting all the keys
        return Promise.all(dishPromiseArray).then(createModelACB)
        //TODO
    }
    return firebase.database().ref(REF /* <-- note! Whole object! */).once("value").then(makeBigPromiseACB);
}

function updateFirebaseFromModel(model) {
    function updateFirebaseCB(payload){
        return observerCB(payload);
    }
    function observerCB(payload){
        if(payload && payload.numrguests){
            firebase.database().ref(REF+"/numberOfGuests").set(model.numberOfGuests);
        }
        if(payload && payload.settedID){
            firebase.database().ref(REF+"/currentDish").set(model.currentDish);
        }
        if(payload && payload.addDish){
            firebase.database().ref(REF+"/yourDishesPath/"+payload.addDish.id).set(payload.addDish.title)
        }
        if(payload && payload.removed){
            firebase.database().ref(REF+"/yourDishesPath/"+payload.removed.id).set(null)
        }
    }
    model.addObserver(updateFirebaseCB)
    //TODO
    return;
}

function updateModelFromFirebase(model) {

    firebase.database().ref(REF+"/numberOfGuests").on("value", 
        function guestsChangedInFirebaseACB(firebaseData){ model.setNumberOfGuests(firebaseData.val());}
    );
    firebase.database().ref(REF+"/currentDish").on("value", 
        function currentDishChangedInFirebaseACB(firebaseData){ model.setCurrentDish(firebaseData.val());}
    );
    function isDishInMenu(id){
        function callback(dish){
            return dish.id === id
        }
        return model.dishes.some(callback)
    }  
    firebase 
    .database()
    .ref(REF + "/yourDishesPath/")
    .on("child_added", function added(data){
        function whatevercb(d){
            model.addToMenu(d)
        }
        if(data.val() && !isDishInMenu(+data.key))
            getDishDetails(+data.key).then(whatevercb)
    });
    firebase
    .database()
    .ref(REF + "/yourDishesPath/")
    .on("child_removed", function removed(data){
        let dish = {id: data.key}
        model.removeFromMenu(dish)
    })
    

    //TODO
    return;
}

// Remember to uncomment the following line:
export {observerRecap, firebaseModelPromise, updateFirebaseFromModel, updateModelFromFirebase};
