const express = require('express')
const router = express.Router()
const jwt = require('express-jwt')
const auth = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    userProperty: 'payload'
})

const tripsController = require('../controllers/trips')
const authController = require('../controllers/authentication')

router
    .route('/trips')
    .get(tripsController.tripsList)
    .post(auth, tripsController.tripsAddTrip)

router
    .route('/trips/:code')
    .get(tripsController.tripsFindByCode)
    .put(auth, tripsController.tripsUpdateTrip)

router
    .route('/register')
    .post(auth, authController.register)

router
    .route('/login')
    .post(auth, authController.login)

module.exports = router
