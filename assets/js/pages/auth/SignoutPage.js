import React, { PropTypes } from 'react';
import { Grid } from 'react-bootstrap';
import { Link } from 'react-router';

import AuthActionCreators from '../../actions/AuthActionCreators';
import AuthStore from '../../stores/AuthStore';
import BaseComponent from '../../utils/BaseComponent';
import locals from '../../utils/locals';
import router from '../../router';
import { connectToStores } from '../../utils/StoreUtils';

class SignoutPage extends BaseComponent {
  componentDidMount () {
    if (!AuthStore.signedIn()) {
      router.replaceWith('/');
    } else {
      AuthActionCreators.signout();
    }
  }

  render() {
    const { signingOut } = this.props;

    return (
      <Grid className='text-center prepend-xs-2 append-xs-3'>
        <h1 className='text-center append-xs-3'>
          <Link to='/'>{locals.name}</Link>
        </h1>
        {signingOut ?
          <p className='text-muted'>Please wait... currently signing you out of {locals.name}.</p> :
          <p className='text-muted'>You are now signed out of {locals.name}.</p>}
      </Grid>
    );
  }
}

SignoutPage.propTypes = { signingOut: PropTypes.bool };
SignoutPage.defaultProps = { signingOut: false };

function pickProps({ params }) {
  return { params };
}

function getState({ params }) {
  const signingOut = AuthStore.signingOut();
  return { signingOut };
}

export default connectToStores(SignoutPage,
  [ AuthStore ],
  pickProps,
  getState
);
