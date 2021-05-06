const express = require('express');
// const { requireAuth } = require('../../middlewares/requireAuth.middleware');
const { log } = require('../../middlewares/logger.middleware');
const { updateMove, addMove, getMoves, deleteMove } = require('./moves.controller');
const router = express.Router();

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getMoves);
router.post('/', addMove)
// router.put('/', requireAuth, updateMove);
router.put('/', updateMove);
// router.delete('/:id', requireAuth, deleteMove)
router.delete('/:id', deleteMove)


module.exports = router;
