import { apiConfig } from '../ApiConfig';
import { EmployeeModel } from '../employee/model/EmployeeModel';
import { CreateTeam } from './model/CreateTeam';
import { TeamModel } from './model/TeamModel';

const teamApiUrl = `${ apiConfig.baseUrl }team`;

export const TeamApi = {
    create: (project: CreateTeam): Promise<void> => {
        return fetch(teamApiUrl, {
            method: 'POST',
            body: JSON.stringify(project), 
            headers: { 
                'Content-Type': 'application/json', 
                credentials: "include"
            }
        }).then(res => res.json())
    },

    list: (): Promise<TeamModel[]> => {
        return fetch(teamApiUrl, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json', 
                credentials: "include"
            }
        }).then(res => res.json())
    },

    get: (id: number): Promise<TeamModel> => {
        return fetch(`${ teamApiUrl }/${id}`, {
            method: 'GET'
        }).then(res => res.json())
    },

    getEmployees: (id: number): Promise<EmployeeModel[]> => {
        return fetch(`${ teamApiUrl }/${id}/employee`, {
            method: 'GET'
        }).then(res => res.json())
    },

    update: (updateProject: TeamModel): Promise<TeamModel> => {
        const { id, ...rest } = updateProject;

        return fetch(`${ teamApiUrl }/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(rest)
        }).then(res => res.json())
    },

    remove: (id: number): Promise<void> => {
        return fetch(`${ teamApiUrl }/${id}`, {
            method: 'DELETE'
        }).then(res => {})
    }
}