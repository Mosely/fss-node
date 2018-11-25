'use strict';
module.exports = function (jagql, handlerConfig) {
  let Handler = require('@jagql/store-sequelize');
  let mainHandler = new Handler(handlerConfig);
  jagql.define({
    resource: 'report_columns',
    handlers: mainHandler,
    primaryKey: 'autoincrement',
    searchParams: {
      //report_id: jagql.Joi.number(),
      header: jagql.Joi.string(),
      table_name: jagql.Joi.string(),
      column_name: jagql.Joi.string(),
      column_order: jagql.Joi.number(),
      width: jagql.Joi.number(),
      created_at: jagql.Joi.date().timestamp('unix'),
      updated_at: jagql.Joi.date().timestamp('unix'),
      updated_by: jagql.Joi.number()
    },
    attributes: {
      //report_id: jagql.Joi.number(),
      header: jagql.Joi.string(),
      table_name: jagql.Joi.string(),
      column_name: jagql.Joi.string(),
      column_order: jagql.Joi.number(),
      width: jagql.Joi.number(),
      created_at: jagql.Joi.date().timestamp('unix').default(Math.round(Date.now() / 1000)),
      updated_at: jagql.Joi.date().timestamp('unix').default(Math.round(Date.now() / 1000)),
      updated_by: jagql.Joi.number().default(1),
      report: jagql.Joi.one('reports')
      
    }
  });
  mainHandler.populate({ force: process.env.FORCE_TABLE_GEN }, () => {
    //tables dropped and created
  });
};
        