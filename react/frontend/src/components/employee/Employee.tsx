import { makeStyles, Button } from "@material-ui/core";
import { FC, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { EmployeeApi } from "../../api/employee/EmployeeApi";
import { EmployeeModel } from "../../api/employee/model/EmployeeModel";
import { useForm } from "../../util/form/form";
import TextField from '@material-ui/core/TextField';

interface EmployeeRouteParams {
    employeeId: string;
}

interface EmployeeProps extends RouteComponentProps<EmployeeRouteParams> {}

const useStyles = makeStyles({
    form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width: '80%',
        marginBottom: '15px'
    },
    formRow: {
        marginTop: '10px',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    leftColumn: {
        width: '50%'
    },
    button: {
        justifySelf: 'flex-end',
        height: '40px',
        width: '75px'
    },
    details: {
        width: '80%'
    }
});

const Employee: FC<EmployeeProps> = (props: EmployeeProps) => {
    const classes = useStyles();
    const employeeId = Number(props.match.params.employeeId);
    const [employee, setEmployee] = useState<EmployeeModel>();

    useEffect(() => {
        fetchEmployeeById()
    }, []);

    const fetchEmployeeById = (): void => {
        EmployeeApi.get(employeeId)
            .then(employeeResponse => {
                setEmployee((employeeResponse));
                const { name, surname } = employeeResponse;
                setFormValues({ name, surname })
            })
            .catch((err: Error) => console.log(err))
    }

    const { onChange, onSubmit, formValues, setFormValues } = useForm<Omit<EmployeeModel, 'id'>>(
        {
            name: "",
            surname: ""
        },
        updateEmployeeCallback
    );

    async function updateEmployeeCallback() {
        if (employee) {
            const { id } = employee;
            EmployeeApi.update({
                ...formValues,
                id
            })
                .then((result) =>
                    setEmployee(result)
                );
        }
    }

    const formChanged = (): boolean  => {
        return employee?.name === formValues.name && employee?.surname === formValues.surname;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
<form className={classes.form} autoComplete="off" onSubmit={onSubmit}>
                <div className={classes.formRow}>
                    <TextField
                        className={classes.leftColumn}
                        name="name"
                        label="Employee name"
                        value={formValues.name}
                        onChange={onChange}
                        variant="outlined"
                    />
                    <Button type="submit" variant="contained" color="primary" className={classes.button}
                    disabled={formChanged()}
                    >
                        Save
                                </Button>
                </div>

                <div className={classes.formRow}>
                    <TextField
                        className={classes.leftColumn}
                        name="surname"
                        label="Surname"
                        multiline
                        maxRows={4}
                        value={formValues.surname}
                        onChange={onChange}
                        variant="outlined"
                    />
                </div>

            </form>
        </div>
    )
}

export default Employee;
