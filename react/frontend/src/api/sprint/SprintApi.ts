import { apiConfig } from '../ApiConfig';
import { ProjectStage } from '../stage/model/ProjectStage';
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

    get: (id: number): Promise<ProjectStage> => {
        return fetch(`${ sprintApiUrl }/${id}`, {
            method: 'GET'
        }).then(res => res.json())
    },

    update: (model: ProjectStage) => {
        const { id , description } = model;

        return fetch(`${ sprintApiUrl }/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ description })
        })
    },

    complete: (projectId: number): Promise<boolean> => {
        return fetch(`${sprintApiUrl}/${projectId}`, {
            method: 'DELETE',
            headers: { 
                'Content-Type': 'application/json', 
                credentials: "include"
            }
        }).then(res => res.status === 200)
    }

}