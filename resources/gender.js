const jagql = require("@jagql/framework");
const RelationalDbStore = require("@jagql/store-sequelize");

let theTable = new RelationalDbStore({
  dialect: process.env.DB_DRIVER,
  dialectOptions: {
    supportBigNumbers: true
  },
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  logging: console.log
});

theTable.populate();

jagql.define({
  resource: "genders",
  handlers: theTable,
  attributes: {
    name: jagql.Joi.string(),
    people: jagql.Joi.belongsToMany({resource: "people", as: "gender"}),
    updatedBy: jagql.Joi.number().default(1)
  }
});