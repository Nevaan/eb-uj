import { apiConfig } from '../ApiConfig';
import { GetSubtaskList } from './model/GetSubtaskList';
import { GetSubtaskModel } from './model/GetSubtaskModel';

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

    get: (id: number): Promise<GetSubtaskModel> => {
        return fetch(`${subtaskApiUrl}/${id}`, { 
            method: 'GET', 
            headers: { 
                'Content-Type': 'application/json', 
                credentials: "include"
            }
        })
        .then(res => res.json())
    },

    getList: (taskId: number): Promise<GetSubtaskList[]> => {
        return fetch(`${subtaskApiUrl}/all/${taskId}`, { 
            method: 'GET', 
            headers: { 
                'Content-Type': 'application/json', 
                credentials: "include"
            }
        })
        .then(res => res.json())
    },

    update: (id: number, description: string): Promise<Response> => {
        return fetch(`${subtaskApiUrl}/${id}`, {
            method: 'PUT',
            body: JSON.stringify({description}),
            headers: { 
                'Content-Type': 'application/json', 
                credentials: "include"
            }
        })
    },

    assignEmployee: (id: number, employeeId?: number): Promise<Response> => {
        if(employeeId) {
            return fetch(`${subtaskApiUrl}/${id}/employee/${employeeId}`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json', 
                    credentials: "include"
                }
            })
        } else {
            return fetch(`${subtaskApiUrl}/${id}/employee`, {
                method: 'DELETE',
                headers: { 
                    'Content-Type': 'application/json', 
                    credentials: "include"
                }
            })
        }
    }

}