import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import AuthStore from '../stores/AuthStore';
import BaseComponent from '../utils/BaseComponent';
import locals from '../utils/locals';
import { connectToStores } from '../utils/StoreUtils';

class Footer extends BaseComponent {
  render() {
    const { signedIn } = this.props;

    return (
      <footer>
        <div className='container prepend-xs-2 append-xs-2'>
          <Link to='app' className='h1 text-muted'>{locals.brand} Logo</Link>
          &nbsp;&nbsp;
          <small className='text-muted'>
            &copy; {new Date().getFullYear()} {locals.brand}. All rights reserved.
          </small>
          <ul className='list-inline pull-right small prepend-xs-1 append-xs-none'>
            <li><Link to='terms'>Terms &amp; Conditions</Link></li>
            <li><Link to='privacy'>Privacy Policy</Link></li>
            {signedIn && <li><Link to='signout'>Sign Out</Link></li>}
          </ul>
        </div>
      </footer>
    );
  }
}

Footer.propTypes = { signedIn: PropTypes.bool };
Footer.defaultProps = { signedIn: false };

function pickProps({ params }) {
  return { params };
}

function getState({ params }) {
  const signedIn = AuthStore.signedIn();
  return { signedIn };
}

export default connectToStores(Footer,
  [ AuthStore ],
  pickProps,
  getState
);
