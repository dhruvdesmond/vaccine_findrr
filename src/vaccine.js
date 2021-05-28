import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom'
import validator from 'validator'

const ShowVaccines = (props) => {
    // const district_id = props.state_id
    const today_date = new Date(Date.now()).toLocaleString();
    console.log(useParams())
    // let { id } = useParams();
    const [vaccines, setVaccines] = useState([]);
    // const [district_id, setDistrict] = useState(0)
    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState('')
    const [loadingVaccines, setloadingVaccines] = useState(true);
    const [vaccineAvailable, setVaccineAvailable] = useState(false);
    const [vaccineCenter, setVaccineCenter] = useState(false);
    let [totalVaccines, setTotalVaccines] = useState(0)
    const isEmpty = (obj) => {
        return Object.keys(obj).length === 0;
    }
    useEffect(() => {
        setTotalVaccines(0)
        if (props.district_id != "" || props.district_id != 0) {

            console.log("distruct id -======>>>>> ", props.district_id)
            const requestOptions = {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            };
            // console.log("testing")

            let url = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=" + props.district_id.toString() + "&date=" + today_date
            console.log(url)
            fetch(url, requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    if ("error" in data) {
                        console.log(data);
                        alert(data["error"]);
                    } else {
                        console.log("vacciness ====== ")
                        const obj = data['sessions']
                        console.log(obj)
                        // console.log(typeof obj)

                        const myData = [].concat(obj)
                            .sort((a, b) => a.available_capacity_dose1 > b.available_capacity_dose1 ? -1 : 1)
                        console.log(typeof myData)
                        if (isEmpty(myData)) {
                            console.log("Nooooooooooooooo")
                            setVaccineCenter(false)
                        }
                        else {
                            let currVaccines = 0
                            vaccines.map((vaccine) => {
                                currVaccines += vaccine.available_capacity_dose1
                            })
                            if (currVaccines == 0) {
                                setVaccineAvailable(false)
                            } else {
                                setVaccineAvailable(true)
                            }
                            setTotalVaccines(currVaccines)
                            setVaccineCenter(true)
                        }
                        setVaccines(myData)
                        setloadingVaccines(false)

                    }
                });
        }
    }, [props.district_id]);

    const handleSubmit = (e) => {
        e.preventDefault();

    }
    const validateEmail = (email) => {
        // var email = e.target.value

        if (validator.isEmail(email)) {
            setEmailError('')
            // setEmail(email)
        } else {
            setEmailError('Enter valid Email!')

        }
        setEmail(email)
    }


    return (
        <div>

            {loadingVaccines ? <div></div>
                :
                <div>
                    {vaccineCenter ?

                        <div>
                            {vaccineAvailable ?
                                <div> Total vaccines Available = {totalVaccines}</div>
                                :
                                <form

                                    style={{ height: "auto", margin: "15px" }}
                                    onSubmit={handleSubmit}
                                >
                                    No Vaccine Available

                                    <input
                                        className="form-control login-signup"
                                        type="text"
                                        placeholder="Enter your email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => validateEmail(e.target.value)}
                                    />
                                    <span style={{
                                        fontWeight: 'bold',
                                        color: 'red',
                                    }}>{emailError}
                                    </span>
                                    <input
                                        className="form-control   btn-primary login-signup"
                                        type="submit"
                                        value="Get Notified when slot available"
                                    />
                                </form>

                            }
                        </div>
                        :
                        <div>No Vaccine Center found !!</div>
                    }
                </div>
            }
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Address</th>
                        <th scope="col">District</th>
                        <th scope="col">State</th>
                        <th scope="col">Vaccine Name</th>
                        <th scope="col">Available</th>

                    </tr>
                </thead>
                <tbody>
                    {loadingVaccines ? <tr></tr>
                        :
                        vaccines.map((vaccine, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{vaccine.name}</td>
                                <td>{vaccine.address}</td>
                                <td>{vaccine.district_name}</td>
                                <td>{vaccine.state_name}</td>
                                <td>{vaccine.vaccine}</td>
                                <td>{vaccine.available_capacity_dose1}</td>

                            </tr>


                        ))


                    }


                </tbody>
            </table>



        </div>
    );
};



export { ShowVaccines };
