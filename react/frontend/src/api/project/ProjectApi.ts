import { apiConfig } from '../ApiConfig';
import {CreateProject} from "./model/CreateProject";
import {ProjectModel} from "./model/ProjectModel";

const projectApiUrl = `${ apiConfig.baseUrl }project`;

export const ProjectApi = {

    create: (project: CreateProject): Promise<void> => {
        return fetch(projectApiUrl, {
            method: 'POST',
            body: JSON.stringify(project), 
            headers: { 
                'Content-Type': 'application/json', 
                credentials: "include"
            }
        }).then(res => res.json())
    },

    list: (): Promise<ProjectModel[]> => {
        return fetch(projectApiUrl, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json', 
                credentials: "include"
            }
        }).then(res => res.json())
    },

    get: (id: number): Promise<ProjectModel> => {
        return fetch(`${ projectApiUrl }/${id}`, {
            method: 'GET'
        }).then(res => res.json())
    },

    update: (updateProject: Omit<ProjectModel, "teamId">): Promise<ProjectModel> => {
        const { id, ...rest } = updateProject;

        return fetch(`${ projectApiUrl }/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(rest)
        }).then(res => res.json())
    },

    remove: (id: number): Promise<void> => {
        return fetch(`${ projectApiUrl }/${id}`, {
            method: 'DELETE'
        }).then(res => {})
    }

}