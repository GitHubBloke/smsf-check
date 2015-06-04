import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import UserAPI from '../api/UserAPI';
import UserStore from '../stores/UserStore';

export default {
  setActiveDataSet(activeDataSet) {
    AppDispatcher.handleViewAction({ type: ActionTypes.CHARTS_SET_ACTIVE_DATA_SET, activeDataSet });
  },

  setComparisonMode(comparisonMode) {
    AppDispatcher.handleViewAction({ type: ActionTypes.CHARTS_SET_COMPARISON_MODE, comparisonMode });
  },

  setComparisonMember(comparisonMember) {
    AppDispatcher.handleViewAction({ type: ActionTypes.CHARTS_SET_COMPARISON_MEMBER, comparisonMember });
  },
};
