require('dotenv').config()

const options = {
  port: process.env.PORT || 8080,
  env: process.env.NODE_ENV,
  socketsEnabled: process.env.SOCKETS_ENABLE === 'true',
  mongoEnabled: process.env.MONGO_ENABLE === 'true',
  mongoUrl: process.env.MONGO_URL,
  secret: process.env.SECRET_JWT || 'secretKey'
}

export default options
