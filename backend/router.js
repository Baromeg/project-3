const express = require('express')
const router = express.Router()
const locationController = require('./controllers/locationController')
const userController = require('./controllers/userController')
const secureRoute = require('./middleware/secureRoute')

router
  .route('/locations')
  .get(locationController.getLocations)
  .post(secureRoute, locationController.addLocation)

router
  .route('/locations/:locationId')
  .get(locationController.singleLocation)
  .delete(secureRoute, locationController.removeLocation)
  .put(secureRoute, locationController.updateLocation)

router.route('/signup').post(userController.createUser)

router.route('/login').post(userController.loginUser)

router
  .route('/locations/:locationId/comments')
  .post(secureRoute, locationController.createComment)

router
  .route('/locations/:locationId/comments/:commentId')
  .get(locationController.getComment)
  .put(secureRoute, locationController.updateComment)
  .delete(secureRoute, locationController.deleteComment)

router.route('/users').get(userController.getUsers)

router.route('/users/:userId').get(userController.getUser)

router.route('/users/:userId/comments').get(locationController.getAllComments)
// !! might need an additional route to pull all comments of one user

module.exports = router
