import React, { PropTypes } from 'react';
import { Grid } from 'react-bootstrap';
import { FormattedMessage as FM, IntlMixin } from '../shims/ReactIntl';
import reactMixin from 'react-mixin';
import { Link } from 'react-router';

import AuthStore from '../stores/AuthStore';
import BaseComponent from '../utils/BaseComponent';
import locals from '../utils/locals';
import { connectToStores } from '../utils/StoreUtils';

class Footer extends BaseComponent {
  render() {
    const { signedIn } = this.props;

    return (
      <footer className='bg-gray clearfix'>
        <Grid className='prepend-xs-2 append-xs-2'>
          <Link to='app' className='h1 text-muted'>{locals.brand}</Link>
          &nbsp;&nbsp;
          <small className='text-muted'>
            <FM message={this.getIntlMessage('footer.copyright')}
              year={new Date().getFullYear()} brand={locals.brand} />
          </small>
          <ul className='list-inline pull-right small prepend-xs-1 append-xs-none'>
            <li><Link to='terms'><FM message={this.getIntlMessage('footer.links.terms')} /></Link></li>
            <li><Link to='privacy'><FM message={this.getIntlMessage('footer.links.privacy')} /></Link></li>
            {signedIn && <li><Link to='signout'><FM message={this.getIntlMessage('footer.links.signOut')} /></Link></li>}
          </ul>
        </Grid>
      </footer>
    );
  }
}

reactMixin.onClass(Footer, IntlMixin);

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
