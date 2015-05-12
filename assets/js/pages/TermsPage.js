import React from 'react';
import { Grid } from 'react-bootstrap';
import { FormattedMessage as FM, IntlMixin } from '../shims/ReactIntl';
import reactMixin from 'react-mixin';
import DocumentTitle from 'react-document-title';

import BaseComponent from '../utils/BaseComponent';
import locals from '../utils/locals';

export default class TermsPage extends BaseComponent {
  render() {
    return (
      <DocumentTitle title={`${locals.name} - ${this.formatMessage(this.getIntlMessage('terms.title'))}`}>
        <Grid className='prepend-xs-2 append-xs-3'>
          <h1 className='text-center append-xs-3'>
            <FM message={this.getIntlMessage('terms.heading')} />
          </h1>

          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin auctor felis diam. Nam ac eleifend metus. Nullam congue neque sem, vitae consectetur tortor lacinia vitae. Pellentesque interdum urna id ipsum aliquet, nec volutpat nisl iaculis. Phasellus in semper nunc, quis hendrerit dolor. Pellentesque in risus pharetra, feugiat nibh non, malesuada turpis. Pellentesque lorem elit, maximus eget eleifend a, rutrum sit amet lorem. Etiam eleifend lacus velit, quis vulputate velit sagittis quis.</p>

          <p>Duis et quam ac urna blandit pellentesque at id justo. Sed ut libero ante. Duis in tortor mollis, faucibus justo in, faucibus magna. Integer luctus massa a venenatis maximus. Mauris ornare elit augue. Nam et ullamcorper libero. Curabitur aliquam nisl nec sapien luctus eleifend sed sed nulla.</p>

          <p>Nam lectus nisl, faucibus congue lorem a, rutrum aliquam nulla. Morbi pellentesque tellus id nulla imperdiet, et pulvinar enim feugiat. Donec gravida nibh facilisis laoreet lobortis. Pellentesque iaculis, metus ut iaculis consectetur, neque urna blandit mauris, vel dignissim arcu elit maximus lectus. Nam eu efficitur ex. Integer consectetur nunc in cursus fermentum. Fusce et aliquet tellus, et euismod ex. Sed ac sapien mi. Sed non felis at enim porta vehicula non et libero. Sed neque felis, lobortis ut pulvinar eu, eleifend in justo. Duis ac arcu dolor. Aenean ultricies tristique nisi vestibulum congue.</p>

          <p>Integer tempor elementum convallis. Sed posuere finibus iaculis. Etiam tempus elit ex, et vehicula lorem lobortis at. Morbi volutpat ullamcorper lacus, et molestie elit bibendum ut. Cras ac malesuada tortor. Nunc at dolor id nibh dignissim rutrum at sit amet sem. Nullam non tincidunt massa, vitae elementum eros. Etiam dignissim massa et lorem tempus pharetra. Nulla suscipit, erat non auctor tristique, ex elit tristique nunc, sit amet fringilla arcu ipsum id eros. Mauris augue lacus, iaculis eu fermentum sit amet, tempus id ex. Sed finibus faucibus libero id euismod. Cras lacinia viverra dui, nec blandit urna posuere luctus. Integer at eleifend sapien. Quisque sollicitudin libero et odio molestie cursus.</p>

          <p>Sed a elementum nulla. Phasellus vel urna justo. Curabitur id justo orci. Cras et accumsan nisi. Donec eu urna tincidunt felis egestas laoreet vel vel quam. Nullam viverra porta arcu. Sed vel augue lobortis, posuere urna sed, dictum ligula. Mauris a gravida lectus. Praesent nec auctor ligula, ut condimentum augue. Morbi dapibus sed risus id malesuada. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec pretium sem. Aliquam consectetur et lectus scelerisque gravida. Aliquam dapibus lobortis leo, in fringilla ante. Nulla egestas nisl a dui ornare, non rutrum ante tincidunt. Aliquam erat volutpat.</p>
        </Grid>
      </DocumentTitle>
    );
  }
}

reactMixin.onClass(TermsPage, IntlMixin);
