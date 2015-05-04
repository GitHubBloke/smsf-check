import { Component } from 'react';

export default class BaseComponent extends Component {
  _bind(...methods) {
     methods.forEach((method) => { this[method] = this[method].bind(this); });
  }

  _handleInputChange(name, e) {
    const value = e.target.value;
    const path = name.split('.');
    this.setState((prev) => ({
      data: prev.data.setIn(path, value),
    }));
  }

  _handleCheckboxToggled(name, e) {
    const checked = e.target.checked;
    const path = name.split('.');
    this.setState((prev) => ({
      data: prev.data.setIn(path, checked),
    }));
  }
}
