import { ProjectModel } from "./ProjectModel";

export type CreateProject = Omit<ProjectModel, 'id'>;