import React from 'react';
import { RouteHandler } from 'react-router';

import BaseComponent from '../utils/BaseComponent';
import locals from '../utils/locals';

export default class HomePage extends BaseComponent {
  render() {
    return (
      <div>
        <div className='container text-center prepend-xs-2 append-xs-3'>
          <h1>{locals.name}</h1>
          <h3>
            Welcome to the {locals.brand} {locals.name}.
            Compare your current fund to thousands of others
            SMSFs to see how your fund stacks up.
          </h3>

          <div className='row prepend-xs-2 append-xs-2'>
            <div className='col-md-4'>
              <img src='http://placehold.it/100x100' width='100' />
              <h4>Know your data is safe with bank-level security.</h4>
            </div>
            <div className='col-md-4'>
              <img src='http://placehold.it/100x100' width='100' />
              <h4>Provide as much or as little information as you like and still see results.</h4>
            </div>
            <div className='col-md-4'>
              <img src='http://placehold.it/100x100' width='100' />
              <h4>Compare your fund to over 11,000 funds from ATO and {locals.brand} databases.</h4>
            </div>
          </div>

          <div className="well well-lg text-center">
            <RouteHandler {...this.props}/>
          </div>
        </div>
      </div>
    );
  }
}
