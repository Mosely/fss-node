'use strict';
module.exports = function (jagql, handlerConfig) {
  let Handler = require('@jagql/store-sequelize');
  let mainHandler = new Handler(handlerConfig);
  jagql.define({
    resource: 'addresses',
    handlers: mainHandler,
    primaryKey: 'uuid',
    searchParams: {
      street_number: jagql.Joi.number(),
      street_name: jagql.Joi.string(),
      street_suffix: jagql.Joi.string(),
      zipcode: jagql.Joi.number(),
      zipcode_plus_four: jagql.Joi.number(),
      //city_data_id: jagql.Joi.number(),
      //state_data_id: jagql.Joi.number(),
      //county_data_id: jagql.Joi.number(),
      apartment_number: jagql.Joi.number(),
      created_at: jagql.Joi.date().timestamp('unix'),
      updated_at: jagql.Joi.date().timestamp('unix'),
      updated_by: jagql.Joi.number()
    },
    attributes: {
      street_number: jagql.Joi.number(),
      street_name: jagql.Joi.string(),
      street_suffix: jagql.Joi.string(),
      zipcode: jagql.Joi.number(),
      zipcode_plus_four: jagql.Joi.number().allow(null),
      //city_data_id: jagql.Joi.number(),
      //state_data_id: jagql.Joi.number(),
      //county_data_id: jagql.Joi.number(),
      apartment_number: jagql.Joi.number().allow(null),
      created_at: jagql.Joi.date().timestamp('unix').default(Math.round(Date.now() / 1000)),
      updated_at: jagql.Joi.date().timestamp('unix').default(Math.round(Date.now() / 1000)),
      updated_by: jagql.Joi.number().default(1),
      city_data: jagql.Joi.one('city_data'),
      state_data: jagql.Joi.one('state_data'),
      county_data: jagql.Joi.one('county_data'),
      people: jagql.Joi.belongsToMany({ resource: 'people', as: 'address' })
    }
  });
  mainHandler.populate({ force: process.env.FORCE_TABLE_GEN }, () => {
    //tables dropped and created
  });
};
