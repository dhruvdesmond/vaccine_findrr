import React, { useState, useEffect } from "react";

const Notifications = (props) => {
    const [notifs, setNotifs] = useState([]);
    console.log("notifications           ===>>>>>")
    useEffect(() => {

        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        };
        console.log("notifications           ===>>>>>")

        let base_url = process.env.REACT_APP_URL;
        let second_arg = "notifications";
        let url = base_url + second_arg;
        console.log(url)
        fetch(url, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if ("error" in data) {
                    console.log(data);
                    alert(data["error"]);
                } else {
                    // console.log("states ====== ")
                    console.log(data)
                    // setStates(data["states"])
                    setNotifs(data)
                }
            });
    }, []);
    const unsubscribe = (id) => {
        console.log("id --->>> ",id)
        // e.preventDefault();
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: id,
                // district_id: props.district_id
            }),
        };
        // console.log("testing")
        let base_url = process.env.REACT_APP_URL;
        let second_arg = "notifications/unsubscribe";
        let url = base_url + second_arg;
        console.log(url)
        fetch(url, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if ("error" in data) {
                    console.log(data);
                    alert(data["error"]);
                } else {
                    // props.toggleSignUp();
                    console.log(data)
                }
            });
    }

    return (
        <div >
            Notifications in console log
            {notifs.map((notifaction, index) => (
                <div key={index}>
                    {notifaction.is_subscribed ?
                        <div key={notifaction.id}>
                            {notifaction.id}. {notifaction.email} -> {notifaction.district_id}
                            <button onClick={() => unsubscribe(notifaction.id)}>Unsubscribe</button>
                        </div>
                        :
                        <div key={notifaction.id}>
                            Not subscribed
                            {notifaction.email} -> {notifaction.district_id}
                            <button onClick={() => unsubscribe(notifaction.id)}>Subscribe</button>
                        </div>
                    }
                </div>
            



            ))}
        </div>
    );
};



export { Notifications };
