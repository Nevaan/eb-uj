export type AuthActions =
    | { type: 'login' }
    | { type: 'logout' }
    | { type: 'unauthorized' }

export type AuthState = {
    loggedIn: boolean
}

export const initialState: AuthState = {
    loggedIn: false
}


export const AuthReducer = (initialState: AuthState, action: AuthActions): AuthState => {
    switch (action.type) {
        case 'login':
            return { ...initialState, loggedIn: true };
        case 'logout':
            return { ...initialState, loggedIn: false };
        case 'unauthorized':
            return { ...initialState, loggedIn: false };
        default:
            throw new Error(`Unknown auth action ${action}`);
    }
}
