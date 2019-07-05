export default (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                user: action.user,
                password: action.password
            }
        case 'LOGOUT':
            return {}
        default:
            return state
    }
}
