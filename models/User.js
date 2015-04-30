import keystone from 'keystone';

const { Field: { Types } } = keystone;

const User = new keystone.List('User');

User.add({
  name: { type: Types.Name, required: true, index: true },
  email: { type: Types.Email, initial: true, required: true, index: true },
  password: { type: Types.Password, initial: true, required: true },
  fund: {
    name: { type: String, required: true, initial: true },
    abn: { type: String, requied: true, initial: true },
  },
  notifications: {
    newsletter: { type: Boolean },
  },
}, 'Permissions', {
  isAdmin: { type: Boolean, label: 'Can access Keystone', index: true }
});

User.schema.virtual('canAccessKeystone').get(function() {
  return this.isAdmin;
});

User.defaultColumns = 'name, email, fund, isAdmin';
User.register();
