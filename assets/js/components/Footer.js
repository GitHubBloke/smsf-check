import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Footer extends Component {
  render() {
    return (
      <footer>
        <div className='container prepend-xs-2 append-xs-2'>
          <Link to='app' className='h1 text-muted'>SuperIQ Logo</Link>
          &nbsp;&nbsp;
          <small className='text-muted'>
            &copy; {new Date().getFullYear()} SuperIQ. All rights reserved.
          </small>
          <ul className='list-inline pull-right small prepend-xs-1 append-xs-none'>
            <li><Link to='terms'>Terms &amp; Conditions</Link></li>
            <li><Link to='privacy'>Privacy Policy</Link></li>
          </ul>
        </div>
      </footer>
    );
  }
}
