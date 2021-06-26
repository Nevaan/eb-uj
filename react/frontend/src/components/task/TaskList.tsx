import {FC, useState} from "react";
import {useHistory} from "react-router-dom";
import {TaskModel} from "../../api/task/model/TaskModel";
import {Column} from "../table/column";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import AppTableWrapper from "../table/AppTableWrapper";

type TaskListProps = {}

const columns: Column<'id' | 'description'>[] = [
    {id: 'id', label: 'Id', minWidth: 170},
    {
        id: 'description',
        label: 'description',
        minWidth: 170,
        align: 'left',
    }
];

const TaskList: FC<TaskListProps> = () => {

    const history = useHistory();

    //TODO: real data
    const [tasks, setTasks] = useState<TaskModel[]>([
        {
            id: 1,
            description: "task1"
        },
        {
            id: 2,
            description: "task2"
        }
    ]);

    return (
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
    )
}

export default TaskList;
