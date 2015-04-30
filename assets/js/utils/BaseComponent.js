import { Component } from 'react';

export default class BaseComponent extends Component {
  constructor(props) {
    super(props);
  }

   _bind(...methods) {
     methods.forEach((method) => { this[method] = this[method].bind(this); });
  }
}
