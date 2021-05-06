const authService = require('./auth.service');
const logger = require('../../services/logger.service');

async function login(req, res) {
    const { username, password } = req.body;
    try {
        const user = await authService.login(username, password);
        req.session.user = user;
        res.json(user);
    } catch (err) {
        logger.error('Failed to Login ' + err);
        res.status(401).send({ err: 'Failed to Login' });
    }
}

async function signup(req, res) {
    try {
        const {
            userName,
            password,
            fullName,
            createdAt,
            coins,
            moves,
        } = req.body;
        const account = await authService.signup(
            userName,
            password,
            fullName,
            createdAt,
            coins,
            moves
        );
        console.log(account, 'account');
        logger.debug(
            `auth.route - new account created: ` + JSON.stringify(account)
        );
        const user = await authService.login(userName, password);
        console.log('user:', user);
        req.session.user = user;
        res.json(user);
    } catch (err) {
        logger.error('Failed to signup ' + err);
        res.status(500).send({ err: 'Failed to signup' });
    }
}

async function logout(req, res) {
    try {
        req.session.destroy();
        res.send({ msg: 'Logged out successfully' });
    } catch (err) {
        res.status(500).send({ err: 'Failed to logout' });
    }
}

module.exports = {
    login,
    signup,
    logout,
};