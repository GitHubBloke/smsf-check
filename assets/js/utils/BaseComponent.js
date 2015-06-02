import _ from 'lodash';
import { Component } from 'react';
import { IntlMixin } from '../shims/ReactIntl';
import reactMixin from 'react-mixin';

export default class BaseComponent extends Component {
  bind(...methods) {
    methods.forEach((method) => { this[method] = this[method].bind(this); });
  }

  linkState(path, modifier = (v) => v) {
    return {
      value: this.state.data.getIn(path.split('.')),
      requestChange: (newValue) => this._setState(path, modifier(newValue)),
    };
  }

  valueLink(path, onChange = () => {}, getModifier = (v) => v, setModifier = (v) => v) {
    return {
      value: getModifier(this.state.data.getIn(path.split('.'))),
      onChange: (...args) => {
        onChange(...args);
        return this._setState(path, setModifier(args[0]));
      },
    };
  }

  translatedOptions(name) {
    return _.map(this.getIntlMessage(name), (option) => {
      let value, label;

      if (_.isObject(option)) {
        value = option.value;
        label = this.formatMessage(option.label);
      } else {
        value = label = this.formatMessage(option);
      }

      return { value, label };
    });
  }

  _setState(path, value, cb) {
    this.setState((prev) => ({
      data: prev.data.setIn(path.split('.'), value),
    }), cb);
  }
}

reactMixin.onClass(BaseComponent, IntlMixin);
