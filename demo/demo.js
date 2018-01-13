import React from 'react';

import TimeInput from '../dist/TimeInput';
import gitLogo from './github.png';

export default class DemoTimeInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      val1: '11:30:00:000 PM',
      val2: '11:30:00:000',
      val3: '11:30 PM',
      val4: '11:30'
    };
  }

  onInputChange(val) {
    return time => {
      this.setState({
        [val]: time
      });
    };
  }

  render() {
    const keys = Object.keys(this.state);

    return (
      <div>
        <div className="demo-header">
          <div className="demo-header__middle">
            <h4>react-keyboard-time-input demo</h4>
            <a
              href="https://github.com/radumardale/react-keyboard-time-input"
              className="github-link">
              <img src={gitLogo} />
            </a>
          </div>
        </div>

        <div className="middle-container">
          {keys.map(valName => (
            <TimeInput
              key={valName}
              onChange={this.onInputChange(valName).bind(this)}
              value={this.state[valName]}
              defaultValue="12:00:00:000 AM"
            />
          ))}
        </div>
      </div>
    );
  }
}
