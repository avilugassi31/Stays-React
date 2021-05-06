const express = require('express');
const { requireAuth } = require('../../middlewares/requireAuth.middleware');
const { log } = require('../../middlewares/logger.middleware');
const {
    addStay,
    getStays,
    getStay,
    deleteStay,
    updateStay,
} = require('./stay.controller');
const router = express.Router();


router.get('/', getStays);
router.post('/', addStay)
router.get('/:id', getStay);
router.put('/:id', updateStay);
router.delete('/:id', deleteStay)

module.exports = router;
