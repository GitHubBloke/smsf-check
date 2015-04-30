import React from 'react';
import DocumentTitle from 'react-document-title';
import { Link } from 'react-router';

import BaseComponent from '../utils/BaseComponent';
import locals from '../utils/locals';

export default class RegisterPage extends BaseComponent {
  render() {
    return (
      <DocumentTitle title={`${locals.name} - Register`}>
        <form>
          <p>So we can remember who you are, and identify your fund, please enter the details below.</p>
          <div className='prepend-xs-2 append-xs-1 clearfix'>
            <div className='form-group col-md-6'>
              <input type='text' className='form-control input-lg' placeholder='Enter your first name...' />
            </div>
            <div className='form-group col-md-6'>
              <input type='text' className='form-control input-lg' placeholder='Enter your last name...' />
            </div>
            <div className='form-group col-md-12'>
              <input type='text' className='form-control input-lg' placeholder='Enter your email address...' />
            </div>
            <div className='form-group col-md-12'>
              <input type='text' className='form-control input-lg' placeholder='The name of your fund...' />
            </div>
            <div className='form-group col-md-12'>
              <input type='text' className='form-control input-lg' placeholder="Your fund's ABN..." />
            </div>
            <div className='form-group col-md-12 prepend-xs-tiny append-xs-tiny text-left'>
              <label>
                <input type='checkbox' value='true' />&nbsp;
                I consent to SuperIQ using my data to compare my fund to other funds.
              </label>
              <label>
                <input type='checkbox' value='true' />&nbsp;
                I would like to receive additional information from SuperIQ via email.
              </label>
            </div>
          </div>
          <button className='btn btn-default btn-lg append-xs-1' type='submit'>Register your fund now</button>
          <p className='append-xs-none'>Already registered? <Link to='login'>Log In</Link></p>
        </form>
      </DocumentTitle>
    );
  }
}
