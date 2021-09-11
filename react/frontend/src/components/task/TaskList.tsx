import {FC, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {TaskModel} from "../../api/task/model/TaskModel";
import {Column} from "../table/column";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import AppTableWrapper from "../table/AppTableWrapper";
import AddTask from "./AddTask";
import { TaskApi } from "../../api/task/TaskApi";
import { GetTaskList } from "../../api/task/model/GetTaskList";

type TaskListProps = {
    storyId: number;
    teamId: number;
}

const columns: Column<'id' | 'description' | 'assignee'>[] = [
    {id: 'id', label: 'Id', minWidth: 170},
    {
        id: 'description',
        label: 'description',
        minWidth: 170,
        align: 'left',
    },
    {
        id: 'assignee',
        label: 'assignee',
        minWidth: 170,
        align: 'left',
    }
];

const TaskList: FC<TaskListProps> = (props) => {

    const history = useHistory();

    const [tasks, setTasks] = useState<GetTaskList[]>([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = (): void => {
        if (props.storyId) {
            TaskApi.getListForStory(props.storyId)
                .then(tasksResponse => setTasks((tasksResponse)))
                .catch((err: Error) => console.log(err))
        }
    }

    return (
    <div>
        <h1>Tasks: </h1>
    <AppTableWrapper columns={columns}>
            {tasks.map((task) => {
                return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={task.id}
                              onClick={() => history.push("/task/" + task.id)}>
                        {columns.map((column) => {
                            const value = task[column.id];
                            return (
                                <TableCell key={column.id} align={column.align}>
                                    {value}
                                </TableCell>
                            );
                        })}
                    </TableRow>
                );
            })}
        </AppTableWrapper>
        <AddTask storyId={props.storyId} teamId={props.teamId} success={fetchTasks}></AddTask>
    </div>
    
    )
}

export default TaskList;
