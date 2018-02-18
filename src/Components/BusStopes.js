import React, {Component} from "react";
import {Button, Dropdown, NavItem, Icon} from "react-materialize";
import PropTypes from "prop-types";
import config from "../config";
import TimeTable from "./TimeTable";


class BusStopes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      busStopes: null,
      currentStop: null
    };
  }

  setCurrentBusStop(line) {
    this.setState({
      currentStop: line
    });
  }

  triggerStop(e) {
    e.preventDefault();
  }

  getBusRoute(busId) {
    fetch(`${config.url}/line/${busId}/stoppoints`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          currentStop: null,
          busStopes: data,
          error: data.httpStatusCode === 400 ? data.message : null
        });
      });
  }

  componentDidMount() {
    this.getBusRoute(this.props.bus.id);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.bus.id !== nextProps.bus.id) {
      this.getBusRoute(nextProps.bus.id);
    }
  }

  render() {
    const {error, busStopes, currentStop} = this.state;

    if (error) {
      return <div className="card-panel red">{error}</div>;
    } else {
      return (
        <div>
          {this.props.bus &&
          <Dropdown onClick={this.triggerStop.bind(this)} trigger={
                    <Button>{currentStop ? currentStop.commonName : 'Select Stop'}
                    <Icon left>place</Icon></Button>
                }>
            {busStopes && busStopes.map((item)=> {
              return <NavItem key={item.id} onClick={this.setCurrentBusStop.bind(this, item)}>
                {item.commonName} - {item.indicator}</NavItem>
            })}
          </Dropdown>
          }
          {currentStop && <TimeTable busId={this.props.bus.id} stopId={currentStop.id}/>}
        </div>
      );
    }    
  }

}

BusStopes.propTypes = {
  busStopes: PropTypes.array,
  currentStop: PropTypes.object
}

export default BusStopes;