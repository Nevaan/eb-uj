import { apiConfig } from '../ApiConfig';
import { GetTaskModel } from './model/GetTaskModel';
import { TaskModel } from './model/TaskModel';

const taskApiUrl = `${ apiConfig.baseUrl }task`;

export const TaskApi = {

    create: (input: {description: string, storyId: number, assigneeId?: number }): Promise<void> => {
        return fetch(taskApiUrl, {
            method: 'POST',
            body: JSON.stringify(input),
            headers: { 
                'Content-Type': 'application/json', 
                credentials: "include"
            }
        }).then(res => res.json())
    },

    get: (id: number): Promise<GetTaskModel> => {
        return fetch(`${taskApiUrl}/${id}`, { 
            method: 'GET', 
            headers: { 
                'Content-Type': 'application/json', 
                credentials: "include"
            }
        })
        .then(res => res.json())
    },

    getListForStory: (storyId: number): Promise<TaskModel[]> => {
        return fetch(`${taskApiUrl}/all/${storyId}`, { 
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
            method: 'PUT',
            body: JSON.stringify({description}),
            headers: { 
                'Content-Type': 'application/json', 
                credentials: "include"
            }
        }).then(_ => {})
    },

    assignEmployee: (id: number, employeeId?: number): Promise<void> => {
        if (employeeId) {
            return fetch(`${taskApiUrl}/${id}/employee/${employeeId}`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json', 
                    credentials: "include"
                }
            }).then(_ => {})
        } else {
            return fetch(`${taskApiUrl}/${id}/employee`, {
                method: 'DELETE',
                headers: { 
                    'Content-Type': 'application/json', 
                    credentials: "include"
                }
            }).then(_ => {})
        }
        
    }

}