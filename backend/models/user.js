const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const mongooseHidden = require('mongoose-hidden')
const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address'
    ]
  },
  password: { type: String, required: true },
  isAdmin: { type: Boolean },
  bio: { type: String },
  city: { type: String },
  avatar: { type: String }
})

schema.plugin(
  mongooseHidden({ defaultHidden: { password: true, email: true } })
)

schema.plugin(uniqueValidator)

// * Password Confirmation:
// * **************************************

schema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation
  })

schema.pre('validate', function checkPassword(next) {
  if (this.password !== this._passwordConfirmation) {
    this.invalidate('passwordConfirmation', 'should match password')
  }
  next()
})

// * *************************************

schema.pre('save', function hashPassword(next) {
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
  next()
})

schema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', schema)
