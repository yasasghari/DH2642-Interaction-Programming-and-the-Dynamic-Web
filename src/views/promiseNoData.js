
import DinnerModel from "../DinnerModel";
function promiseNoData(props){
    if(props.promise){
        if(!props.data && !props.error){ //not resolved
            return <img src = "https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921"></img>
        }
        if(props.data && !props.error){
            return false;

        } // resolved, no problems
        if(props.error){
            return<div>{props.error.toString()}</div>
        }
    }
    return <div>no data</div>
}
export default promiseNoData