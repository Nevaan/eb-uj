import { makeStyles } from "@material-ui/core";
import { FC } from "react";
import { useForm } from "../../util/form/form";
import { Button } from "@material-ui/core";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { EmployeeModel } from "../../api/employee/model/EmployeeModel";

type AddEmployeeToTeamProps = {
    employees: EmployeeModel[],
    addEmployeeCallback: (form: { userId: string }) => void
}

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: 'row',
        marginBottom: '15px',
        justifyContent: 'space-between'
    },
    textContainer: {
        marginRight: '25px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    container: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: "space-between",
        flexGrow: 1
    },
    select: {
        marginRight: '15px',
        flexGrow: 9
    },
    button: {
        flexGrow: 1
    }
});

const AddEmployeeToTeam: FC<AddEmployeeToTeamProps> = (props: AddEmployeeToTeamProps) => {
    const classes = useStyles();

    const { onChange, onSubmit, formValues, setFormValues } = useForm<{ userId: string }>(
        () => {},
        {
            userId: ""
        }
    );

    const submit = (evt: React.FormEvent<HTMLFormElement> ) => {
        onSubmit(evt);
        props.addEmployeeCallback(formValues);
    }

    return (
        <div className={classes.root}>
            <div className={classes.textContainer}>
                <div>Add employee to team: </div>
            </div>
            <form className={classes.container} onSubmit={submit}>
                <Select
                    id="select-employees"
                    onChange={onChange}
                    value={formValues.userId}
                    name="userId"
                    className={classes.select}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {
                        props.employees.map(e => (
                            <MenuItem value={e.id}>
                                {e.surname} {e.name}
                            </MenuItem>
                        ))
                    }
                </Select>
                <Button className={classes.button} variant="contained" color="primary" type="submit" >
                    Add
                </Button>
            </form>
        </div>
    )
}

export default AddEmployeeToTeam;