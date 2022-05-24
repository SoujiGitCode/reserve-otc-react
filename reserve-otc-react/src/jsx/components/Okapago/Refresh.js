import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faRotate} from '@fortawesome/free-solid-svg-icons'
import React from "react";


const Refresh = (props) =>{

   const fontColor = props.color==="white" ? "fc-White" : "fc-DarkGrey"

    function HandleReload(){
        props.setReload(true)
        props.setLoader(true)
    }

    return(
        <button className={`btn btn-small ${fontColor}`}
                onClick={() => HandleReload()}>
            <FontAwesomeIcon icon={faRotate}  size={"lg"}/>
        </button>
    )

}

export default Refresh