import React, { Component } from 'react';

export default class Footer extends Component {
  render() {
    return (
      <footer>
        <div className='container'>
          <span className='h1 text-muted'>SuperIQ Logo</span>
          <span className='text-muted'>
            &copy; {new Date().getFullYear()} SuperIQ. All rights reserved.
          </span>
        </div>
      </footer>
    );
  }
}
