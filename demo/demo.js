import React from "react";

import TimeInput from "../dist/TimeInput";

export default class DemoTimeInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      val1: '11:30:00:000 PM',
      val2: '11:30:00:000',
      val3: '11:30 PM',
      val4: '11:30',
    };
  }

  onInputChange(val) {
    return time => {
      this.setState({
        [val]: time
      });
    }
  }

  render() {

    const keys = Object.keys(this.state);

    return (
      <div>
        {keys.map(valName => (
          <TimeInput
            key={valName}
            onChange={this.onInputChange(valName).bind(this)}
            value={this.state[valName]}
            defaultValue="12:00:00:000 AM"
          />
        ))}
      </div>
    );
  }
}
