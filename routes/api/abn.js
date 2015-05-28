import _ from 'lodash';
import logger from '../../logger';
import soap from 'soap';

export function lookup(req, res) {
  const { q, type } = req.query;

  soap.createClient('http://www.superfundlookup.gov.au/xmlsearch/SflXmlSearch.asmx?WSDL', (err, client) => {
    if (err) { logger.error(err); }
    if (err) { return res.status(409).json(err); }

    const method = 'SearchByABN';
    const params = { abn: q, guid: process.env.ABN_GUID };

    client[method](params, (err, result) => {
      if (err) { logger.error(err); }
      if (err) { return res.status(500).json(err); }

      const { Response: response } = result.SuperFundPayload;

      if (response.Exception) {
        return res.json({ abns: [] });
      }

      return res.json({
        abns: [{
          name: response.SuperannuationFund.OrganisationName.Name,
          abn: q,
        }]
      });
    });
  });
}
