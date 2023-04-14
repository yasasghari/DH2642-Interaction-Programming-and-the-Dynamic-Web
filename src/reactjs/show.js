import React from "react"

export default function Show(props){
    const [hash, setHash] = React.useState(window.location.hash)
    function hashListenerACB(){ setHash(window.location.hash)}
    let bol = hiddenOrNotACB();
    function componentCreationACB(){
        window.addEventListener("hashchange", hashListenerACB)
        function isTakenDownCB(){
            window.removeEventListener("hashchange", hashListenerACB)
        }
        hiddenOrNotACB();
        return isTakenDownCB
    }
    function hiddenOrNotACB(){
        if(hash !== props.hash) return true;
        else return false
    }
    React.useEffect(componentCreationACB, [])


    if(!bol) return (<div>{props.children}</div>)
    return null;
}