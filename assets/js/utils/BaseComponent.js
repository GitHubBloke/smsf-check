import { Component } from 'react';

export default class BaseComponent extends Component {
  _bind(...methods) {
     methods.forEach((method) => { this[method] = this[method].bind(this); });
  }

  _setState(path, value, cb) {
    this.setState((prev) => ({
      data: prev.data.setIn(path.split('.'), value),
    }), cb);
  }

  _handleInputChange(name, modifier = v => v, e) {
    const value = e.target.value;
    this._setState(name, modifier(value));
  }

  _handleCheckboxToggled(name, e) {
    const checked = e.target.checked;
    this._setState(name, checked);
  }
}

