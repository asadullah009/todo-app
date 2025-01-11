'use strict';

const router = require('express').Router();

const userRoutes = require('./api/user/route');


router.use('/', userRoutes);

module.exports = router;