import React, { PropTypes } from 'react';
import { Grid } from 'react-bootstrap';
import { FormattedMessage as FM } from '../shims/ReactIntl';
import { Link } from 'react-router';

import AuthStore from '../stores/AuthStore';
import BaseComponent from '../utils/BaseComponent';
import locals from '../utils/locals';
import { connectToStores } from '../utils/StoreUtils';

class Footer extends BaseComponent {
  render() {
    const { signedIn } = this.props;

    return (
      <footer className='footer clearfix'>
        <Grid className='prepend-xs-1 append-xs-1 prepend-md-2 append-md-2'>
          <Link to='app' className='h1 text-muted'><span className='logo-brand'>{locals.brand}</span></Link>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <small className='text-alpha visible-xs-block visible-sm-inline visible-md-inline visible-lg-inline prepend-xs-tiny'>
            <FM message={this.getIntlMessage('footer.copyright')}
              year={new Date().getFullYear()} brand={locals.brand} />
          </small>
          <ul className='list-inline pull-sm-right small prepend-xs-1 append-xs-none'>
            <li><Link to='terms' className='link-plain'><FM message={this.getIntlMessage('footer.links.terms')} /></Link></li>
            <li>&bull;</li>
            <li><Link to='privacy' className='link-plain'><FM message={this.getIntlMessage('footer.links.privacy')} /></Link></li>
            {signedIn &&
              [ <li key='bull'>&bull;</li>,
                <li key='signout'><Link to='signout' className='link-plain'><FM message={this.getIntlMessage('footer.links.signOut')} /></Link></li> ]}
          </ul>
        </Grid>
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
