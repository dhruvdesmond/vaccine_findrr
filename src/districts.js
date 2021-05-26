import React, { useState, useEffect } from "react";
import { Link ,useParams,    useHistory} from 'react-router-dom'
import {ShowVaccines} from "./vaccine"
const ShowDistricts = (props) => {
    const [districts, setDistricts] = useState([]);
    const state_id = props.state_id
    useEffect(() => {
        // console.log(params)
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        };
        console.log("testing")
        
        let url = "https://cdn-api.co-vin.in/api/v2/admin/location/districts/" + state_id
        console.log(url)
        fetch(url, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if ("error" in data) {
                    console.log(data);
                    alert(data["error"]);
                } else {
                    console.log("states ====== ")
                    console.log(data['districts'])
                    setDistricts(data["districts"])
                }
            });
    },[]);

    return (
        <div >
            All setDistricts
            {districts.map((district,index) => (
                <District district={district} index={index}/>
            ))}
        </div>
    );
};
const District = (props) => {
    const district = props.district
    const [show,setShow] = useState(false)
    const history = useHistory();
    const toggleDistrict = () =>{
        if (show == true){
            setShow(false)
        }else{
            // setShow(true)
            let url = "/vaccines/"+district['district_id']
            // props.history.push(url);
            history.push(url);
        }
    }

    
    return (
        <div key={props.index}>
            {district['district_id']} -> {district['district_name']}    ----->>>> Check for Vaccine
            <button  onClick={() => toggleDistrict()}>Show all vaccine centers</button>  
            {show ? (
                
                <ShowVaccines district_id={district['district_id']}/>
            ) : (
                <div></div>
            )}
        </div>
    );
}


export  {ShowDistricts};
