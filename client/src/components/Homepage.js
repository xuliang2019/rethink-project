import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from './../logo.svg';

export class Homepage extends Component {
    render() {
        return (
            <React.Fragment>
                <div>
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1>Welcome to Rethink Coding Challenges</h1>
                    <Link to="/search" className="page-link">Search</Link>
                    <Link to="/tinyurl" className="page-link">TinyURL</Link>
                </div>
            </React.Fragment>
        )
    }
}

export default Homepage;

