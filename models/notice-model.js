const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noticeSchema = new Schema({
  item:String
});

const Notice = mongoose.model('notices',noticeSchema);

module.exports = Notice;
