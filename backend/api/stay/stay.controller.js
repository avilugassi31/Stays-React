const logger = require('../../services/logger.service');
const userService = require('../user/user.service');
const stayService = require('./stay.service');

async function getStays(req, res) {
    try {
        const stays = await stayService.query(req.query);
        res.send(stays);
    } catch (err) {
        logger.error('Cannot get stays', err);
        res.status(500).send({ err: 'Failed to get stays' });
    }
}

async function getStay(req, res) {
    try {
        const stay = await stayService.getById(req.params.id);
        res.send(stay);
    } catch (err) {
        logger.error('Failed to get stay', err);
        res.status(500).send({ err: 'Failed to get stay' });
    }
}

async function deleteStay(req, res) {
    try {
        await stayService.remove(req.params.id);
        res.send({ msg: 'Deleted successfully' });
    } catch (err) {
        logger.error('Failed to delete stay', err);
        res.status(500).send({ err: 'Failed to delete stay' });
    }
}
async function addStay(req, res) {
    try {
        var stay = req.body;
        // let { fullname, _id, imgUrl } = req.session.user;
        stay = await stayService.add(stay);
        res.send(stay);
    } catch (err) {
        logger.error('Failed to add stay', err);
        res.status(500).send({ err: 'Failed to add stay' });
    }
}

async function updateStay(req, res) {
    try {
        const stay = req.body;
        const savedStay = await stayService.update(stay);
        res.send(savedStay);
    } catch (err) {
        console.log('err:', err);
    }
}
module.exports = {
    getStays,
    deleteStay,
    addStay,
    getStay,
    updateStay,
};
