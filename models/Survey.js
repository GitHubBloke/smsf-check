import _ from 'lodash';
import keystone from 'keystone';

const { Field: { Types } } = keystone;

const Survey = new keystone.List('Survey');

Survey.add({
  currentStep: { type: String, hidden: true },

  user: { type: Types.Relationship, ref: 'User', required: true, initial: true, noedit: true },
  members: { type: Types.Relationship, ref: 'Member', many: true, noedit: true },

  trust: {
    trusteeType: { type: String, noedit: true },
    deedSupplier: { type: String, noedit: true },
    yearLastUpdated: { type: String, noedit: true },
  },

  accounting: {
    whoDoesIt: { type: String, noedit: true },
    costPerYear: { type: String, noedit: true },
  },

  investmentAdvice: {
    whoDoesIt: { type: String, noedit: true },
    costPerYear: { type: String, noedit: true },
  },

  investmentStrategy: {
    hasStrategy: { type: String, noedit: true },
    considerations: { type: String, noedit: true },
    yearLastUpdated: { type: String, noedit: true },

    cashAndFixedInterest: { type: Number, noedit: true },
    australianEquities: { type: Number, noedit: true },
    internationalEquities: { type: Number, noedit: true },
    directProperty: { type: Number, noedit: true },
    internationalCashAndFixedInterest: { type: Number, noedit: true },
    internationalShares: { type: Number, noedit: true },
    listedProperty: { type: Number, noedit: true },
    mortgages: { type: Number, noedit: true },
    other: { type: Number, noedit: true },
  },

  estatePlanning: {
    haveBeneficiary: { type: String, noedit: true },
  },

  insurance: {
    haveInsurance: { type: String, noedit: true },
  },

  pensions: {
    havePensions: { type: String, noedit: true },
  },

  contributions: {
    haveContributions: { type: String, noedit: true },
  },
});

Survey.schema.set('toJSON', {
  transform(doc, ret) {
    ret.id = ret._id;
    ret.members = _.map(doc.members, (member) => member.toJSON());

    ret.trust = ret.trust || {};
    ret.accounting = ret.accounting || {};
    ret.investmentAdvice = ret.investmentAdvice || {};
    ret.investmentStrategy = ret.investmentStrategy || {};

    ret = _.omit(ret, '_id', '__v');
    return ret;
  },
});

Survey.defaultColumns = 'user';
Survey.register();
