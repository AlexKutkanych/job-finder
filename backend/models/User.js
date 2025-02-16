const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Please enter a username'],
  },
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    match: [/.+@.+\..+/, 'Please enter a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Min password length is 6'],
  },
});

// fire after document saved to DB
// userSchema.post('save', async function (doc, next) {
//   console.log(doc);
//   next();
// });

// fire after document saved to DB
userSchema.pre('save', async function (next) {
  // 'this' refers to User before create & save
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// userSchema.pre('save', async function (next) {
//   if (this.isNew || this.isModified('password')) {
//     const saltRounds = 10;
//     this.password = await bcrypt.hash(this.password, saltRounds);
//   }

//   next();
// });

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
