// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').load();

// Monitor app with New Relic
if (process.env.NEW_RELIC_LICENSE_KEY) { require('newrelic'); }

// Enable es6
require('babel/register');

// Require modules
var _ = require('lodash');
var keystone = require('keystone');

// Load theme configuration
var themeDir = './themes/' + process.env.APP_THEME;
var themeConfig = require(themeDir + '/theme');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init(_.assign({
  'less': 'public',
  'less middleware options': {
    preprocess: {
      importPaths: function(paths) {
        paths.push(__dirname + '/themes/' + process.env.APP_THEME + '/less');
      }
    }
  },
  'static': [ 'public', 'themes/' + process.env.APP_THEME + '/public' ],
  'favicon': 'public/favicon.ico',
  'views': 'templates/views',
  'view engine': 'jade',

  'emails': 'templates/emails',

  'auto update': true,
  'session': true,
  'auth': true,
  'user model': 'User',
  'cookie secret': '5R(+[4Vaibu}i)zZ^eg:/"bR5{fGtw(JWa|qKbb:3y]M1|n{b7k{~SB*345:03y!',

  'theme directory': themeDir,
}, themeConfig));

// Load your project's Models

keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js

keystone.set('locals', {
  _: require('lodash'),
  env: keystone.get('env'),
  utils: keystone.utils,
  editable: keystone.content.editable,

  JSON: JSON,
  keystone: keystone,
});

// Setup common client side global variables.
//
keystone.set('client locals', {
  env: keystone.get('env'),
  name: keystone.get('name'),
  brand: keystone.get('brand'),
});

// Load your project's Routes

keystone.set('routes', require('./routes'));

// Setup common locals for your emails. The following are required by Keystone's
// default email templates, you may remove them if you're using your own.

keystone.set('email locals', {
  utils: keystone.utils,
  host: (function() {
    if (keystone.get('env') === 'staging') return 'http://smsf-check.herokuapp.com';
    if (keystone.get('env') === 'production') return 'http://www.superiq.com/smsf-check';
    return (keystone.get('host') || 'http://localhost:') + (keystone.get('port') || '3000');
  })(),

  logo_src: '/images/logo-email.gif',
  logo_width: 194,
  logo_height: 76,
  theme: {
    email_bg: '#f9f9f9',
    link_color: '#2697de',
    buttons: {
      color: '#fff',
      background_color: '#2697de',
      border_color: '#1a7cb7',
    },
  },

  name: keystone.get('name'),
  business_address: keystone.get('siq business address'),
});

// Setup replacement rules for emails, to automate the handling of differences
// between development a production.

// Be sure to update this rule to include your site's actual domain, and add
// other rules your email templates require.

keystone.set('email rules', [{
  find: '/images/',
  replace: (keystone.get('env') === 'production') ? 'http://www.your-server.com/images/' : 'http://localhost:3000/images/',
}, {
  find: '/keystone/',
  replace: (keystone.get('env') === 'production') ? 'http://www.your-server.com/keystone/' : 'http://localhost:3000/keystone/',
}]);

// Load your project's email test routes

keystone.set('email tests', require('./routes/emails'));

// Configure the navigation bar in Keystone's Admin UI

keystone.set('nav', {
  'users': 'users',
});

// Fix this bug: http://tech.vg.no/2013/10/02/ios7-bug-shows-white-page-when-getting-304-not-modified-from-server/

keystone.app.disable('etag');
keystone.app.disable('x-powered-by');

// Start Keystone to connect to your database and initialise the web server

keystone.start();
