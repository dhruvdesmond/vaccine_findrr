import React from "react";

import ReactDOM from "react-dom";
import "./index.css";


import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {ShowStates} from "./states"
import {Notifications} from "./notifications"

// const jwt = require("jsonwebtoken");

const ImporvedHomePage = (props) => {


    return (
        <Router>
            <div>
                <div>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <a className="navbar-brand" href="/">
                            Vaccine Findrr
                        </a>
                        {/* <a href="/notifications">Notifications</a> */}

                    </nav>
                </div>

                <div className="container">
                    
                    
                    <div className="row ">
                        <Switch>

                           
                            {/* <Route path="/notifications">
                                <Notifications  />
                            </Route> */}
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
        <div>

             <ShowStates />
        </div>
    );
};

// ========================================

ReactDOM.render(<ImporvedHomePage />, document.getElementById("root"));
