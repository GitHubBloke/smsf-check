SMSF Health Check
=================

## Getting Started

Begin by first installing node dependencies:

    $ npm install

Bower is required as well:

    $ npm install -g bower
    $ bower install

### Environment Variables

To help with development, `smsf-check` uses `dotenv` to setup environment
variables locally when the server is started. To get started create a new
`.env` file in the root of this project. Below is a sample of what is
required by the server for it to run:

    ABN_GUID=xxxxxxxxxxxxxxxxxxx
    APP_THEME=superiq
    MANDRILL_API_KEY=xxxxxxxxxxxxxxxx
    MONGO_URL=xxxxxxxxxxxxxxxxx
    NEW_RELIC_LICENSE_KEY=xxxxxxxxxxxxxxxx (optional)
    NEW_RELIC_LOG=stdout (optional)
    NPM_CONFIG_PRODUCTION=false
    PAPERTRAIL_API_TOKEN=xxxxxxxxxxxxxxxx (optional)
    ROOT=http://iqcompare.herokuapp.com
    SEGMENT_WRITE_KEY=xxxxxxxxxxxxxxxx (optional)
    SENTRY_DSN=https://xxxxxxxxxxxxxxxx (optional)

Note: Some of those are test or dummy values, as your supervisor for actual
values you can use.

### Running Locally

Simply run `keystone.js` with `node` to start up the server:

    $ node keystone.js

Or if you're running Heroku's `foreman`:

    $ foreman start

### Tmuxinator

There is also a `tmuxinator.yml` config file for this project as well, if you
would like to use it add it to your `~/.tmuxinator` folder:

    $ ln ~/Work/JimmyMakesThings/smsf-check/tmuxinator.yml ~/.tmuxinator/smsf-check.yml

Then you can kickstart tmux by running:

    $ mux start smsf-check

### Coding Guidelines

We follow this ES6 style guide: https://github.com/elierotenberg/coding-styles/blob/master/es6.md

## Deployment

`smsf-check` is deployed by Heroku, make sure you have the Heroku Toolbet
installed first:

    $ brew install heroku-toolbelt

Then login following these instructions (you can find the Heroku account
details in Jimmy's 1Password vault):
https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up

Once logged in, add the `heroku` Git remote:

    $ heroku git:remote -a smsf-check

You can now deploy simply by pushing to the `heroku` remote:

    $ git push heroku master

## Services, Tools, and Frameworks Used

### Services

* [Heroku - Cloud Application Platform](https://www.heroku.com/)
* [Mandrill - Transactional Email from MailChimp](https://mandrill.com/)
* [New Relic - Application performance management](http://newrelic.com)
* [Segment - Segment is the single hub to collect, translate and route your customer data](https://segment.com)
* [Mixpanel - Business analytics service](https://mixpanel.com)
* [Papertrail - The log management service](https://papertrailapp.com)
* [Sentry - Gives you insight into the errors that affect your customers](https://www.getsentry.com/welcome/)

### Tools

* [Node - A platform built on Chrome's JavaScript runtime for easily building fast, scalable network applications](https://nodejs.org/)
* [ES6 Javascript - via Babel](https://github.com/lukehoban/es6features)
* [Less.js - Less extends CSS with dynamic behavior such as variables, mixins, operations and functions](http://lesscss.org)
* [Jade - Template Engine](http://jade-lang.com)
* [MongoDB - Open-source document database](https://www.mongodb.org)
* [React](https://facebook.github.io/react)

### Frameworks

* [KeystoneJS - Node.js cms and web application platform built on Express and MongoDB](http://keystonejs.com/)
