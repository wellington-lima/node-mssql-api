'use strict';

const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

const { getAll, getById, create, update, destroy, execProcedure } = userController;

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', destroy);
router.get('/proc/:id', execProcedure);

module.exports = {
  routes: router
}