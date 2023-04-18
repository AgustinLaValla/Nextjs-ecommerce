export const config = {
  MONGO_URL: process.env.MONGO_DB || 'mongodb://localhost:27017/nextjs-ecommerce-app',
  jwtSecret: process.env.JWT_SECRET || 'jwt_secret',
  hostName: process.env.HOST_NAME || 'http://localhost:3000'
}