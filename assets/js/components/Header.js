import React, { PropTypes } from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router';

import AuthStore from '../stores/AuthStore';
import BaseComponent from '../utils/BaseComponent';
import locals from '../utils/locals';
import { connectToStores } from '../utils/StoreUtils';

export default class Header extends BaseComponent {
  render() {
    const { signedIn, user } = this.props;

    return (
      <Navbar className='append-xs-none' staticTop
        brand={<span><Link to='app' className='logo'>{locals.name}</Link></span>}>
        {!signedIn &&
          <Link to='signin' className='btn btn-primary btn-lg btn--wide navbar-btn navbar-right'>
            Log in
          </Link>}
      </Navbar>
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
