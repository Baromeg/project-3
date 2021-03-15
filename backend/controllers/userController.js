const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/environment')

function createUser(req, res) {
  const body = req.body
  console.log(body)
  User.create(body)
    .then((user) => {
      console.log(user)
      res.send(user)
    })
    .catch((error) => {
      console.log(error)
      res.send(error)
    })
}

function loginUser(req, res) {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).send({ message: 'Email unknown!' })
      }
      if (!user.validatePassword(req.body.password)) {
        return res
          .status(401)
          .send({ message: "Unauthorized: Password doesn't match email" })
      }
      const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' })

      const userId = user._id
      const userName = user.username
      const userBio = user.bio
      const userCity = user.city
      const userEmail = user.email
      const userAvatar = user.avatar

      res
        .status(202)
        .send({
          token,
          userId,
          userName,
          userBio,
          userCity,
          userEmail,
          userAvatar,
          message: 'Login was succesful!'
        })
    })
    .catch((error) => {
      console.log(error)
      res.send(error)
    })
}

function getUsers(req, res) {
  User.find()
    .populate('user')
    .then((userList) => {
      res.send(userList)
    })
    .catch((error) => res.send(error))
}

function getUser(req, res) {
  User.findById(req.params.userId)
    .populate('user')
    .then((user) => {
      res.send(user)
    })
    .catch((error) => res.send(error))
  console.log('test')
}

module.exports = {
  createUser,
  loginUser,
  getUser,
  getUsers
}
