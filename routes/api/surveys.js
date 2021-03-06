import _ from 'lodash';
import async from 'async';
import keystone, { session } from 'keystone';
import moment from 'moment';

import logger from '../../logger';

const Member = keystone.list('Member');
const Survey = keystone.list('Survey');

export function update(req, res) {
  const { id } = req.params;

  let user;

  async.auto({
    survey(cb) {
      Survey.model.findById(id).exec((err, survey) => {
        if (!survey) { return res.status(404).json({ message: 'Survey not found' }); }
        cb(err, survey);
      });
    },

    updateMembers: ['survey', (cb, { survey }) => {
      const { members } = req.body;

      Promise.all(_.map(members, (member) => {
        return new Promise((resolve, reject) => {
          if (member.dateOfBirth) { member.dateOfBirth = moment(member.dateOfBirth, 'DD / MM / YYYY'); }

          if (member.id) {
            Member.model.findById(member.id).exec((err, existingMember) => {
              if (err) { return cb(err); }
              _.assign(existingMember, member);
              existingMember.save((err, member) => {
                if (err) { return reject(err); }
                resolve(member);
              });
            });
          } else {
            new Member.model(member).save((err, member) => {
              if (err) { return reject(err); }
              resolve(member);
            });
          }
        });
      })).then(
        (members) => cb(void 0, members),
        (err) => cb(err)
      );
    }],

    assignMembers: ['updateMembers', (cb, { survey, updateMembers: members }) => {
      req.body.members = _.pluck(members, '_id');
      cb();
    }],

    updateSurvey: ['assignMembers', (cb, { survey }) => {
      survey.getUpdateHandler(req).process(req.body, {
        fields:
          `currentStep,
           members,
           trust.trusteeType, trust.deedSupplier, trust.yearLastUpdated,
           accounting.whoDoesIt, accounting.costPerYear,
           investmentAdvice.whoDoesIt, investmentAdvice.costPerYear,
           investmentStrategy.hasStrategy, investmentStrategy.considerations, investmentStrategy.yearLastUpdated,
           investmentStrategy.cashAndFixedInterest, investmentStrategy.australianEquities,
           investmentStrategy.internationalEquities, investmentStrategy.directProperty,
           investmentStrategy.internationalCashAndFixedInterest, investmentStrategy.internationalShares,
           investmentStrategy.listedProperty, investmentStrategy.mortgages,
           investmentStrategy.other,
           estatePlanning.haveBeneficiary,
           insurance.haveInsurance,
           pensions.havePensions,
           contributions.haveContributions`,
      }, cb);
    }],

    populateSurvey: ['updateSurvey', (cb, { survey }) => {
      survey.populate('members', cb);
    }],
  }, (err, { populateSurvey: survey }) => {
    if (err) { logger.error(err); }
    if (err) { return res.status(400).json(err); }
    res.json({ survey: survey.toJSON() });
  });
}
