var express = require('express');
var router = express.Router();
var memoryController = require('../../src/Memory/memoryController');

/* GET Memory index page. */
router.get('/', memoryController.indexPage);

/* GET Memory start game page */
router.get('/startmemory', memoryController.startPage);

module.exports = router;
