const bcrypt = require('bcrypt');
const userService = require('../user/user.service');
const logger = require('../../services/logger.service');

async function login(username, password) {
    logger.debug(`auth.service - login with username: ${username}`);
    const user = await userService.getByUsername(username);
    console.log('user in auth service:', user)
    if (!user) return Promise.reject('Invalid username or password');
    // TODO: un-comment for real login
    const match = await bcrypt.compare(password, user.password);
    if (!match) return Promise.reject('Invalid username or password');

    delete user.password;
    return user;
}

async function signup(userName, password, fullName, createdAt, coins, moves) {
    // console.log('userName, password, fullName, createdAt:', userName, password, fullName, createdAt)
    const saltRounds = 10;
    logger.debug(
        `auth.service - signup with username: ${userName}, fullname: ${fullName}`
    );
    if (!userName || !password || !fullName)
        return Promise.reject('fullname, username and password are required!');
    const hash = await bcrypt.hash(password, saltRounds);
    return userService.add({
        userName,
        password: hash,
        fullName,
        createdAt,
        coins,
        moves,
    });
}

module.exports = {
    signup,
    login,
};
