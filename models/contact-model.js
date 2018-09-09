const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  email:String,
  message:String,
  branch:String,
  year:String
});

const Contact = mongoose.model('contact',contactSchema);

module.exports = Contact;
