import hoops from 'hoops';
import { Component } from 'react';

export default class BaseComponent extends Component {
  _bind(...methods) {
     methods.forEach((method) => { this[method] = this[method].bind(this); });
  }

  _handleInputChange(name, e) {
    const map = {};
    hoops.setIn(map, name, e.target.value);
    this.setState(map);
  }

  _handleCheckboxToggled(name, e) {
    const map = {};
    hoops.setIn(map, name, e.target.checked);
    this.setState(map);
  }
}
