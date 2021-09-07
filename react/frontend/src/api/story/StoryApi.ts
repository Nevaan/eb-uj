import { apiConfig } from '../ApiConfig';
import { CreateStory } from './model/CreateStory';

const storyApiUrl = `${ apiConfig.baseUrl }story`;

export const StoryApi = {

    create: (model: (CreateStory & { stageId: number })): Promise<void> => {
        return fetch(storyApiUrl, {
            method: 'POST',
            body: JSON.stringify(model), 
            headers: { 
                'Content-Type': 'application/json', 
                credentials: "include"
            }
        }).then(res => res.json())
    },

    getByStageId: (id: number) => {
        return fetch(`${storyApiUrl}/${id}`, { 
            method: 'GET', 
            headers: { 
                'Content-Type': 'application/json', 
                credentials: "include"
            }
        })
        .then(res => res.json())
    }

}