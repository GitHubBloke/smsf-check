import _ from 'lodash';
import keystone from 'keystone';

const { Field: { Types } } = keystone;

const Survey = new keystone.List('Survey');

Survey.add({
  user: { type: Types.Relationship, ref: 'User', required: true, initial: true, noedit: true },
  members: { type: Types.Relationship, ref: 'Member', many: true, noedit: true },

  trusteeType: {
    type: Types.Select,
    options: [
      { value: 'Individuals', label: 'Individuals as Trustee' },
      { value: 'Corporate', label: 'Corporate trustee' },
    ],
    noedit: true,
  },

  deedSupplier: {
    type: Types.Select,
    options: [ 'Freehills', 'Madgwicks', 'SuperCentral', 'Other' ],
    noedit: true,
  },

  yearLastUpdated: { type: Number, noedit: true },
});

Survey.schema.set('toJSON', {
  transform(doc, ret) {
    ret.id = ret._id;
    ret = _.omit(ret, '_id', '__v');
    return ret;
  },
});

Survey.defaultColumns = 'user';
Survey.register();
