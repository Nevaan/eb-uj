import { ProfileModel } from "../../api/user/model/ProfileModel";

export type AuthActions =
    | { type: 'login', profile: ProfileModel }
    | { type: 'logout' }
    | { type: 'unauthorized' }

export type AuthState = {
    loggedIn: boolean,
    profile?: ProfileModel
}

export const initialState: AuthState = {
    loggedIn: false
}


export const AuthReducer = (initialState: AuthState, action: AuthActions): AuthState => {
    switch (action.type) {
        case 'login':
            return { ...initialState, loggedIn: true, profile: action.profile };
        case 'logout':
            return { ...initialState, loggedIn: false, profile: undefined };
        case 'unauthorized':
            return { ...initialState, loggedIn: false, profile: undefined };
        default:
            throw new Error(`Unknown auth action ${action}`);
    }
}
