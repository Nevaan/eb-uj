import { FC } from "react"
import Login from "../components/login/Login"
import LoginCallback from "../components/login/LoginCallback"
import Project from "../components/project/Project"
import ProjectList from "../components/project/ProjectList"
import Story from "../components/story/Story"
import Subtask from "../components/subtask/Subtask"
import Task from "../components/task/Task"
import Team from "../components/team/Team"
import TeamList from "../components/team/TeamList"
import Employee from "../components/employee/Employee"
import EmployeeList from "../components/employee/EmployeeList"

type Route = {
    exact?: boolean;
    path: string;
    component: FC<any>
}
export const PublicRoutes: Route[] = [
    {
        exact: true,
        path: '/login',
        component: Login
    },
    {
        exact: true,
        path: '/login/callback',
        component: LoginCallback
    }
]

export const SecuredRoutes: Route[] = [
    {
        exact: true,
        path: '/project',
        component: ProjectList
    },
    {
        path: '/project/:projectId',
        component: Project
    },
    {
        path: '/story/:storyId',
        component: Story
    },
    {
        path: '/task/:taskId',
        component: Task
    },
    {
        path: '/subtask/:subtaskId',
        component: Subtask
    },
    {
        exact: true,
        path: '/team',
        component: TeamList
    },
    {
        path: '/team/:teamId',
        component: Team
    },
    {
        exact: true,
        path: '/employee',
        component: EmployeeList
    },
    {
        path: '/employee/:userId',
        component: Employee
    },
]
