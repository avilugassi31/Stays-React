import { userService } from '../../services/UserService';

export function addMove(contact, amount) {
    return async (dispatch) => {
        const move = {
            toId: contact._id,
            to: contact.name,
            transferAt: new Date(Date.now()).toLocaleDateString(),
            transferTime: new Date(Date.now()).toLocaleTimeString(),
            amount,
        };
        console.log('move:', move)
        await userService.addMove(move);
        const action = {
            type: 'SPEND_BALANCE',
            move,
        };
        console.log('action:', action)
        dispatch(action);
    };
}

export function signup(userName, fullName, password) {
    return async (dispatch) => {
        const user = {
            userName,
            fullName,
            password,
            coins: 100,
            moves: [],
        };
        console.log('user:', user)
        await userService.signup(user);
        const action = {
            type: 'SET_USER',
            user,
        };
        dispatch(action);
    };
}
export function loadUser() {
    return (dispatch) => {
        const user = userService.getUser();
        const action = {
            type: 'SET_USER',
            user,
        };

        dispatch(action);
    };
}
