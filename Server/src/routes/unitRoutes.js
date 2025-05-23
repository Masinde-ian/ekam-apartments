// src/routes/unitRoutes.js
const express = require('express');
const router = express.Router();
const Unit = require('../models/Unit');

const {
  getUnits,
  getUnitById,
  createUnit,
  updateUnit,
  deleteUnit,
} = require('../controllers/unitController');


router.route('/')
  .get(getUnits)
  .post(createUnit);

router.route('/:id')
  .get(getUnitById)
  .put(updateUnit)
  .delete(deleteUnit);

module.exports = router;
