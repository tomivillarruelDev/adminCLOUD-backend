export const EnvConfiguration = () => ({
  stage: process.env.STAGE,
  port: process.env.PORT,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
});
