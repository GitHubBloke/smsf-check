import React from 'react';
import { RouteHandler } from 'react-router';

import { requireAuth } from '../utils/AuthUtils';
import BaseComponent from '../utils/BaseComponent';
import Header from '../components/Header';
import locals from '../utils/locals';

class ToolPage extends BaseComponent {
  render() {
    return (
      <div>
        <Header />
        <RouteHandler {...this.props}/>
      </div>
    );
  }
}

export default requireAuth(ToolPage);
