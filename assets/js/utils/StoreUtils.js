import _ from 'lodash';
import { EventEmitter } from 'events';
import React from 'react';
import shallowEqual from 'react/lib/shallowEqual';

const CHANGE_EVENT = 'change';

export function createStore(spec) {
  const store = _.assign({
    emitChange() {
      this.emit(CHANGE_EVENT);
    },

    addChangeListener(callback) {
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener(callback) {
      this.removeListener(CHANGE_EVENT, callback);
    }
  }, spec, EventEmitter.prototype);

  _.each(store, (val, key) => {
    if (_.isFunction(val)) {
      store[key] = store[key].bind(store);
    }
  });

  store.setMaxListeners(0);
  return store;
}


export function connectToStores(Component, stores, pickProps, getState) {
  const StoreConnector = React.createClass({
    getStateFromStores(props) {
      return getState(pickProps(props));
    },

    getInitialState() {
      return this.getStateFromStores(this.props);
    },

    componentDidMount() {
      stores.forEach(store =>
        store.addChangeListener(this.handleStoresChanged)
      );

      this.setState(this.getStateFromStores(this.props));
    },

    componentWillReceiveProps(nextProps) {
      if (!shallowEqual(pickProps(nextProps), pickProps(this.props))) {
        this.setState(this.getStateFromStores(nextProps));
      }
    },

    componentWillUnmount() {
      stores.forEach(store =>
        store.removeChangeListener(this.handleStoresChanged)
      );
    },

    handleStoresChanged() {
      if (this.isMounted()) {
        this.setState(this.getStateFromStores(this.props));
      }
    },

    render() {
      return <Component {...this.props} {...this.state} />;
    }
  });

  return StoreConnector;
}
