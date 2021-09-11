import { apiConfig } from '../ApiConfig';
import { CreateTimeEntry } from './model/CreateTimeEntry';
import { GetTimeEntry } from './model/GetTimeEntry';

const timeEntryApiUrl = `${ apiConfig.baseUrl }timeentry`;

export const TimeEntryApi = {

    create: (dto: CreateTimeEntry): Promise<void> => {
        return fetch(timeEntryApiUrl, {
            method: 'POST',
            body: JSON.stringify(dto), 
            headers: { 
                'Content-Type': 'application/json', 
                credentials: "include"
            }
        }).then(res => res.json())
    },

    listForSubtask: (id: number): Promise<GetTimeEntry[]> => {
        return fetch(`${timeEntryApiUrl}/subtask/${id}`, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json', 
                credentials: "include"
            }
        }).then(res => res.json())
    },

    countForTask: (id: number): Promise<{ totalCount: number}> => {
        return fetch(`${timeEntryApiUrl}/task/${id}`, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json', 
                credentials: "include"
            }
        }).then(res => res.json())
    },

    countForStory: (id: number): Promise<{ totalCount: number}> => {
        return fetch(`${timeEntryApiUrl}/story/${id}`, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json', 
                credentials: "include"
            }
        }).then(res => res.json())
    },

}