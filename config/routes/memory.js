var express = require('express');
var router = express.Router();
var memoryController = require('../../src/Memory/memoryController');

/* GET Memory index page. */
router.get('/', memoryController.indexPage);

module.exports = router;
