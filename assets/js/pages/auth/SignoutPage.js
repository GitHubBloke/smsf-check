import React from 'react';

import AuthActionCreators from '../../actions/AuthActionCreators';
import BaseComponent from '../../utils/BaseComponent';
import locals from '../../utils/locals';

export default class Signout extends BaseComponent {
  componentDidMount () {
    AuthActionCreators.signout();
  }

  render() {
    return (
      <div className='container text-center prepend-xs-2 append-xs-3'>
        <p>Please wait... currently signing you out of {locals.name}</p>
      </div>
    );
  }
}
