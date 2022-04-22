const express = require('express');
const productsController = require('./../controllers/productsController');

const productsRouter = express.Router();

productsRouter.get('/:token', productsController.getAllProducts);

module.exports = productsRouter;