'use strict';
module.exports = function (jagql, handlerConfig) {
  let Handler = require('@jagql/store-sequelize');
  let mainHandler = new Handler(handlerConfig);
  jagql.define({
    resource: 'schools',
    handlers: mainHandler,
    primaryKey: 'autoincrement',
    searchParams: {
      name: jagql.Joi.string(),
      //city_data_id: jagql.Joi.number(),
      //state_data_id: jagql.Joi.number(),
      street: jagql.Joi.string(),
      zipcode: jagql.Joi.number(),
      zipcode_plus_four: jagql.Joi.number(),
      created_at: jagql.Joi.date().timestamp('unix'),
      updated_at: jagql.Joi.date().timestamp('unix'),
      updated_by: jagql.Joi.number()
    },
    attributes: {
      name: jagql.Joi.string(),
      //city_data_id: jagql.Joi.number(),
      //state_data_id: jagql.Joi.number(),
      street: jagql.Joi.string(),
      zipcode: jagql.Joi.number(),
      zipcode_plus_four: jagql.Joi.number().allow(null),
      created_at: jagql.Joi.date().timestamp('unix').default(Math.round(Date.now() / 1000)),
      updated_at: jagql.Joi.date().timestamp('unix').default(Math.round(Date.now() / 1000)),
      updated_by: jagql.Joi.number().default(1),
      city_data: jagql.Joi.one('city_data'),
      state_data: jagql.Joi.one('state_data')
      
    }
  });
  mainHandler.populate({ force: process.env.FORCE_TABLE_GEN }, () => {
    //tables dropped and created
  });
};
        