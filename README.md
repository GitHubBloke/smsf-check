SMSF Health Check
=================

## Getting Started

Begin by first installing node dependencies:

    $ npm install

### Environment Variables

To help with development, `smsf-check` uses `dotenv` to setup environment
variables locally when the server is started. To get started create a new
`.env` file in the root of this project. Below is a sample of what is
required by the server for it to run:

    MANDRILL_API_KEY=NY8RRKyv1Bure9bdP8-TOQ

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
