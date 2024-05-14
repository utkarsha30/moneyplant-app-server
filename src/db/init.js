const mongoose = require('mongoose');
require('dotenv').config();
mongoose.set('strictQuery', true);
require('../models/expert');

const connect = async () => {
  try {
   
    await mongoose.connect(process.env.MONGO_URL);
    console.log('connected');
  } catch (error) {
    console.log(error.message);
    process.exit(1);
    // throw error;
  }
};
module.exports = {
  connect,
};
