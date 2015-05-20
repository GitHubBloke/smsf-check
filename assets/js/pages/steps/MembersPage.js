import _ from 'lodash';
import Immutable from 'immutable';
import React from 'react';
import { Button, Col, Grid, Row } from 'react-bootstrap';
import DocumentTitle from 'react-document-title';
import { FormattedMessage as FM } from '../../shims/ReactIntl';

import AuthStore from '../../stores/AuthStore';
import BaseComponent from '../../utils/BaseComponent';
import locals from '../../utils/locals';
import MemberDetails from '../../components/MemberDetails';
import { connectToStores } from '../../utils/StoreUtils';
import SurveyActionCreators from '../../actions/SurveyActionCreators';
import SurveyStore from '../../stores/SurveyStore';

class MembersPage extends BaseComponent {
  constructor(props) {
    super(props);
    this.bind('renderMember', '_addMember', '_handleSubmit', '_skip');
  }

  render() {
    const { user, survey } = this.props;

    return (
      <DocumentTitle title={`${locals.name} - ${this.formatMessage(this.getIntlMessage('members.title'))}`}>
        <form noValidate autoComplete='off' onSubmit={this._handleSubmit}>
          <Grid className='prepend-xs-2 append-xs-2'>
            <Row>
              <Col md={16}>
                <h3 className='append-xs-2'><FM message={this.getIntlMessage('members.question')} /></h3>

                <Row>
                  {survey.get('members').map(this.renderMember)}
                  <Col md={12}>
                    <Button block bsSize='large' onClick={this._addMember}>Add a member</Button>
                  </Col>
                </Row>

                <hr />

                <div className='pull-right'>
                  <Button bsSize='large' bsStyle='link' className='link-plain' onClick={this._skip}>
                    <small className='text-muted'>Skip this step</small>
                  </Button>
                  <Button bsSize='large' bsStyle='primary' type='submit'>
                    <FM message={this.getIntlMessage('shared.actions.nextStep.actionLabel')} />
                  </Button>
                </div>
              </Col>
              <Col md={8}>
              </Col>
            </Row>
          </Grid>
        </form>
      </DocumentTitle>
    );
  }

  renderMember(member, index) {
    return (
      <Col key={member.get('id')} md={12}>
        <MemberDetails ref={`members-${index}`} member={member} />
      </Col>
    );
  }

  _addMember() {
    const { survey } = this.props;
    SurveyActionCreators.addMember({ name: `Member ${survey.get('members').size + 1}` });
  }

  _handleSubmit(e) {
    const memberDetails = _.compact(_.map(this.refs, (ref) => {
      if (ref instanceof MemberDetails) { return ref; }
    }));

    const valid = _.reduce(memberDetails, (valid, m) => valid && m.validate(), true);
    if (valid) { this._save(this._skip); }

    e.preventDefault();
  }

  _save(cb) {
    cb();
  }

  _skip() {
    console.log('skipped');
  }
}

MembersPage.propTypes = {};
MembersPage.defaultProps = {};

function pickProps({ params }) {
  return { params };
}

function getState({ params }) {
  const user = AuthStore.getUser();
  const survey = SurveyStore.getSurvey();
  return { user, survey };
}

export default connectToStores(MembersPage,
  [ AuthStore, SurveyStore ],
  pickProps,
  getState
);
