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

  typesOfBenefits: { type: String },
  yearBenefitLastUpdated: { type: String },
  beneficiary: { type: String },
  hasWill: { type: Boolean },
  hasEnduringPowersOfAttorney: { type: Boolean },

  hasLifeInsurance: { type: Boolean },
  lifeInsuranceAmount: { type: Number },
  lifeInsuranceHeldAt: { type: String },

  hasDisablement: { type: Boolean },
  disablementAmount: { type: Number },
  disablementHeldAt: { type: String },

  hasIncomeProtection: { type: Boolean },
  incomeProtectionAmount: { type: Number },
  incomeProtectionHeldAt: { type: String },

  hasAccountBasedPension: { type: Boolean },
  accountBasedPensionAmount: { type: Number },
  accountBasedPensionInterval: { type: String },

  hasTransitionToRetirementPension: { type: Boolean },
  transitionToRetirementAmount: { type: Number },
  transitionToRetirementInterval: { type: String },

  hasOtherPension: { type: Boolean },
  otherPensionAmount: { type: Number },
  otherPensionInterval: { type: String },
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
