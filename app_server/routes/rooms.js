let express = require('express')
let router = express.Router();
let controller = require('../controllers/rooms')

router.get('/', controller.rooms)

module.exports = router
