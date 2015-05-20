import _ from 'lodash';
import React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import DocumentTitle from 'react-document-title';

import AuthStore from '../../stores/AuthStore';
import BaseComponent from '../../utils/BaseComponent';
import locals from '../../utils/locals';
import MemberDetails from '../../components/MemberDetails';
import { connectToStores } from '../../utils/StoreUtils';

class MembersPage extends BaseComponent {
  constructor(props) {
    super(props);
    this.bind('renderMember');
  }

  render() {
    const { user } = this.props;

    return (
      <DocumentTitle title={`${locals.name} - ${this.formatMessage(this.getIntlMessage('members.title'))}`}>
        <div>
          <Grid className='prepend-xs-2 append-xs-2'>
            <Row>
              <Col md={16}>
                <Row>
                  {user.getIn([ 'survey', 'members' ]).map(this.renderMember)}
                </Row>
              </Col>
              <Col md={8}>
              </Col>
            </Row>
          </Grid>
        </div>
      </DocumentTitle>
    );
  }

  renderMember(member) {
    return <Col key={member.get('id')} md={12}><MemberDetails member={member} /></Col>;
  }
}

MembersPage.propTypes = {};
MembersPage.defaultProps = {};

function pickProps({ params }) {
  return { params };
}

function getState({ params }) {
  const user = AuthStore.getUser();
  return { user };
}

export default connectToStores(MembersPage,
  [ AuthStore ],
  pickProps,
  getState
);
