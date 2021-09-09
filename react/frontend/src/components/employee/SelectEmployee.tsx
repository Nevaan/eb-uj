import { FC, useEffect, useState } from "react";

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { EmployeeModel } from "../../api/employee/model/EmployeeModel";
import { TeamApi } from "../../api/team/TeamApi";

type SelectEmployeeProps = {
    onChange: (event: React.ChangeEvent<any>) => void;
    value: any;
    class: string;
    teamId: number;
}

const SelectEmployee: FC<SelectEmployeeProps> = (props) => {

    const [employees, setEmployees] = useState<EmployeeModel[]>([]);

    const fetchEmployees = (): void => {
        TeamApi.getEmployees(props.teamId).then(employees => {
            setEmployees(employees);
        })
    };

    useEffect(() => {
        fetchEmployees()
    }, []);

    return (
        <Select
            id="select-assignee"
            onChange={props.onChange}
            value={props.value}
            name="assigneeId"
            className={props.class}
        >
            <MenuItem value={undefined}>
                        <em>None</em>
            </MenuItem>
            {
                employees.map(e => (
                    <MenuItem value={e.id}>
                        {e.name} {e.surname}
                    </MenuItem>
                ))
            }
        </Select>
    )
}

export default SelectEmployee;