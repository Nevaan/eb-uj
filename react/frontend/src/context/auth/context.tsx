import React, { useReducer, FC, Dispatch } from 'react';
import { initialState, AuthReducer, AuthActions } from './reducer';
interface IContextProps {
	(x: AuthActions) : void;
}

export const AuthStateContext = React.createContext({ loggedIn: false });
const AuthDispatchContext = React.createContext<Dispatch<AuthActions>>({} as IContextProps);


export function useAuthState() {
	const context = React.useContext(AuthStateContext);
	if (context === undefined) {
		throw new Error('context is undefined');
	}

	return context;
}

export function useAuthDispatch() {
	const context = React.useContext(AuthDispatchContext);
	if (context === undefined) {
		throw new Error('context is undefined');
	}

	return context;
}

export const AuthProvider: FC = ({ children }) => {
	const [authState, dispatch] = useReducer(AuthReducer, initialState);
	return (
		<AuthStateContext.Provider value={authState}>
			<AuthDispatchContext.Provider value={dispatch}>
				{children}
			</AuthDispatchContext.Provider>
		</AuthStateContext.Provider>
	);
};
