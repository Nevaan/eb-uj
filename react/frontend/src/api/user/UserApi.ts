import { apiConfig } from '../ApiConfig';
import { ProfileModel } from './model/ProfileModel';

const profileApiUrl = `${ apiConfig.baseUrl }profile`;


export const UserApi = {

    profile: (): Promise<ProfileModel> => {
        return fetch(profileApiUrl, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json',
            credentials: "include"
         }
        }).then(res => res.json())
    }

}