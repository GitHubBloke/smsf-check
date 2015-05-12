import React from 'react';

import router from './router';
import { i18n } from 'theme';

router.run((Handler, state) => {
  React.render(<Handler {...state} {...i18n.en} />, document.getElementById('container'));
});
