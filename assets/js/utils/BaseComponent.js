import { Component } from 'react';
import { IntlMixin } from '../shims/ReactIntl';
import reactMixin from 'react-mixin';

export default class BaseComponent extends Component {
  linkState(path, modifier) {
    return {
      value: this.state.data.getIn(path.split('.')),
      requestChange: (newValue) => this._setState(path, newValue),
    };
  }

  bind(...methods) {
     methods.forEach((method) => { this[method] = this[method].bind(this); });
  }

  _setState(path, value, cb) {
    this.setState((prev) => ({
      data: prev.data.setIn(path.split('.'), value),
    }), cb);
  }
}

reactMixin.onClass(BaseComponent, IntlMixin);
