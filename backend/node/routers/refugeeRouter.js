const express = require('express');
const router = express.Router();
const refugeeController = require('../controllers/refugeeController');

router.get('/', refugeeController.getAllRefugees);
router.get('/:id', refugeeController.getRefugeeById);
router.post('/', refugeeController.createRefugee);
router.put('/:id', refugeeController.updateRefugee);
router.delete('/:id', refugeeController.deleteRefugee);

module.exports = router;
