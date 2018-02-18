import React, {Component} from "react";

class Time extends Component {

  render() {
    const times = this.props.times;
    return (
      <ul className="collection">
        {times.map((time, index) => {
          return <li className="collection-item" key={index}>{time.hour} : {time.minute} </li>
        })}
      </ul>
    );
  }
}

export default Time;