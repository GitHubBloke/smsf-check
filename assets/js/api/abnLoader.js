import _ from 'lodash';
import prefix from 'superagent-prefix';
import request from 'superagent';

const prefixer = prefix('/api/abn');

export default (type) => {
  return (q, cb) => {
    if (!q || q.length === 0) { return cb(void 0, { options: [] }); }

    request.get('/lookup')
      .use(prefixer)
      .query({ q, type })
      .send()
      .end((err, res) => {
        cb(err, {
          options: _.map(res.body.abns, (record) => ({
            label: `${record.name} (${record.abn})`,
            value: record.abn,
            abn: record,
          })),
        });
      });
  };
};
