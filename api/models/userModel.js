const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, require: true, unique: true },
  password: { type: String, require: true },
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
