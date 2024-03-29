import { FC, useEffect, useState } from "react";

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { EmployeeModel } from "../../api/employee/model/EmployeeModel";
import { TeamApi } from "../../api/team/TeamApi";
import { makeStyles } from "@material-ui/styles";

type SelectEmployeeProps = {
    onChange: (event: React.ChangeEvent<any>) => void;
    value: any;
    class: string;
    teamId: number;
    formName: string;
}

const useStyles = makeStyles({
    text: {
        width: '200px',
        lineHeight: '30px',
        height: '30px',
        alignSelf: 'center',
        textAlign: 'left'
    },
    container: {
        display: 'flex',
        flexDirection: 'row'
    }
});

const SelectEmployee: FC<SelectEmployeeProps> = (props) => {
    const classes = useStyles();
    const [employees, setEmployees] = useState<EmployeeModel[]>([]);

    const fetchEmployees = (): void => {
        TeamApi.getEmployees(props.teamId).then(employeesResponse => {
            setEmployees(employeesResponse);
        })
    };

    useEffect(() => {
        fetchEmployees()
    }, []);

    return (
        <div className={classes.container}>
            <div className={classes.text}>Select employee: </div>
            
            <Select
                id="select-assignee"
                onChange={props.onChange}
                value={props.value}
                name={props.formName}
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
        </div>
    )
}

export default SelectEmployee;