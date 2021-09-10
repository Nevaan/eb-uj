import { apiConfig } from '../ApiConfig';
import { GetCommentModel } from './model/GetCommentModel';

const commentApiUrl = `${ apiConfig.baseUrl }comment`;


export const CommentApi = {

    create: (input: {taskId: number, content: string }): Promise<void> => {
        return fetch(commentApiUrl, {
            method: 'POST',
            body: JSON.stringify(input),
            headers: { 
                'Content-Type': 'application/json', 
                credentials: "include"
            }
        }).then(res => res.json())
    },

    getByTaskId: (id: number): Promise<GetCommentModel[]> => {
        return fetch(`${commentApiUrl}/${id}`, { 
            method: 'GET', 
            headers: { 
                'Content-Type': 'application/json', 
                credentials: "include"
            }
        })
        .then(res => res.json())
    },

}