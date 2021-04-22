

const dotenv = require('dotenv');

const APP_NAME = 'WalletApi';

dotenv.config({
    path: '.env'
});



const {
    PORT,
    MONGO_DB_PROD_URL,
    MONGODB_LOCAL_URI,
    NODE_ENV = 'production',
} = process.env;


module.exports = {
    applicationName: APP_NAME,
    port: PORT,
    mongodb: {
        dsn: NODE_ENV === 'production' ? MONGO_DB_PROD_URL : MONGODB_LOCAL_URI,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            autoIndex: false,
        },
    },
    production: NODE_ENV === 'production',
};