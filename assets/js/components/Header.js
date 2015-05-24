import React, { PropTypes } from 'react';
import { Button, Navbar } from 'react-bootstrap';
import { FormattedMessage as FM } from '../shims/ReactIntl';
import { Link } from 'react-router';

import AuthStore from '../stores/AuthStore';
import BaseComponent from '../utils/BaseComponent';
import Icon from './Icon';
import locals from '../utils/locals';
import { connectToStores } from '../utils/StoreUtils';
import SurveyActionCreators from '../actions/SurveyActionCreators';
import SurveyStore from '../stores/SurveyStore';

export default class Header extends BaseComponent {
  constructor(props) {
    super(props);
    this.bind('renderSignedInActions', 'renderSignedOutActions', '_save');
  }

  render() {
    const { signedIn, user } = this.props;

    return (
      <Navbar className='append-xs-none' staticTop
        brand={<span><Link to={signedIn ? 'members' : 'app'} className='logo'>{locals.name}</Link></span>}>
        {signedIn ? this.renderSignedInActions() : this.renderSignedOutActions()}
      </Navbar>
    );
  }

  renderSignedInActions() {
    const { user, surveyIsDirty, surveyIsSaving } = this.props;

    return (
      <div className='navbar-right'>
        <Button bsStyle='primary' bsSize='large' className='btn--wide navbar-btn'
          disabled={!surveyIsDirty || surveyIsSaving} onClick={this._save}>
          <FM message={this.getIntlMessage(`shared.navbar.save.${surveyIsSaving ? 'loadingLabel' : (surveyIsDirty ? 'actionLabel' : 'disabledLabel')}`)} />
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

  _save() {
    SurveyActionCreators.save();
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
  const surveyIsDirty = SurveyStore.isDirty();
  const surveyIsSaving = SurveyStore.isSaving();
  return { signedIn, user, surveyIsDirty, surveyIsSaving };
}

export default connectToStores(Header,
  [ AuthStore, SurveyStore ],
  pickProps,
  getState
);
