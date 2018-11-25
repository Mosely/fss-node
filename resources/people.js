'use strict';
module.exports = function (jagql, handlerConfig) {
  let Handler = require('@jagql/store-sequelize');
  let mainHandler = new Handler(handlerConfig);
  jagql.define({
    resource: 'people',
    handlers: mainHandler,
    primaryKey: 'autoincrement',
    searchParams: {
      first_name: jagql.Joi.string(),
      last_name: jagql.Joi.string(),
      middle_name: jagql.Joi.string(),
      date_of_birth: jagql.Joi.date().timestamp('unix'),
      age: jagql.Joi.number(),
      //gender_id: jagql.Joi.number(),
      created_at: jagql.Joi.date().timestamp('unix'),
      updated_at: jagql.Joi.date().timestamp('unix'),
      updated_by: jagql.Joi.number()
    },
    attributes: {
      first_name: jagql.Joi.string(),
      last_name: jagql.Joi.string(),
      middle_name: jagql.Joi.string().allow(null),
      date_of_birth: jagql.Joi.date().timestamp('unix'),
      age: jagql.Joi.number(),
      //gender_id: jagql.Joi.number(),
      created_at: jagql.Joi.date().timestamp('unix').default(Math.round(Date.now() / 1000)),
      updated_at: jagql.Joi.date().timestamp('unix').default(Math.round(Date.now() / 1000)),
      updated_by: jagql.Joi.number().default(1),
      gender: jagql.Joi.one('genders'),
      phone: jagql.Joi.one('phones'),
      address: jagql.Joi.one('addresses')
      
    }
  });
  mainHandler.populate({ force: process.env.FORCE_TABLE_GEN }, () => {
    //tables dropped and created
  });
};
        