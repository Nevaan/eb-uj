export interface ProjectModel {
    id: number;
    name: string;
    description: string;
    teamId: number;
    sprintId?: number;
    backlogId?: number;
}