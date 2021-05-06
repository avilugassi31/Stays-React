const INITIAL_STATE = {
  user: null
}
export function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SPEND_BALANCE':
      return {
        ...state,
        user: { ...state.user, coins: state.user.coins - action.spendAmount }
      }
      case 'SET_USER':
        return {
          ...state,
          user: action.user
        }
    default:
      return state
  }
}