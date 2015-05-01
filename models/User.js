import _ from 'lodash';
import keystone from 'keystone';

const { Field: { Types } } = keystone;

const User = new keystone.List('User');

User.add({
  name: { type: Types.Name, required: true, index: true },
  email: { type: Types.Email, initial: true, required: true, index: true },
  password: { type: Types.Password, initial: true, required: true },
  resetPasswordKey: { type: String, hidden: true, index: true },
}, 'Fund', {
  fund: {
    name: { type: String, label: 'Name', required: true, initial: true },
    abn: { type: String, label: 'ABN', requied: true, initial: true },
  },
}, 'Notifications', {
  notifications: {
    newsletter: { type: Boolean, label: `Receive additional information from ${keystone.get('brand')} via email` },
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
  next();
});

User.schema.post('save', function() {
  if (this.wasNew) {
    this.resetPassword();
  }
});

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
      from: { name: keystone.get('brand'), email: keystone.get('siq noreply email') },
      subject,
      user,
    }, cb);
  });
};

User.schema.set('toJSON', {
  transform(doc, ret) {
    ret.id = ret._id;
    ret.name.full = doc.name.full;
    ret = _.omit(ret, '_id', '__v', 'password');
    return ret;
  },
});

User.defaultColumns = 'name, email, fund, isAdmin';
User.register();
