let express = require('express')
let router = express.Router();
let controller = require('../controllers/news')

router.get('/', controller.news)

module.exports = router
