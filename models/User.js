import _ from 'lodash';
import async from 'async';
import keystone from 'keystone';

const { Field: { Types } } = keystone;
const Survey = keystone.list('Survey');

const User = new keystone.List('User');

User.add({
  name: { type: Types.Name, required: true, index: true },
  email: { type: Types.Email, initial: true, required: true, index: true },
  password: { type: Types.Password, initial: true, required: true },
  resetPasswordKey: { type: String, hidden: true, index: true },
  survey: { type: Types.Relationship, ref: 'Survey', hidden: true },
}, 'Fund', {
  fund: {
    name: { type: String, label: 'Name' },
    abn: { type: String, label: 'ABN' },
  },
}, 'Permissions', {
  isAdmin: { type: Boolean, label: 'Can access Keystone', index: true },
  isVerified: { type: Boolean, label: 'Has a verified email address' },
});

User.schema.virtual('canAccessKeystone').get(function() {
  return this.isAdmin;
});

User.schema.pre('save', function(next) {
  this.wasNew = this.isNew;

  if (!this.survey) {
    const survey = new Survey.model({ user: this._id });
    survey.save((err) => {
      if (err) { return next(err); }
      this.survey = survey.id;
      next();
    });
  } else {
    next();
  }
});

User.schema.post('save', function() {
  if (this.wasNew) {
    this.resetPassword();
  }
});

User.schema.methods.populateCascade = function(cb = () => {}) {
  return new Promise((resolve, reject) => {
    async.auto({
      survey: (cb) => {
        this.populate('survey', cb);
      },
      members: ['survey', (cb, results) => {
        if (this.survey) {
          this.survey.populate('members', cb);
        } else {
          cb();
        }
      }],
    }, (err) => {
      if (err) { return reject(err); }
      resolve(this);
    });
  });
};

User.schema.methods.resetPassword = function(cb = () => {}) {
  const user = this;

  const subject = user.isVerified ?
    `Reset your ${keystone.get('name')} password` :
    `Welcome to ${keystone.get('name')}`;

  user.resetPasswordKey = keystone.utils.randomString([16, 24]);

  user.save(function(err) {
    if (err) { return cb(err); }

    new keystone.Email(user.isVerified ? 'reset-password' : 'confirm-email').send({
      to: user,
      from: { name: keystone.get('name'), email: keystone.get('siq noreply email') },
      subject,
      user,
    }, cb);
  });
};

User.schema.set('toJSON', {
  transform(doc, ret) {
    ret.id = ret._id;
    ret = _.omit(ret, '_id', '__v', 'password');
    return ret;
  },
});

User.relationship({ path: 'survey', ref: 'Survey', refPath: 'user' });

User.defaultColumns = 'name, email, isAdmin';
User.register();
