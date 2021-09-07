import { apiConfig } from '../ApiConfig';
import { ProjectStage } from '../stage/model/ProjectStage';

const backlogApiUrl = `${ apiConfig.baseUrl }backlog`;

export const BacklogApi = {

    get: (id: number): Promise<ProjectStage> => {
        return fetch(`${ backlogApiUrl }/${id}`, {
            method: 'GET'
        }).then(res => res.json())
    },

    update: (model: ProjectStage) => {
        const { id , description } = model;

        return fetch(`${ backlogApiUrl }/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ description })
        })
    }

}
