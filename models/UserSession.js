const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSessionSchema = new Schema({
  userID: {
    type: String,
    default: ''
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});

module.exports = UserSession = mongoose.model('userSession', UserSessionSchema);
