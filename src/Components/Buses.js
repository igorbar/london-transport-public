import React, {Component} from "react";
import {Button, Dropdown, NavItem, Icon, ProgressBar} from "react-materialize";
import PropTypes from "prop-types";
import config from "../config";
import BusStopes from "./BusStopes";

class Buses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      buses: [],
      currentBus: null
    };
  }

  getBuses() {
    fetch(`${config.url}/Line/Route?serviceTypes=Regular&mode=bus`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          isLoaded: true,
          buses: data,
          error: data.httpStatusCode === 400 ? data.message : null
        });
      });
  }

  toggleBus(e) {
    e.preventDefault();
  }

  getCurrentBus(bus) {
    this.setState({
      currentBus: bus
    });
  }

  componentDidMount() {
    this.getBuses();
  }

  render() {
    const {error, isLoaded, buses, currentBus} = this.state;

    if (error) {
      return <div className="card-panel red">{error}</div>;
    } else if (!isLoaded) {
      return <ProgressBar />;
    } else {
      return (
        <div>
          <Dropdown onClick={this.toggleBus.bind(this)} trigger={
                <Button>{currentBus ? `Bus #${currentBus.name}` : 'Select Bus'} 
                <Icon left>directions_bus</Icon></Button>
            }>
            {buses.map((bus)=> {
              return <NavItem key={bus.id} onClick={this.getCurrentBus.bind(this, bus)}>{bus.name}</NavItem>
            })}
          </Dropdown>
          {currentBus && <BusStopes bus={currentBus}/>
          }
        </div>
      );
    }
  }
}

Buses.propTypes = {
  buses: PropTypes.array,
  currentBus: PropTypes.object,
  isLoaded: PropTypes.bool
}

export default Buses;