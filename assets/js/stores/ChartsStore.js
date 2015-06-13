import _ from 'lodash';
import Immutable from 'immutable';
import Joi from 'joi';

import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import { createStore } from '../utils/StoreUtils';
import locals from '../utils/locals';

let activeDataSet = 'siq', comparisonMember;

const ChartsStore = createStore({
  getActiveDataSet() { return activeDataSet; },
  getComparisonMember() { return comparisonMember; },
});

ChartsStore.dispatchToken = AppDispatcher.register((payload) => {
  const { action } = payload;
  const { response, err } = action;

  switch (action.type) {
    case ActionTypes.SURVEY_DELETE_MEMBER:
      const { member } = action;
      if (comparisonMember &&
          (comparisonMember.get('id') === member.get('id') ||
          comparisonMember.get('ref') === member.get('ref'))) {
        comparisonMember = void 0;
      }
      break;

    case ActionTypes.SURVEY_MAKE_MEMBER_DIRTY:
      const { member, dirtyMember } = action;
      if (comparisonMember &&
          (comparisonMember.get('id') === member.get('id') ||
          comparisonMember.get('ref') === member.get('ref'))) {
        comparisonMember = dirtyMember;
      }
      break;

    case ActionTypes.SURVEY_CLEAR_DIRTY:
      if (comparisonMember && comparisonMember.get('ref')) {
        comparisonMember = void 0;
      }
      break;

    case ActionTypes.CHARTS_SET_ACTIVE_DATA_SET:
      activeDataSet = action.activeDataSet;
      break;

    case ActionTypes.CHARTS_SET_COMPARISON_MEMBER:
      comparisonMember = action.comparisonMember;
      break;

    default:
      return;
  }

  ChartsStore.emitChange();
});

export default ChartsStore;
