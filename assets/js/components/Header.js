import React, { PropTypes } from 'react';
import { Button, Navbar } from 'react-bootstrap';
import { FormattedMessage as FM } from '../shims/ReactIntl';
import { Link } from 'react-router';

import AuthStore from '../stores/AuthStore';
import BaseComponent from '../utils/BaseComponent';
import Icon from './Icon';
import locals from '../utils/locals';
import { connectToStores } from '../utils/StoreUtils';

export default class Header extends BaseComponent {
  constructor(props) {
    super(props);
    this.bind('renderSignedInActions', 'renderSignedOutActions');
  }

  render() {
    const { signedIn, user } = this.props;

    return (
      <Navbar className='append-xs-none' staticTop
        brand={<span><Link to='app' className='logo'>{locals.name}</Link></span>}>
        {signedIn ? this.renderSignedInActions() : this.renderSignedOutActions()}
      </Navbar>
    );
  }

  renderSignedInActions() {
    const { user } = this.props;

    return (
      <div className='navbar-right'>
        <div className='navbar-text text-bold'>
          <Icon id='android-person' />
          &nbsp;&nbsp;
          {user.getIn([ 'name', 'first' ])}
        </div>

        <Button bsStyle='primary' bsSize='large' className='btn--wide navbar-btn'>
          <FM message={this.getIntlMessage('shared.navbar.save.actionLabel')} />
        </Button>
      </div>
    );
  }

  renderSignedOutActions() {
    return (
      <Link to='signin' className='btn btn-primary btn-lg btn--wide navbar-btn navbar-right'>
        <FM message={this.getIntlMessage('shared.navbar.signin.actionLabel')} />
      </Link>
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
