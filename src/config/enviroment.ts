require("dotenv").config();

export const PORT = process.env.PORT || 8080,
    DB_HOST = process.env.DB_HOST || 'localhost',
    DB_PORT = parseInt(process.env.DB_PORT) || 5432,
    DB_USERNAME = process.env.DB_USERNAME || "postgres",
    DB_PASSWORD = process.env.DB_PASSWORD || "postgres",
    DB_NAME = process.env.DB_NAME || "postgres",
    DB_SYNC = process.env.DB_SYNC === "true",
    ACCESS_KEY = process.env.ACCESS_KEY || null,
    SALT = process.env.SALT || "Ok"
