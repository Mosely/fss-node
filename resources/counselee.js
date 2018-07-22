const jagql = require('@jagql/framework');
const RelationalDbStore = require("jsonapi-store-relationaldb");

jagql.define({
  resource: "counselees",
  handlers: new RelationalDbStore({
    dialect: process.env.DB_DRIVER,
    dialectOptions: {
      supportBigNumbers: true
    },
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    logging: process.env.DEBUG
  }),
  attributes: {
    hasBeenAbused: jagql.Joi.boolean(),
    abusedByWhom: jagql.Joi.string(),
    abusedCount: jagql.Joi.number(),
    seriousProblemsInFamily: jagql.Joi.boolean(),
    seriousFamilyProblemsDesc: jagql.Joi.string(),
    alcoholProblem: jagql.Joi.boolean(),
    hadBlackOut: jagql.Joi.boolean(),
    blackOutLocation: jagql.Joi.string(),
    blackOutDate: jagql.Joi.date(),
    familyDrugAlcoholProblem: jagql.Joi.string(),
    familyDrugProblemOtherDetail: jagql.Joi.string(),
    currentHarmSelf: jagql.Joi.boolean(),
    pastHarmSelf: jagql.Joi.boolean(),
    currentHarmOthers: jagql.Joi.boolean(),
    pastHarmOthers: jagql.Joi.boolean(),
    currentHarmSelfExample: jagql.Joi.string(),
    pastHarmSelfExample: jagql.Joi.string(),
    currentHarmOthersExample: jagql.Joi.string(),
    pastHarmOthersExample: jagql.Joi.string(),
    hadPreviousCounseling: jagql.Joi.boolean(),
    previousCounselingWhere: jagql.Joi.string(),
    previousCounselingWhen: jagql.Joi.date(),
    currentlyInCounseling: jagql.Joi.boolean(),
    currentCounselor: jagql.Joi.string(),
    updatedBy: jagql.Joi.one('users'),
    counseleeCounselingTopics: jagql.Joi.many('counselee-counseling-topic'),
    counseleeDrugUses: jagql.Joi.many('counselee-drug-use'),
    counseleeMedications: jagql.Joi.many('counselee-medication')
  }
});