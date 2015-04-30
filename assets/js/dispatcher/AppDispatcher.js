import _ from 'lodash';
import { Dispatcher } from 'flux';

import PayloadSources from '../constants/PayloadSources';

const AppDispatcher = _.assign(new Dispatcher(), {
  handleServerAction(action) {
    console.log('Server action', action);

    if (!action.type) {
      throw new Error('Empty action.type: you likely mistyped the action.');
    }

    this.dispatch({
      source: PayloadSources.SERVER_ACTION,
      action,
    });
  },

  handleViewAction(action) {
    console.log('View action', action);

    if (!action.type) {
      throw new Error('Empty action.type: you likely mistyped the action.');
    }

    this.dispatch({
      source: PayloadSources.VIEW_ACTION,
      action,
    });
  },
});

export default AppDispatcher;
