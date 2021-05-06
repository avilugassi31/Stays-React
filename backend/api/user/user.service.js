const dbService = require('../../services/db.service');
// const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId;

module.exports = {
    query,
    getById,
    getByUsername,
    remove,
    update,
    add,
};

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy);
    try {
        const collection = await dbService.getCollection('users');
        var users = await collection.find({}).toArray();
        console.log('users:', users);
        users = users.map((user) => {
            delete user.password;
            user.createdAt = ObjectId(user._id).getTimestamp();
            return user;
        });
        return users;
    } catch (err) {
        logger.error('cannot find users', err);
        throw err;
    }
}

async function getById(userId) {
    try {
        const collection = await dbService.getCollection('users');
        const user = await collection.findOne({ _id: ObjectId(userId) });
        delete user.password;

        return user;
    } catch (err) {
        logger.error(`while finding user ${userId}`, err);
        throw err;
    }
}

async function getByUsername(username) {
    try {
        const collection = await dbService.getCollection('users');
        const user = await collection.findOne({ username });
        console.log('user in user service by username:', user)
        return user;
    } catch (err) {
        logger.error(`while finding user ${username}`, err);
        throw err;
    }
}

async function remove(userId) {
    try {
        const collection = await dbService.getCollection('users');
        await collection.deleteOne({ _id: ObjectId(userId) });
    } catch (err) {
        logger.error(`cannot remove user ${userId}`, err);
        throw err;
    }
}

async function update(user) {
    try {
        const userToSave = {
            _id: ObjectId(user._id),
            username: user.username,
            fullname: user.fullname,
        };
        const collection = await dbService.getCollection('users');
        await collection.updateOne(
            { _id: userToSave._id },
            { $set: userToSave }
        );
        return userToSave;
    } catch (err) {
        logger.error(`cannot update user ${user._id}`, err);
        throw err;
    }
}

async function add(user) {
    try {
        const userToAdd = {
            username: user.userName,
            password: user.password,
            fullname: user.fullName,
            createdAt: user.createdAt,
            coins: user.coins,
            moves: user.moves,
        };
        const collection = await dbService.getCollection('users');
        await collection.insertOne(userToAdd);
        return userToAdd;
    } catch (err) {
        logger.error('cannot insert user', err);
        throw err;
    }
}
function _buildCriteria(filterBy) {
    const criteria = {};
    if (filterBy.txt) {
        const txtCriteria = { $regex: filterBy.txt, $options: 'i' };
        criteria.$or = [
            {
                username: txtCriteria,
            },
            {
                fullname: txtCriteria,
            },
        ];
    }
    if (filterBy.minBalance) {
        criteria.balance = { $gte: filterBy.minBalance };
    }
    return criteria;
}