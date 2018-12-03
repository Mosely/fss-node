'use strict';
module.exports = function (jagql, handlerConfig) {
  let Handler = require('@jagql/store-sequelize');
  let mainHandler = new Handler(handlerConfig);
  jagql.define({
    resource: 'counseling_topics',
    handlers: mainHandler,
    primaryKey: 'uuid',
    searchParams: {
      topic: jagql.Joi.string(),
      description: jagql.Joi.string(),
      created_at: jagql.Joi.date().timestamp('unix'),
      updated_at: jagql.Joi.date().timestamp('unix'),
      updated_by: jagql.Joi.number()
    },
    attributes: {
      topic: jagql.Joi.string(),
      description: jagql.Joi.string(),
      created_at: jagql.Joi.date().timestamp('unix').default(Math.round(Date.now() / 1000)),
      updated_at: jagql.Joi.date().timestamp('unix').default(Math.round(Date.now() / 1000)),
      updated_by: jagql.Joi.number().default(1),
      counselees: jagql.Joi.belongsToMany({ resource: 'counselees', as: 'counseling_topics' })
      
    }
  });
  mainHandler.populate({ force: process.env.FORCE_TABLE_GEN }, () => {
    //tables dropped and created
  });
};
        