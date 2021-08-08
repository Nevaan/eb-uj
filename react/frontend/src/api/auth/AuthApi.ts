import { apiConfig } from '../ApiConfig';

const authApiUrl = `${ apiConfig.baseUrl }authenticate`;

export const AuthApi = {

    authenticate: (): Promise<any> => {
        return fetch(authApiUrl, { 
            method: 'GET', 
            mode: 'no-cors',
            credentials: 'include',
            headers: { 
                'Content-Type': 'application/json'
            },
            redirect: 'follow'
        })
        .then(res => {
            return res
        })
        .catch(e => {
            console.log(e)
        })
    }

}