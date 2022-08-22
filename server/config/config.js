require('dotenv').config()

module.exports = {
  development: {
    username: "postgres",
    password: "yuyadev",
    database: "authority",
    host: "127.0.0.1",
    port: 5434, 
    dialect: "postgres",
    define: {
      timestamps: false
    }
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    define: {
      timestamps: false
    }
  }
 
}



