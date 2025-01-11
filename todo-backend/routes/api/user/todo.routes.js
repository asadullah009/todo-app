'use strict';

const router = require('express').Router();
const Controller = require('../../../controller/api/user/todo');
const { Validator } = require('../../../middleware/validator');

router.get('/', Controller.list);
router.post('/',Validator,  Controller.create);
router.put('/:id',Validator,  Controller.update);
router.delete('/:id', Controller.delete);

module.exports = router;
