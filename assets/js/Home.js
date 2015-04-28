import React, { Component } from 'react';
import { RouteHandler } from 'react-router';

export default class Home extends Component {
  render() {
    return (
      <div>
        <div className='container text-center'>
          <h1>SMSF Health Check</h1>
          <h3>
            Welcome to the SuperIQ SMSF Health Check tool.
            Compare your current fund to thousands of others
            SMSFs to see how your fund stacks up.
          </h3>

          <div className='row'>
            <div className='col-md-4'>
              <h4>Know your data is safe with bank-level security.</h4>
            </div>
            <div className='col-md-4'>
              <h4>Provide as much or as little information as you like and still see results.</h4>
            </div>
            <div className='col-md-4'>
              <h4>Compare your fund to over 11,000 funds from ATO and SuperIQ databases.</h4>
            </div>
          </div>

          <div className="well well-lg text-center">
            <RouteHandler/>
          </div>
        </div>
      </div>
    );
  }
}
