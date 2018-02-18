import React, {Component} from "react";
import {Navbar} from "react-materialize";
import Buses from "./Components/Buses";
import "./App.css";

class App extends Component {

  render() {
    return (
      <div className="container">
        <Navbar className="indigo" brand="Transport for London" right />
        <div className="App">
          <Buses/>
        </div>
      </div>
    );
  }
}

export default App;
