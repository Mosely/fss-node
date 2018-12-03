'use strict';
module.exports = function (jagql, handlerConfig) {
  let Handler = require('@jagql/store-sequelize');
  let mainHandler = new Handler(handlerConfig);
  jagql.define({
    resource: 'report_criterias',
    handlers: mainHandler,
    primaryKey: 'uuid',
    searchParams: {
      //report_column_id: jagql.Joi.number(),
      relation: jagql.Joi.string(),
      criteria_value: jagql.Joi.string(),
      is_hidden: jagql.Joi.boolean(),
      created_at: jagql.Joi.date().timestamp('unix'),
      updated_at: jagql.Joi.date().timestamp('unix'),
      updated_by: jagql.Joi.number()
    },
    attributes: {
      //report_column_id: jagql.Joi.number(),
      relation: jagql.Joi.string(),
      criteria_value: jagql.Joi.string(),
      is_hidden: jagql.Joi.boolean(),
      created_at: jagql.Joi.date().timestamp('unix').default(Math.round(Date.now() / 1000)),
      updated_at: jagql.Joi.date().timestamp('unix').default(Math.round(Date.now() / 1000)),
      updated_by: jagql.Joi.number().default(1),
      report_column: jagql.Joi.one('report_columns')
      
    }
  });
  mainHandler.populate({ force: process.env.FORCE_TABLE_GEN }, () => {
    //tables dropped and created
  });
};
        