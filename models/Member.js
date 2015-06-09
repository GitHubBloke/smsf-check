import _ from 'lodash';
import keystone from 'keystone';
import moment from 'moment';

const { Field: { Types } } = keystone;

const Member = new keystone.List('Member');

Member.add({
  name: { type: String, label: 'Name', noedit: true },
  gender: {
    type: Types.Select,
    label: 'Gender',
    options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }],
    default: 'male',
    noedit: true,
  },

  dateOfBirth: { type: Types.Date, format: 'DD / MM / YYYY', noedit: true },
  preRetirementAnnualIncome: { type: Number, noedit: true },
  currentMemberBalance: { type: Number, noedit: true },
  isRetired: { type: Boolean, noedit: true },
}, 'Death Benefits', {
  typesOfBenefits: { type: String, label: 'Type of benefits', noedit: true },
  yearBenefitLastUpdated: { type: String, label: 'Last updated', noedit: true },
  beneficiary: { type: String, label: 'Who is the beneficiary?', noedit: true },
  hasWill: { type: Boolean, label: 'Has will', noedit: true },
  hasEnduringPowersOfAttorney: { type: Boolean, label: 'Has Enduring Powers of Attorney', noedit: true },
}, 'Insurance', {
  hasLifeInsurance: { type: Boolean, label: 'Has life insurance', noedit: true },
  lifeInsuranceAmount: { type: Number, label: 'Life insurance amount', noedit: true },
  lifeInsuranceHeldAt: { type: String, label: 'Life insurance period', noedit: true },

  hasDisablement: { type: Boolean, label: 'Has total and permanent disablement', noedit: true },
  disablementAmount: { type: Number, label: 'Disablement amount', noedit: true },
  disablementHeldAt: { type: String, label: 'Disablement period', noedit: true },

  hasIncomeProtection: { type: Boolean, label: 'Has income protection', noedit: true },
  incomeProtectionAmount: { type: Number, label: 'Income protection amount', noedit: true },
  incomeProtectionHeldAt: { type: String, label: 'Income protection period', noedit: true },
}, 'Pensions', {
  hasAccountBasedPension: { type: Boolean, label: 'Has account based pension', noedit: true },
  accountBasedPensionAmount: { type: Number, label: 'Account based pension amount', noedit: true },
  accountBasedPensionInterval: { type: String, label: 'Account based pension period', noedit: true },

  hasTransitionToRetirementPension: { type: Boolean, label: 'Has transition to retirement pension', noedit: true },
  transitionToRetirementAmount: { type: Number, label: 'Transition to retirement pension amount', noedit: true },
  transitionToRetirementInterval: { type: String, label: 'Transition to retirement pension period', noedit: true },

  hasOtherPension: { type: Boolean, label: 'Has other type of pension', noedit: true },
  otherPensionAmount: { type: Number, label: 'Other pension amount', noedit: true },
  otherPensionInterval: { type: String, label: 'Other pension period', noedit: true },
}, 'Contributions', {
  hasConcessionalContribution: { type: Boolean, label: 'Has concessional contributions', noedit: true },
  concessionalContributionAmount: { type: Number, label: 'Concessional contributions amount', noedit: true },
  concessionalContributionInterval: { type: String, label: 'Concessional contributions period', noedit: true },

  hasNonConcessionalContribution: { type: Boolean, label: 'Has non-concessional contributions', noedit: true },
  nonConcessionalContributionAmount: { type: Number, label: 'Non-concessional contributions amount', noedit: true },
  nonConcessionalContributionInterval: { type: String, label: 'Non-contributions contributions period', noedit: true },

  hasOtherContribution: { type: Boolean, label: 'Has other contributions', noedit: true },
  otherContributionAmount: { type: Number, label: 'Other contributions amount', noedit: true },
  otherContributionInterval: { type: String, label: 'Other contributions period', noedit: true },
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
