jsonApi.define({
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
    hasBeenAbused: jsonApi.Joi.boolean(),
    abusedByWhom: jsonApi.Joi.string(),
    abusedCount: jsonApi.Joi.number(),
    seriousProblemsInFamily: jsonApi.Joi.boolean(),
    seriousFamilyProblemsDesc: jsonApi.Joi.string(),
    alcoholProblem: jsonApi.Joi.boolean(),
    hadBlackOut: jsonApi.Joi.boolean(),
    blackOutLocation: jsonApi.Joi.string(),
    blackOutDate: jsonApi.Joi.date(),
    familyDrugAlcoholProblem: jsonApi.Joi.string(),
    familyDrugProblemOtherDetail: jsonApi.Joi.string(),
    currentHarmSelf: jsonApi.Joi.boolean(),
    pastHarmSelf: jsonApi.Joi.boolean(),
    currentHarmOthers: jsonApi.Joi.boolean(),
    pastHarmOthers: jsonApi.Joi.boolean(),
    currentHarmSelfExample: jsonApi.Joi.string(),
    pastHarmSelfExample: jsonApi.Joi.string(),
    currentHarmOthersExample: jsonApi.Joi.string(),
    pastHarmOthersExample: jsonApi.Joi.string(),
    hadPreviousCounseling: jsonApi.Joi.boolean(),
    previousCounselingWhere: jsonApi.Joi.string(),
    previousCounselingWhen: jsonApi.Joi.date(),
    currentlyInCounseling: jsonApi.Joi.boolean(),
    currentCounselor: jsonApi.Joi.string(),
    updatedBy: jsonApi.Joi.one('users'),
    counseleeCounselingTopics: jsonApi.Joi.many('counselee-counseling-topic'),
    counseleeDrugUses: jsonApi.Joi.many('counselee-drug-use'),
    counseleeMedications: jsonApi.Joi.many('counselee-medication')
  }
});