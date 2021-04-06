const mongoose = require('mongoose');
const { Schema } = mongoose;

const slotSchema = new Schema({
  userId: { type: String, require: true },
  slots: [Object],
});

const slotModel = mongoose.model('Slot', slotSchema);

module.exports = slotModel;
