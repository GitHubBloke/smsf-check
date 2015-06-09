import React from 'react';

import analytics from './shims/analytics';
import locals from './utils/locals';
import router from './router';
import i18n from 'i18n';

if (locals.user && analytics) {
  const { user } = locals;

  analytics.identify(user.id, {
    name: `${user.name.first} ${user.name.last}`,
    firstName: user.name.first,
    lastName: user.name.last,
    lastSeen: new Date(),
    username: user.email,
    email: user.email,
    createdAt: new Date(parseInt(user.id.substring(0, 8), 16) * 1000),
  });
}

router.run((Handler, state) => {
  React.render(<Handler {...state} {...i18n.en} />, document.getElementById('container'));
  if (analytics) { analytics.page(); }
});
