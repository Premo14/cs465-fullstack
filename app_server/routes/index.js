let express = require('express');
let router = express.Router();
const ctrlMain = require('../controllers/main')

router.get('/', ctrlMain.index);

module.exports = router;
