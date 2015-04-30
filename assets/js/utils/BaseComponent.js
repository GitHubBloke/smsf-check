import { Component } from 'react';

export default class BaseComponent extends Component {
  _bind(...methods) {
     methods.forEach((method) => { this[method] = this[method].bind(this); });
  }

  _handleInputChange(name, e) {
    this.setState({ [name]: e.target.value });
  }

  _handleCheckboxToggled(name, e) {
    this.setState({ [name]: e.target.checked });
  }
}
