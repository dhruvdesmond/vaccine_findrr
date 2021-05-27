import React, { useState, useEffect } from "react";

import ReactDOM from "react-dom";
import "./index.css";


import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {ShowStates} from "./states"
import {ShowDistricts} from "./districts"
import {ShowVaccines} from "./vaccine"


// const jwt = require("jsonwebtoken");

const ImporvedHomePage = (props) => {


    return (
        <Router>
            <div>
                <div>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <a className="navbar-brand" href="/dashboard">
                            Vaccine Findrr
                        </a>
                        {/* <a href="/states">Go to states</a> */}

                    </nav>
                </div>

                <div className="container">
                    
                    
                    <div className="row ">
                        <Switch>

                            <Route path="/">
                                <Home  />
                            </Route>
                            

                        </Switch>
                    </div>
                </div>

                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            </div>
        </Router>
    );
};

const Home = (props) => {


    return (
        <div className="row">
            <div  className="col-3">
                <ShowStates/>
            </div>
            <div className="col-9">
                <ShowVaccines  /> 
            </div>
            
        </div>
    );
};

// ========================================

ReactDOM.render(<ImporvedHomePage />, document.getElementById("root"));
