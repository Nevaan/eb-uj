export interface TaskModel {
    id: number;
    description: string;
    storyId: number;
    parentId?: number;
    employeeId?: number;
}