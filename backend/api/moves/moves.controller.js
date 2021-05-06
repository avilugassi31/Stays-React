const logger = require('../../services/logger.service');
const moveService = require('./moves.service');

async function getMoves(req, res) {
    try {
        const moves = await moveService.query(req.query);
        res.send(moves);
    } catch (err) {
        logger.error('Cannot get moves', err);
        res.status(500).send({ err: 'Failed to get moves' });
    }
}

async function deleteMove(req, res) {
    try {
        await moveService.remove(req.params.id);
        res.send({ msg: 'Deleted successfully' });
    } catch (err) {
        logger.error('Failed to delete move', err);
        res.status(500).send({ err: 'Failed to delete move' });
    }
}
async function updateMove(req, res) {
    const move = moveService.update(req.body)
    res.send(move)
}

async function addMove(req, res) {
    try {
        var move = req.body;
        move = await moveService.add(move);
        res.send(move);
    } catch (err) {
        logger.error('Failed to add move', err);
        res.status(500).send({ err: 'Failed to add move' });
    }
}

module.exports = {
    getMoves,
    deleteMove,
    addMove,
    updateMove
};
