'use strict';
module.exports = function (jagql, handlerConfig) {
  let Handler = require('@jagql/store-sequelize');
  let mainHandler = new Handler(handlerConfig);
  jagql.define({
    resource: 'users',
    handlers: mainHandler,
    primaryKey: 'autoincrement',
    searchParams: {
      username: jagql.Joi.string(),
      email: jagql.Joi.string(),
      password: jagql.Joi.string(),
      password_created_at: jagql.Joi.date().timestamp('unix'),
      is_disabled: jagql.Joi.boolean(),
      created_at: jagql.Joi.date().timestamp('unix'),
      updated_at: jagql.Joi.date().timestamp('unix'),
      updated_by: jagql.Joi.number()
    },
    attributes: {
      username: jagql.Joi.string(),
      email: jagql.Joi.string(),
      password: jagql.Joi.string(),
      password_created_at: jagql.Joi.date().timestamp('unix'),
      is_disabled: jagql.Joi.boolean(),
      created_at: jagql.Joi.date().timestamp('unix').default(Math.round(Date.now() / 1000)),
      updated_at: jagql.Joi.date().timestamp('unix').default(Math.round(Date.now() / 1000)),
      updated_by: jagql.Joi.number().default(1),
      roles: jagql.Joi.many('roles'),
      shelter_clients: jagql.Joi.belongsToMany('shelter_clients')
    }
  });
  mainHandler.populate({ force: process.env.FORCE_TABLE_GEN }, () => {
    //tables dropped and created
  });
};
        