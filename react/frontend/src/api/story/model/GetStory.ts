export interface GetStory {
    id: number;
    name: string;
    description: string;
    assigneeId?: number;
    teamId: number;
}