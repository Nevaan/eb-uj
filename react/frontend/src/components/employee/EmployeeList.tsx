import {FC} from "react";
import {Column} from "../table/column";
import {useHistory} from "react-router-dom";
import {EmployeeModel} from "../../api/employee/model/EmployeeModel";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import AppTableWrapper from "../table/AppTableWrapper";

type EmployeeListProps = {
    employees: EmployeeModel[]
}

const columns: Column<'id' | 'name' | 'surname'>[] = [
    {id: 'id', label: 'Id', minWidth: 170},
    {
        id: 'name',
        label: 'name',
        minWidth: 170,
        align: 'left',
    },
    {
        id: 'surname',
        label: 'surname',
        minWidth: 170,
        align: 'left',
    }
];

const EmployeeList: FC<EmployeeListProps> = (props: EmployeeListProps) => {

    const history = useHistory();

    return (
        <AppTableWrapper columns={columns}>
            {props.employees.map((employee) => {
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
