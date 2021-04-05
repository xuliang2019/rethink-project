import React, { Component } from "react";
import { Link } from "react-router-dom";
var validUrl = require('valid-url');
const shortid = require('shortid');
const baseURL = "http://localhost:3000/";
 

export class TinyURL extends Component {

    state = {
        isCreated: false,
        shortenURL: "",
        url: "",
    }

    handleClick = (url) => {
        if(this.verifyURL(url)) {
            this.getOrCreateShortenURL(url);
        }
        else {
            alert("Invalid URL");
        }
    };

    verifyURL = (url) => {
        if (validUrl.isUri(url)){
            return true;
        } else {
            return false;
        }
    }

    getOrCreateShortenURL = (url) => {
        fetch('/api/item?originalURL=' + url)
          .then(response => response.json())
          .then(data => {
              // if exists in db, get and return
              if (data.length !== 0) {
                  this.setState({
                      isCreated: true,
                      shortenURL: data[0].shorten_url,
                   });
              }
              // if not exist in db, create and insert
              else {
                  let shortId = shortid.generate();
                  let metaData = {
                    "shorten_url": baseURL + shortId,
                    "original_url": url,
                    "short_id": shortId,
                  };

                  this.setState({
                    isCreated: true,
                    shortenURL: metaData.shorten_url
                 });
                
                  fetch('/api/addItem', {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(metaData)
                  });
              }
          });
    }

    handleInput = (e) => {
        this.setState({url: e.target.value});
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <h1>TinyURL Cutomization</h1>
                    <input className="search-bar" onChange={this.handleInput} placeholder="Please Input Your URL"></input>
                    {this.state.isCreated &&
                        <h4>{this.state.shortenURL}</h4>
                    }
                    <button className="btn btn-success" onClick={() => this.handleClick(this.state.url)}>Get Your tinyURL</button>
                    <Link to="/" className="page-link">Homepage</Link>
                </div>
            </React.Fragment>
        )
    }
}

export default TinyURL;