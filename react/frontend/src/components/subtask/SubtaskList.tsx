import {FC, useState} from "react";
import {Column} from "../table/column";
import {useHistory} from "react-router-dom";
import {SubtaskModel} from "../../api/subtask/model/SubtaskModel";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import AppTableWrapper from "../table/AppTableWrapper";

type SubtaskListProps = {}

const columns: Column<'id' | 'description'>[] = [
    {id: 'id', label: 'Id', minWidth: 170},
    {
        id: 'description',
        label: 'description',
        minWidth: 170,
        align: 'left',
    }
];

const SubtaskList: FC<SubtaskListProps> = () => {

    const history = useHistory();

    //TODO: real data
    const [subtasks, setSubtasks] = useState<SubtaskModel[]>([]);

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
        </div>
    )
}

export default SubtaskList;
