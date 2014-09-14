var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  id: Number, // "1"
  name: String, // "creator"
  pass: String, // "$2a$12$GRSzwq1wDEOcJhBTcU89HeO.MAQ02tYgO06hyeQcVLaa020lSFb7G"
  salt: String, // "$2a$12$GRSzwq1wDEOcJhBTcU89He"
  status: Number, // "1"
  personal:
  {
    firstname: String, // "Son"
    lastname: String, // "Holy Ghost"
    patronymic: String, // "Father"
    phone: String, // "+00000000000"
    e-mail: String, // "creator@this.universe"
    picurl: String, // "http://this.universe/creator.png"
    resume: String, // "The Creator"
    birthday: Date // "0000-00-00"
  },
  statistics:
  {
    created: Date, // "0000-00-00"
    lastlogin: Date // "2014-09-09"
  }
});

var User = mongoose.model('User', userSchema);

