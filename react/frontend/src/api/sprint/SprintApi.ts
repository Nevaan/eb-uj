import { apiConfig } from '../ApiConfig';
import { StartSprint } from './model/StartSprint';

const sprintApiUrl = `${ apiConfig.baseUrl }sprint`;

export const SprintApi = {

    create: (startSprint: StartSprint): Promise<boolean> => {
        return fetch(sprintApiUrl, {
            method: 'POST',
            body: JSON.stringify(startSprint), 
            headers: { 
                'Content-Type': 'application/json', 
                credentials: "include"
            }
        }).then(res => res.status === 200)
    },

}