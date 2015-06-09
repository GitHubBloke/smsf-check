import React, { PropTypes } from 'react';

import BaseComponent from '../../utils/BaseComponent';

export default class MemberHeader extends BaseComponent {
  render() {
    const { name, children } = this.props;

    return (
      <div className='well__header member__header'>
        <div className='member__name'>
          <h4>{name}</h4>
        </div>
        {children}
      </div>
    );
  }
}

MemberHeader.propTypes = { title: PropTypes.string.isRequired };
MemberHeader.defaultProps = {};
