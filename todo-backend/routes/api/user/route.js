'use strict';
const router = require('express').Router();

const todoRoutes = require('./todo.routes')

router.use('/todo', todoRoutes)

module.exports = router;