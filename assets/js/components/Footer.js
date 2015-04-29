import React, { Component } from 'react';

export default class Footer extends Component {
  render() {
    return (
      <footer>
        <div className='container prepend-xs-2 append-xs-2'>
          <span className='h1 text-muted'>SuperIQ Logo</span>
          &nbsp;&nbsp;
          <small className='text-muted'>
            &copy; {new Date().getFullYear()} SuperIQ. All rights reserved.
          </small>
        </div>
      </footer>
    );
  }
}
