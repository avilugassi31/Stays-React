const INITIAL_STATE = {
    stays: [],
    stay: null,
};

export function stayReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SET_STAYS':
            return {
                ...state,
                stays: action.stays,
            };
        case 'SET_STAY':
            return {
                ...state,
                stay: action.stay,
            };
        case 'ADD_STAY':
            return {
                ...state,
                stays: [...state.stays, action.stay],
            };
        case 'REMOVE_STAY':
            return {
                ...state,
                stays: state.stays.filter((stay) => stay._id !== action.stayId),
            };
        case 'UPDATE_STAY':
            const { updatedStay } = action;
            return {
                ...state,
                stays: state.stays.map((stay) =>
                    stay._id === updatedStay._id ? updatedStay : stay
                ),
            };
        default:
            return state;
    }
}
