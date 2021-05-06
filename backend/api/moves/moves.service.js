const dbService = require('../../services/db.service');
const ObjectId = require('mongodb').ObjectId;
const asyncLocalStorage = require('../../services/als.service');

async function query() {
    try {
        const collection = await dbService.getCollection('moves');
        const moves = await collection.find({}).toArray();
        return moves;
    } catch (err) {
        logger.error('cannot find moves', err);
        throw err;
    }
}
async function update(move) {
    try {
        move._id = ObjectId(move._id);
        const collection = await dbService.getCollection('moves');
        await collection.updateOne({ _id: move._id }, { $set: move });
        return move;
    } catch (err) {
        console.log('err:', err);
    }
}
async function remove(moveId) {
    try {
        const store = asyncLocalStorage.getStore();
        const { moveId } = store;
        const collection = await dbService.getCollection('moves'); s
        const query = { _id: ObjectId(moveId) };
        await collection.deleteOne(query);
    } catch (err) {
        logger.error(`cannot remove move ${moveId}`, err);
        throw err;
    }
}

async function add(move) {
    try {
        const moveToAdd = {
        };
        const collection = await dbService.getCollection('move');
        await collection.insertOne(moveToAdd);
        return moveToAdd;
    } catch (err) {
        logger.error('cannot insert move', err);
        throw err;
    }
}

module.exports = {
    query,
    remove,
    add,
    update
};
