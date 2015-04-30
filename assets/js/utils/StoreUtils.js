import _ from 'lodash';
import { EventEmitter } from 'events';
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
