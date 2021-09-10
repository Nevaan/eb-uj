import { apiConfig } from '../ApiConfig';
import { SubtaskModel } from './model/SubtaskModel';

const subtaskApiUrl = `${ apiConfig.baseUrl }subtask`;

export const SubtaskApi = {

    create: (input: {description: string, storyId: number, assigneeId?: number, taskId: number }): Promise<void> => {
        return fetch(subtaskApiUrl, {
            method: 'POST',
            body: JSON.stringify(input),
            headers: { 
                'Content-Type': 'application/json', 
                credentials: "include"
            }
        }).then(res => res.json())
    },

    get: (id: number): Promise<SubtaskModel> => {
        return fetch(`${subtaskApiUrl}/${id}`, { 
            method: 'GET', 
            headers: { 
                'Content-Type': 'application/json', 
                credentials: "include"
            }
        })
        .then(res => res.json())
    },

    getList: (taskId: number): Promise<SubtaskModel[]> => {
        return fetch(`${subtaskApiUrl}/all/${taskId}`, { 
            method: 'GET', 
            headers: { 
                'Content-Type': 'application/json', 
                credentials: "include"
            }
        })
        .then(res => res.json())
    },

    update: (id: number, description: string): Promise<void> => {
        return fetch(`${subtaskApiUrl}/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({description}),
            headers: { 
                'Content-Type': 'application/json', 
                credentials: "include"
            }
        }).then(_ => {})
    },

    assignEmployee: (id: number, employeeId?: number): Promise<void> => {
        if(employeeId) {
            return fetch(`${subtaskApiUrl}/${id}/employee/${employeeId}`, {
                method: 'PATCH',
                headers: { 
                    'Content-Type': 'application/json', 
                    credentials: "include"
                }
            }).then(_ => {})
        } else {
            return fetch(`${subtaskApiUrl}/${id}/employee`, {
                method: 'DELETE',
                headers: { 
                    'Content-Type': 'application/json', 
                    credentials: "include"
                }
            }).then(_ => {})
        }
    }

}