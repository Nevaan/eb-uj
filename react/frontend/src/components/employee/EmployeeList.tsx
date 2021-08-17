import {FC, useState} from "react";
import {Column} from "../table/column";
import {useHistory} from "react-router-dom";
import {TeamModel} from "../../api/team/model/TeamModel";
import Employee from "./Employee";
import {EmployeeModel} from "../../api/employee/EmployeeModel";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import AppTableWrapper from "../table/AppTableWrapper";

type EmployeeListProps = {}

const columns: Column<'id' | 'name'>[] = [
    {id: 'id', label: 'Id', minWidth: 170},
    {
        id: 'name',
        label: 'name',
        minWidth: 170,
        align: 'left',
    }
];

const EmployeeList: FC<EmployeeListProps> = () => {

    const history = useHistory();

    //TODO: real data
    const [employees, setEmployee] = useState<EmployeeModel[]>([
        {
            id: 1,
            name: "user1"
        },
        {
            id: 2,
            name: "user2"
        }
    ]);

    return (
        <AppTableWrapper columns={columns}>
            {employees.map((employee) => {
                return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={employee.id}
                              onClick={() => history.push("/employee/" + employee.id)}>
                        {columns.map((column) => {
                            const value = employee[column.id];
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

export default EmployeeList;
