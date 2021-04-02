const mongoose = require('mongoose');

module.exports = async function initDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_DB_KEY, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

    console.log('Database conected successfully');
  } catch (err) {
    console.log('err', err);
    process.exit(1);
  }
};
