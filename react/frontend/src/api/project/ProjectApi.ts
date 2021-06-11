import { apiConfig } from '../ApiConfig';
import {CreateProject} from "./model/CreateProject";
import {Project} from "./model/Project";

const projectApiUrl = `${ apiConfig.baseUrl }project`;

export const ProjectApi = {

    create: (project: CreateProject): Promise<void> => {
        return fetch(projectApiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(project)
        }).then(res => res.json())
    },

    list: (): Promise<Project[]> => {
        return fetch(projectApiUrl, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json())
    },

    get: (id: number): Promise<Project> => {
        return fetch(`${ projectApiUrl }/${id}`, {
            method: 'GET'
        }).then(res => res.json())
    },

    update: (updateProject: any): Promise<Project> => {
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
        }).then(res => res.json())
    }

}