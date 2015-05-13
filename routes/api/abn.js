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
        params = { name: q };
        break;
      case 'abn':
        method = 'SearchByABNv201408';
        params = {
          searchString: q,
          includeHistoricalDetails: 'N',
          authenticationGuid: '',
        };
        break;
      default:
        return res.status(400).json({ message: '`type` not specified' });
    }

    client[method](params, (err, result) => {
      if (err) { logger.error(err); }
      if (err) { return res.status(500).json(err); }

      const { response } = result.ABRPayloadSearchResults;

      /*if (response.exception) {
        return res.status(400).json({
          message: response.exception.exceptionDescription
        });
      }*/

      res.json({
        funds: [
          { name: 'Commonwealth Bank Essential Super', abn: '48 123 123 124' },
        ],
      });
    });
  });
}
