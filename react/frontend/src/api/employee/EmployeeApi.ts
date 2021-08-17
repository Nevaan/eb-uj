import { apiConfig } from "../ApiConfig";
import { CreateEmployee } from "./model/CreateEmployee";
import { EmployeeModel } from "./model/EmployeeModel";

const employeeApiUrl = `${ apiConfig.baseUrl }employee`;

export const EmployeeApi = {
    create: (employee: CreateEmployee): Promise<void> => {
        return fetch(employeeApiUrl, {
            method: 'POST',
            body: JSON.stringify(employee), 
            headers: { 
                'Content-Type': 'application/json', 
                credentials: "include"
            }
        }).then(res => res.json())
    },

    list: (): Promise<EmployeeModel[]> => {
        return fetch(employeeApiUrl, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json', 
                credentials: "include"
            }
        }).then(res => res.json())
    },

    get: (id: number): Promise<EmployeeModel> => {
        return fetch(`${ employeeApiUrl }/${id}`, {
            method: 'GET'
        }).then(res => res.json())
    },

    update: (updateEmployee: EmployeeModel): Promise<EmployeeModel> => {
        const { id, ...rest } = updateEmployee;

        return fetch(`${ employeeApiUrl }/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(rest)
        }).then(res => res.json())
    },

    remove: (id: number): Promise<void> => {
        return fetch(`${ employeeApiUrl }/${id}`, {
            method: 'DELETE'
        }).then(res => {})
    }
}