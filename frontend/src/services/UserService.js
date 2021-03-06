
import { httpService } from './http.service';

const USER_URL = 'user/';
const AUTH_URL = 'auth/';

export const userService = {
    getLoggedUser,
    signup,
    login,
    logout,
    getById,
};

function getById(id) {
    return httpService.get(USER_URL + id);
}

function getLoggedUser() {
    const user = JSON.parse(sessionStorage.getItem('login'));
    return user;
}

function signup(user) {
    user.createdAt = Date.now();
    sessionStorage.setItem('signup', JSON.stringify(user));
    return httpService.post(AUTH_URL + 'signup', user);
}

async function login(user) {
    const userFromBack = await httpService.post(AUTH_URL + 'login', user);
    sessionStorage.setItem('login', JSON.stringify(userFromBack));
    return userFromBack;
}
function logout() {
    sessionStorage.clear();
    return httpService.post(AUTH_URL + 'logout');
}
