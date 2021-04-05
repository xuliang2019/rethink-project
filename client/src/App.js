import React from "react";
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Homepage from "./components/Homepage";
import Search from "./components/Search";
import TinyURL from "./components/TinyURL";

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/tinyurl" component={TinyURL} />
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
