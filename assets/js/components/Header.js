import React, { PropTypes } from 'react';

import AuthStore from '../stores/AuthStore';
import BaseComponent from '../utils/BaseComponent';
import locals from '../utils/locals';
import { connectToStores } from '../utils/StoreUtils';

export default class Header extends BaseComponent {
  render() {
    const { user } = this.props;

    return (
      <header className='bg-dark clearfix'>
        <div className='clearfix'>
          <div className='container prepend-xs-1 append-xs-1'>
            <h1 className='prepend-xs-tiny pull-left'>{locals.name}</h1>
            <h4 className='pull-right text-muted prepend-xs-1'>{user.getIn(['name', 'first'])}'s Report</h4>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = { signedIn: PropTypes.bool };
Header.defaultProps = { signedIn: false };

function pickProps({ params }) {
  return { params };
}

function getState({ params }) {
  const signedIn = AuthStore.signedIn();
  const user = AuthStore.getUser();
  return { signedIn, user };
}

export default connectToStores(Header,
  [ AuthStore ],
  pickProps,
  getState
);
