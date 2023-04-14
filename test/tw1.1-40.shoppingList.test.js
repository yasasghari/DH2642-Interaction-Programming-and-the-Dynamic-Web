import { assert, expect, should } from 'chai';

let utilities;
try {
utilities= require('../src/'+TEST_PREFIX+'utilities.js');
}
catch (e) {console.log(e);}

const dishes= [
    {
        extendedIngredients:[
            {aisle:"Produce", name:"pumpkin", id:12, amount: 3.5},
            {aisle:"Frozen", name:"frozen broccoli", id:14, amount:10},
        ]},
    {
        extendedIngredients:[
            {aisle:"Produce", name:"pumpkin", id:12, amount: 10},
            {aisle:"Produce", name:"parsley", id:13, amount: 21},
        ]},
    {
        extendedIngredients:[
            {aisle:"Produce", name:"parsley", id:13, amount: 42},
        ]}
];


describe("TW1.1 shoppingList", function tw1_1_40() {
    it("should add up ingredient amounts", function  tw1_1_40_1(){
        const {shoppingList}= utilities;
        this.timeout(200000);  // increase to allow debugging during the test run

        const result= shoppingList(dishes);
        
        assert.equal(result.length, 3);
        assert.equal(result.filter(function tw1_1_40_1_filter1(i){ return i.id==12;}).length, 1, "should not have duplicate ingredients");
        assert.equal(result.filter(function tw1_1_40_1_filter2(i){ return i.id==12;})[0].amount, 13.5, "should add up amounts of same ingredient");
        assert.equal(result.filter(function tw1_1_40_1_filter3(i){ return i.id==13;}).length, 1, "should not have duplicate ingredients");
        assert.equal(result.filter(function tw1_1_40_1_filter4(i){ return i.id==13;})[0].amount, 63, "should add up amounts of same ingredient");
        assert.equal(result.filter(function tw1_1_40_1_filter5(i){ return i.id==14;}).length, 1, "should not have duplicate ingredients");
        assert.equal(result.filter(function tw1_1_40_1_filter6(i){ return i.id==14;})[0].amount, 10, "should add up amounts of same ingredient");
    });
});
