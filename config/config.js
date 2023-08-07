require('dotenv').config()
module.exports =
  {
    development: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      port: 3306,
      dialect: 'mysql',
      seederStorage: 'sequelize',
      logging:false
    },
    production: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      dialect: "mysql",
      seederStorage: 'sequelize',
      logging:false
    },
    docker: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      dialect: "mysql",
      seederStorage: 'sequelize'
    }
}
