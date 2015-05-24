import _ from 'lodash';
import logger from '../../logger';
import soap from 'soap';

export function lookup(req, res) {
  const { q, type } = req.query;

  soap.createClient('http://abr.business.gov.au/abrxmlsearch/AbrXmlSearch.asmx?WSDL', (err, client) => {
    if (err) { logger.error(err); }
    if (err) { return res.status(409).json(err); }

    let method, params;

    switch (type) {
      case 'name':
        method = 'ABRSearchByNameAdvancedSimpleProtocol2012';
        params = { name: q, maxSearchResults: 5 };
        break;
      case 'abn':
        method = 'SearchByABNv201408';
        params = {
          searchString: q,
          includeHistoricalDetails: 'N',
        };
        break;
      default:
        return res.status(400).json({ message: '`type` not specified' });
    }

    params.authenticationGuid = process.env.ABN_GUID;

    client[method](params, (err, result) => {
      if (err) { logger.error(err); }
      if (err) { return res.status(500).json(err); }

      const { response } = result.ABRPayloadSearchResults;
      const { regulator } = response.businessEntity201408.superannuationStatus || {};

      if (response.exception || regulator !== 'ATOREGULATED') {
        return res.json({ abns: [] });
      }

      function getName(field) {
        return field && (_.isArray(field) ? field[0].organisationName : field.organisationName);
      }

      function retrieveName(record) {
        return getName(record.businessName) || getName(record.mainTradingName) || getName(record.mainName) || (record.legalName && record.legalName.fullName);
      }

      switch (type) {
        case 'name':
          return res.json({
            abns: _.map(response.searchResultsList.searchResultsRecord, (record) => ({
              name: retrieveName(record),
              abn: record.ABN[0].identifierValue,
            }))
          });
        case 'abn':
          const record = response.businessEntity201408;
          return res.json({
            abns: [ { name: retrieveName(record), abn: record.ABN[0].identifierValue } ]
          });
      }
    });
  });
}
