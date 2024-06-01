let express = require('express');
let router = express.Router();
const controllerMain = require('../controllers/main')

router.get('/', controllerMain.index);

module.exports = router;
