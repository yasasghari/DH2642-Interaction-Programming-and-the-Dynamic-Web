function resolvePromise(promiseToResolve, promiseState, notify) {

    if(!promiseToResolve) return; // null check
    promiseState.promise = promiseToResolve;
    promiseState.data = null;
    promiseState.error = null;
    if(notify){
        notify();  // so we can call it to notify every time promise, data, or error change

    }      // if a 3rd parameter was sent, we expect it to be a function (ACB)!

    function saveDataACB(result) {
        if (promiseState.promise !== promiseToResolve) return;
        promiseState.data = result;
        if(notify) notify();
        /* TODO notify */
    }
    function saveErrorACB(err) {
        if (promiseState.promise !== promiseToResolve) return;
        promiseState.error = err;
        if(notify) notify();
        /* TODO notify */
    }
    promiseToResolve.then(saveDataACB).catch(saveErrorACB);

    
}
export default resolvePromise
