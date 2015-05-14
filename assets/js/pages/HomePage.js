import React from 'react';
import { Button, Col, Grid, Nav, NavItem, Row, Well } from 'react-bootstrap';
import { FormattedMessage as FM } from '../shims/ReactIntl';
import { RouteHandler } from 'react-router';

import BaseComponent from '../utils/BaseComponent';
import Header from '../components/Header';
import Icon, { IconStack } from '../components/Icon';
import locals from '../utils/locals';

export default class HomePage extends BaseComponent {
  render() {
    return (
      <div>
        <Header />

        <div className='hero text-inverse'>
          <Grid>
            <Row className='text-center clearfix'>
              <Col md={10} mdOffset={3} className='prepend-xs-2 append-xs-2 prepend-md-5 append-md-5'>
                <h1 className='prepend-xs-tiny'>{locals.name}</h1>
                <h3 className='text-normal'>
                  <FM message={this.getIntlMessage('home.intro')}
                    name={locals.name}
                    brand={locals.brand} />
                </h3>
                <div className='prepend-xs-1'>
                  <Button className='btn-clear btn--wide' bsSize='large' href='/#register'>Sign up</Button>
                </div>
              </Col>
            </Row>
          </Grid>
        </div>

        <Grid>
          <Row className='text-center prepend-xs-2 prepend-sm-3'>
            <Col md={4} mdOffset={2} className='append-xs-2 append-sm-3'>
              <IconStack size='3'>
                <Icon id='record' size='2' stacked className='text-primary' />
                <Icon id='android-lock' size='1' stacked className='text-inverse' />
              </IconStack>
              <div className='prepend-xs-1'>
                <FM message={this.getIntlMessage('home.features.safeData')} />
              </div>
            </Col>
            <Col md={4} className='append-xs-2 append-sm-3'>
              <IconStack size='3'>
                <Icon id='record' size='2' stacked className='text-primary' />
                <Icon id='information' size='1' stacked className='text-inverse' />
              </IconStack>
              <div className='prepend-xs-1'>
                <FM message={this.getIntlMessage('home.features.greatAdvice')} />
              </div>
            </Col>
            <Col md={4} className='append-xs-2 append-sm-3'>
              <IconStack size='3'>
                <Icon id='record' size='2' stacked className='text-primary' />
                <Icon id='stats-bars' size='1' stacked className='text-inverse' />
              </IconStack>
              <div className='prepend-xs-1'>
                <FM message={this.getIntlMessage('home.features.compare')} />
              </div>
            </Col>
          </Row>

          <Row className=''>
            <Col md={12} mdOffset={2} className='append-xs-2'>
              <Well bsSize='large'>
                <RouteHandler {...this.props}/>
              </Well>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
