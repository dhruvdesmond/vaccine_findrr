import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { ShowDistricts } from "./districts";

const ShowStates = (props) => {
    const [states, setStates] = useState([]);


    useEffect(() => {

        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        };
        console.log("testing")

        let url = "https://cdn-api.co-vin.in/api/v2/admin/location/states"
        console.log(url)
        fetch(url, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if ("error" in data) {
                    console.log(data);
                    alert(data["error"]);
                } else {
                    console.log("states ====== ")
                    console.log(data["states"])
                    setStates(data["states"])
                }
            });
    },[]);

    return (
        <div >
            All states
            {states.map((state,index) => (
                <State state={state} index={index}/>
            ))}
        </div>
    );
};

const State = (props) => {
    const state = props.state
    const [show,setShow] = useState(false)
    const toggleDistrict = () =>{
        if (show == true){
            setShow(false)
        }else{
            setShow(true)
        }
    }
    return (
        <div key={props.index}>
            {state['state_id']} -> {state['state_name']} -> 
            <button  onClick={() => toggleDistrict()}>Show all districts</button>  
            {show ? (
                <ShowDistricts state_id={state['state_id']} />
            ) : (
                <div></div>
            )}
        </div>
    );
}

export  {ShowStates};
