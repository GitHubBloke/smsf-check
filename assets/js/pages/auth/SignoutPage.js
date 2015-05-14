import React, { PropTypes } from 'react';
import { Grid } from 'react-bootstrap';
import { FormattedMessage as FM } from '../../shims/ReactIntl';
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
      <Grid className='text-center prepend-xs-5 append-xs-5'>
        {signingOut ?
          <p className='h4 text-muted prepend-xs-none append-xs-none'>
            <FM message={this.getIntlMessage('signout.signingOut')} name={locals.name} />
          </p> :
          <p className='h4 text-muted prepend-xs-none append-xs-none'>
            <FM message={this.getIntlMessage('signout.signedOut')} name={locals.name} />
          </p>}
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
