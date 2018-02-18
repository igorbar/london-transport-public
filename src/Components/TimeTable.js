import React, {Component} from "react";
import {Collapsible, CollapsibleItem, ProgressBar} from "react-materialize";
import PropTypes from "prop-types";
import config from "../config";
import Time from "./Time";


class TimeTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timetable: null,
      isTimeTableLoading: false,
      error: null
    };
  }

  getBusTimeTable(busId, stopId) {
    this.setState({isTimeTableLoading: true});
    fetch(`${config.url}/Line/${busId}/Timetable/${stopId}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          timetable: data.timetable,
          isTimeTableLoading: false,
          error: data.httpStatusCode === 400 ? data.message : null
        });
      });
  }

  componentDidMount() {
    this.getBusTimeTable(this.props.busId, this.props.stopId);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.stopId !== nextProps.stopId) {
      this.getBusTimeTable(this.props.busId, nextProps.stopId);
    }
  }

  render() {
    const {error, timetable, isTimeTableLoading} = this.state;

    if (error) {
      return <div className="card-panel red">{error}</div>;
    } else if (isTimeTableLoading) {
      return <ProgressBar />;
    } else {
      return (
        <Collapsible>
        {timetable && timetable.routes &&
          timetable.routes.length > 0 &&
          timetable.routes[0].schedules.map(item=> {
            return <CollapsibleItem key={item.name} header={item.name} icon="schedule">
              <Time times={item.knownJourneys}/>
            </CollapsibleItem>
          })        
        }      
        </Collapsible>
      )
    }
  }
}

TimeTable.propTypes = {
  timetable: PropTypes.object,
  isTimeTableLoading: PropTypes.bool
}

export default TimeTable;