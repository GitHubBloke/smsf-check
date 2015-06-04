import _ from 'lodash';
import keystone from 'keystone';
import moment from 'moment';

const { Field: { Types } } = keystone;

const Member = new keystone.List('Member');

Member.add({
  name: { type: String },
  gender: { type: Types.Select, options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }], default: 'male' },
  dateOfBirth: { type: Types.Date, format: 'DD / MM / YYYY' },
  preRetirementAnnualIncome: { type: Number },
  currentMemberBalance: { type: Number },
  isRetired: { type: Boolean },
});

Member.schema.set('toJSON', {
  transform(doc, ret) {
    ret.id = ret._id;
    ret = _.omit(ret, '_id', '__v');
    ret.dateOfBirth = moment(doc.dateOfBirth).format('DD / MM / YYYY');
    return ret;
  },
});

Member.defaultColumns = 'name, gender, dateOfBirth, preRetirementAnnualIncome, currentMemberBalance, isRetired';
Member.register();
