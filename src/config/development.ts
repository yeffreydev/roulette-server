import dotenv from "dot-env";

dotenv.config();

const config = {
  port: process.env.PORT || 3000,
  origin: process.env.APP_ORIGIN || "*",
  JWT_KEY: process.env.JWT_SECRET || "top_secret",
  DB_URI: process.env.DB_URI || "mysql://root:admin@localhost:3306/test",
};

export default config;
