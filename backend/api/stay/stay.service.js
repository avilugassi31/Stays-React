const dbService = require('../../services/db.service');
const ObjectId = require('mongodb').ObjectId;
const asyncLocalStorage = require('../../services/als.service');

async function query() {
    try {
        const collection = await dbService.getCollection('stay');

        const stays = await collection.find({}).toArray();

        return stays;
    } catch (err) {
        logger.error('cannot find stays', err);
        throw err;
    }
}
async function remove(stayId) {
    try {
        const collection = await dbService.getCollection('stay');
        const query = { _id: ObjectId(stayId) };
        await collection.deleteOne(query);
    } catch (err) {
        logger.error(`cannot remove stay ${stayId}`, err);
        throw err;
    }
}
async function getById(stayId) {
    try {
        const collection = await dbService.getCollection('stay');
        const stay = await collection.findOne({ _id: ObjectId(stayId) });
        return stay;
    } catch (err) {
        logger.error(`while finding stay ${stayId}`, err);
        throw err;
    }
}
async function getByStayname(stayname) {
    try {
        const collection = await dbService.getCollection('stay');
        const stay = await collection.findOne({ stayname });
        return stay;
    } catch (err) {
        logger.error(`while finding stay ${stayname}`, err);
        throw err;
    }
}
async function update(stay) {
    try {
        stay._id = ObjectId(stay._id);
        const collection = await dbService.getCollection('stay');
        await collection.updateOne({ _id: stay._id }, { $set: stay });
        return stay;
    } catch (err) {
        console.log('err:', err);
    }
}
async function add(stay) {
    try {
        const collection = await dbService.getCollection('stay');
        await collection.insertOne(stay);
        return stay;
    } catch (err) {
        logger.error('cannot insert stay', err);
        throw err;
    }
}
module.exports = {
    query,
    remove,
    update,
    add,
    getByStayname,
    getById,
};
