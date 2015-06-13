import React from 'react';

import analytics from './shims/analytics';
import AuthServerActionCreators from './actions/AuthServerActionCreators';
import locals from './utils/locals';
import router from './router';
import i18n from 'i18n';

if (locals.user) {
  AuthServerActionCreators.handleSigninSuccess({ user: locals.user }, false);
}

router.run((Handler, state) => {
  React.render(<Handler {...state} {...i18n.en} />, document.getElementById('container'));
  if (analytics) { analytics.page(state.path); }
});
