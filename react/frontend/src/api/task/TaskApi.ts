import { apiConfig } from '../ApiConfig';
import { TaskModel } from './model/TaskModel';

const taskApiUrl = `${ apiConfig.baseUrl }task`;

export const TaskApi = {

    create: (input: {description: string, storyId: number, assigneeId: number }): Promise<void> => {
        return fetch(taskApiUrl, {
            method: 'POST',
            body: JSON.stringify(input),
            headers: { 
                'Content-Type': 'application/json', 
                credentials: "include"
            }
        }).then(res => res.json())
    },

    get: (id: number): Promise<TaskModel> => {
        return fetch(`${taskApiUrl}/${id}`, { 
            method: 'GET', 
            headers: { 
                'Content-Type': 'application/json', 
                credentials: "include"
            }
        })
        .then(res => res.json())
    },

    getListForProject: (id: number): Promise<TaskModel[]> => {
        return fetch(`${taskApiUrl}/all/${id}`, { 
            method: 'GET', 
            headers: { 
                'Content-Type': 'application/json', 
                credentials: "include"
            }
        })
        .then(res => res.json())
    },

    update: (id: number, description: string): Promise<void> => {
        return fetch(`${taskApiUrl}/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({description}),
            headers: { 
                'Content-Type': 'application/json', 
                credentials: "include"
            }
        }).then(_ => {})
    },

    assignEmployee: (id: number, employeeId: number): Promise<void> => {
        return fetch(`${taskApiUrl}/${id}/employee/${employeeId}`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json', 
                credentials: "include"
            }
        }).then(_ => {})
    }

}