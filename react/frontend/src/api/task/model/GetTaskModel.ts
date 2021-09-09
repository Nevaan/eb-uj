import { TaskModel } from "./TaskModel";

export interface GetTaskModel extends TaskModel {
    teamId: number;
}