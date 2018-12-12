import React from 'react';
import CreateReactClass from 'create-react-class';
import PropTypes from 'prop-types';

import isTwelveHourTime from './lib/is-twelve-hour-time';
import replaceCharAt from './lib/replace-char-at';
import getGroupId from './lib/get-group-id';
import getGroups from './lib/get-groups';
import adder from './lib/time-string-adder';
import caret from './lib/caret';
import validate from './lib/validate';

const SILHOUETTE = '00:00:00:000 AM';
const SILHOUETTE_MSDOT = '00:00:00.000 AM';

// isSeparator :: Char -> Bool
const isSeparator = char => /[:.\s]/.test(char);

var TimeInput = CreateReactClass({
  getInitialState() {
    return {};
  },
  getDefaultProps() {
    return {
      value: '12:00 AM',
      silhouette: SILHOUETTE,
    };
  },
  propTypes: {
    className: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    useMSDotDelimiter: PropTypes.bool,
    allowPaste: PropTypes.bool,
    allowMouseWheel: PropTypes.bool,
  },
  getSilhouette() {
    return this.props.useMSDotDelimiter !== true ? SILHOUETTE : SILHOUETTE_MSDOT;
  },
  render() {
    var className = 'TimeInput';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return (
      <div className={className}>
        <input
          className="TimeInput-input"
          ref={input => {
            this.input = input;
          }}
          type="text"
          value={this.format(this.props.value)}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          onKeyDown={this.handleKeyDown}
          onWheel={this.handleMouseWheel}
          onSelect={this.handleSelect}
          onPaste={this.handlePaste}
        />
      </div>
    );
  },
  format(val) {
    if (isTwelveHourTime(val)) val = val.replace(/^00/, '12');
    return val.toUpperCase();
  },
  componentDidMount() {
    this.mounted = true;
  },
  componentWillUnmount() {
    this.mounted = false;
  },
  componentDidUpdate() {
    var index = this.state.caretIndex;
    if (index || index === 0) caret.set(this.input, index);
  },
  handleBlur() {
    if (this.mounted) this.setState({ caretIndex: null });
  },
  handleEscape() {
    if (this.mounted) this.input.blur();
  },
  handleTab(event) {
    var start = caret.start(this.input);
    var value = this.props.value;
    var groups = getGroups(value);
    var groupId = getGroupId(start);
    if (event.shiftKey) {
      if (!groupId) return;
      groupId--;
    } else {
      if (groupId >= groups.length - 1) return;
      groupId++;
    }
    event.preventDefault();
    var index = groupId * 3;
    if (this.props.value.charAt(index) === ' ') index++;
    if (this.mounted) this.setState({ caretIndex: index });
  },
  handleArrows(event) {
    event.preventDefault();
    var start = caret.start(this.input);
    var value = this.props.value;
    var amount = event.which === 38 ? 1 : -1;
    if (event.shiftKey) {
      amount *= 2;
      if (event.metaKey) amount *= 2;
    }
    // console.log(this.props.silhouette);
    value = adder(value, getGroupId(start), amount, this.getSilhouette());
    this.onChange(value, start);
  },
  silhouette() {
    return this.props.value.replace(/\d/g, (val, i) => this.getSilhouette().charAt(i));
  },
  handleBackspace(event) {
    event.preventDefault();
    var start = caret.start(this.input);
    var value = this.props.value;
    var end = caret.end(this.input);
    if (!start && !end) return;
    var diff = end - start;
    var silhouette = this.silhouette();
    if (!diff) {
      if ([':', '.'].includes(value[start - 1])) start--;
      value = replaceCharAt(value, start - 1, silhouette.charAt(start - 1));
      start--;
    } else {
      while (diff--) {
        if (![':', '.'].includes(value[end - 1])) {
          value = replaceCharAt(value, end - 1, silhouette.charAt(end - 1));
        }
        end--;
      }
    }
    if ([':', '.'].includes(value.charAt(start - 1))) start--;
    this.onChange(value, start);
  },
  handleForwardSpace(event) {
    event.preventDefault();
    var start = caret.start(this.input);
    var value = this.props.value;
    var end = caret.end(this.input);
    if ((start === end) === value.length - 1) return;
    var diff = end - start;
    var silhouette = this.silhouette();
    if (!diff) {
      if ([':', '.'].includes(value[start])) start++;
      value = replaceCharAt(value, start, silhouette.charAt(start));
      start++;
    } else {
      while (diff--) {
        if (![':', '.'].includes(value[end - 1])) {
          value = replaceCharAt(value, start, silhouette.charAt(start));
        }
        start++;
      }
    }
    if ([':', '.'].includes(value.charAt(start))) start++;
    this.onChange(value, start);
  },
  handleKeyDown(event) {
    switch (event.which) {
    case 9: // Tab
      return this.handleTab(event);
    case 8: // Backspace
      return this.handleBackspace(event);
    case 46: // Forward
      return this.handleForwardSpace(event);
    case 27: // Esc
      return this.handleEscape(event);
    case 38: // Left
    case 40: // Right
      return this.handleArrows(event);
    default:
      break;
    }
  },
  handleMouseWheel(e) {
    if (this.props.allowMouseWheel !== true) return;
    if (document.activeElement === this.input) {
      e.which = e.deltaY < 0 ? 38 : 40;
      this.handleArrows(e);
    }
  },
  handlePaste(e) {
    if (this.props.allowPaste !== true) return;
    const newValue = e.clipboardData.getData('text/plain');
    if (validate(newValue) && newValue.length === this.props.value.length) {
      this.onChange(newValue, newValue.length);
    }
    event.preventDefault();
  },
  handleSelect(e) {
    // try to get the selection to break at the dot instead of selecting to the colon
    const inp = e.currentTarget;
    if (inp.selectionStart === inp.selectionEnd) {
      this.cursorIndex = inp.selectionStart;
    } else if (inp.selectionStart + inp.selectionEnd !== inp.value.length) {
      const selText = inp.value.substring(inp.selectionStart, inp.selectionEnd);
      const selDot = selText.indexOf('.');
      const textDot = inp.value.indexOf('.');
      if (selDot > -1) {
        if (this.cursorIndex > selDot + inp.selectionStart) {
          inp.setSelectionRange(textDot + 1, textDot + 4);  
        } else {
          inp.setSelectionRange(textDot - 2, textDot);
        }
      }
    }
  },
  handleChange(event) {
    let value = this.props.value;
    let newValue = this.input.value;
    let diff = newValue.length - value.length;
    let end = caret.start(this.input);
    let insertion;
    let start = end - Math.abs(diff);
    event.preventDefault();
    if (diff > 0) {
      insertion = newValue.slice(end - diff, end);
      while (diff--) {
        let oldChar = value.charAt(start);
        let newChar = insertion.charAt(0);
        if (isSeparator(oldChar)) {
          if (isSeparator(newChar)) {
            insertion = insertion.slice(1);
            start++;
          } else {
            start++;
            diff++;
            end++;
          }
        } else {
          value = replaceCharAt(value, start, newChar);
          insertion = insertion.slice(1);
          start++;
        }
      }
      newValue = value;
    } else {
      if ([':', '.'].includes(newValue.charAt(start))) start++;
      // apply default to selection
      let result = value;
      for (var i = start; i < end; i++) {
        result = replaceCharAt(result, i, newValue.charAt(i));
      }
      newValue = result;
    }
    if (validate(newValue)) {
      if ([':', '.'].includes(newValue.charAt(end))) end++;
      this.onChange(newValue, end);
    } else {
      var caretIndex = this.props.value.length - (newValue.length - end);
      if (this.mounted) this.setState({ caretIndex: caretIndex });
    }
  },
  onChange(str, caretIndex) {
    if (this.props.onChange) this.props.onChange(this.format(str));
    if (this.mounted && typeof caretIndex === 'number')
      this.setState({ caretIndex: caretIndex });
  }
});

export default TimeInput;
