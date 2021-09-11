import {FC, useEffect, useState} from "react";
import {Column} from "../table/column";
import {useHistory} from "react-router-dom";
import {SubtaskModel} from "../../api/subtask/model/SubtaskModel";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import AppTableWrapper from "../table/AppTableWrapper";
import { SubtaskApi } from "../../api/subtask/SubtaskApi";
import AddSubtask from './AddSubtask';
import { GetSubtaskList } from "../../api/subtask/model/GetSubtaskList";

type SubtaskListProps = {
    taskId: number;
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

const SubtaskList: FC<SubtaskListProps> = (props) => {

    const history = useHistory();

    const [subtasks, setSubtasks] = useState<GetSubtaskList[]>([]);

    useEffect(() => {
        fetchSubtasks();
    }, []);

    const fetchSubtasks = (): void => {
        if(props.taskId) {
            SubtaskApi.getList(props.taskId)
            .then(subs => setSubtasks(subs))
        }
    }

    return (
        <div>
            <h1>Subtasks: </h1>
        <AppTableWrapper columns={columns}>
            {subtasks.map((subtask) => {
                return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={subtask.id}
                              onClick={() => history.push("/subtask/" + subtask.id)}>
                        {columns.map((column) => {
                            const value = subtask[column.id];
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
        <AddSubtask storyId={props.storyId} teamId={props.teamId} taskId={props.taskId} success={fetchSubtasks}></AddSubtask>
        </div>
    )
}

export default SubtaskList;
