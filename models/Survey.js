import _ from 'lodash';
import keystone from 'keystone';

const { Field: { Types } } = keystone;

const Survey = new keystone.List('Survey');

Survey.add({
  currentStep: { type: String, hidden: true },

  user: { type: Types.Relationship, ref: 'User', required: true, initial: true, noedit: true },
  members: { type: Types.Relationship, ref: 'Member', many: true, noedit: true },
}, 'Trust Structure', {
  trust: {
    trusteeType: { type: String, label: 'Trustee type', noedit: true },
    deedSupplier: { type: String, label: 'Deed supplier', noedit: true },
    yearLastUpdated: { type: String, label: 'Last updated', noedit: true },
  },
}, 'Tax & Accounting', {
  accounting: {
    whoDoesIt: { type: String, label: 'Who does accounting', noedit: true },
    costPerYear: { type: String, label: 'Cost per year', noedit: true },
  },
}, 'Investment Advice', {
  investmentAdvice: {
    whoDoesIt: { type: String, label: 'Who provides investment advice', noedit: true },
    costPerYear: { type: String, label: 'Cost per year', noedit: true },
  },
}, 'Investment Strategy', {
  investmentStrategy: {
    hasStrategy: { type: String, label: 'Has investmemt strategy', noedit: true },
    considerations: { type: String, label: 'Considers cashflow, liquidity liabilities and tax consequences of holding certain assets for the fund', noedit: true },
    yearLastUpdated: { type: String, label: 'Last updated', noedit: true },
  },
}, 'Asset Allocations', {
  investmentStrategy: {
    cashAndFixedInterest: { type: Number, label: 'Cash & fixed interest', noedit: true },
    australianEquities: { type: Number, label: 'Australian equities', noedit: true },
    internationalEquities: { type: Number, label: 'International equities', noedit: true },
    directProperty: { type: Number, label: 'Direct property', noedit: true },
    internationalCashAndFixedInterest: { type: Number, label: 'International cash & fixed interest', noedit: true },
    internationalShares: { type: Number, label: 'International shares', noedit: true },
    listedProperty: { type: Number, label: 'Listed property', noedit: true },
    mortgages: { type: Number, label: 'Mortages', noedit: true },
    other: { type: Number, label: 'Other', noedit: true },
  },
}, 'Estate Planning', {
  estatePlanning: {
    haveBeneficiary: { type: String, label: 'Members have death benefit nominations', noedit: true },
  },
}, 'Insurance', {
  insurance: {
    haveInsurance: { type: String, label: 'Members have insurance',  noedit: true },
  },
}, 'Pensions', {
  pensions: {
    havePensions: { type: String, label: 'Members have pensions', noedit: true },
  },
}, 'Contributions', {
  contributions: {
    haveContributions: { type: String, label: 'Members make contributions', noedit: true },
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
