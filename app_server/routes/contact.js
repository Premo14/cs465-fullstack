let express = require('express')
let router = express.Router();
let controller = require('../controllers/contact')

router.get('/', controller.contact)

module.exports = router
