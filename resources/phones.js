'use strict';
module.exports = function (jagql, handlerConfig) {
  let Handler = require('@jagql/store-sequelize');
  let mainHandler = new Handler(handlerConfig);
  jagql.define({
    resource: 'phones',
    handlers: mainHandler,
    primaryKey: 'autoincrement',
    searchParams: {
      area_code: jagql.Joi.number(),
      phone_number: jagql.Joi.number(),
      extension: jagql.Joi.number(),
      phone_type: jagql.Joi.string(),
      created_at: jagql.Joi.date().timestamp('unix'),
      updated_at: jagql.Joi.date().timestamp('unix'),
      updated_by: jagql.Joi.number()
    },
    attributes: {
      area_code: jagql.Joi.number(),
      phone_number: jagql.Joi.number(),
      extension: jagql.Joi.number().allow(null),
      phone_type: jagql.Joi.string(),
      created_at: jagql.Joi.date().timestamp('unix').default(Math.round(Date.now() / 1000)),
      updated_at: jagql.Joi.date().timestamp('unix').default(Math.round(Date.now() / 1000)),
      updated_by: jagql.Joi.number().default(1),
      person: jagql.Joi.belongsToOne('people')
      
    }
  });
  mainHandler.populate({ force: process.env.FORCE_TABLE_GEN }, () => {
    //tables dropped and created
  });
};
        