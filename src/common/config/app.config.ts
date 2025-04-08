export const EnvConfiguration = () => ({
  stage: process.env.STAGE,
  port: process.env.PORT,
  mongoUri: process.env.MONGO_URI,
});
