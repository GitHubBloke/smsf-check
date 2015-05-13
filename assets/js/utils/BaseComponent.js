import { Component } from 'react';
import { IntlMixin } from '../shims/ReactIntl';
import reactMixin from 'react-mixin';

export default class BaseComponent extends Component {
  bind(...methods) {
     methods.forEach((method) => { this[method] = this[method].bind(this); });
  }

  linkState(path, modifier) {
    return {
      value: this.state.data.getIn(path.split('.')),
      requestChange: (newValue) => this._setState(path, newValue),
    };
  }

  valueLink(path, onChange = () => {}) {
    return {
      value: this.state.data.getIn(path.split('.')),
      onChange: (...args) => {
        onChange(...args);
        return this._setState(path, args[0]);
      },
    };
  }

  _setState(path, value, cb) {
    this.setState((prev) => ({
      data: prev.data.setIn(path.split('.'), value),
    }), cb);
  }
}

reactMixin.onClass(BaseComponent, IntlMixin);
