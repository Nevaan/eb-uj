
import { CSSProperties, FC, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Button } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import { useForm } from "../../util/form/form";
import Modal from '@material-ui/core/Modal';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { CreateEmployee } from "../../api/employee/model/CreateEmployee";
import { EmployeeApi } from "../../api/employee/EmployeeApi";

type AddEmployeeProps = {
    success: () => void;
}

const styles = {
    add: {
        marginTop: '15px',
        alignSelf: "flex-end"
    } as CSSProperties
};

const useStyles = makeStyles({
    wrapper: {
        display: 'flex',
        flexDirection: 'column'
    },
    container: {
        position: 'absolute',
        display: 'flex',
        width: '100%',
        top: '30%',
    },
    paper: {
        width: '40%',
        border: '2px solid #000',
        margin: 'auto',
        backgroundColor: 'white'
    },
    title: {
        textAlign: 'center'
    },
    buttons: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    button: {
        margin: '15px'
    },
    form: {
        display: 'flex',
        flexDirection: 'column'
    },
    formElement: {
        marginLeft: '15px',
        marginRight: '15px',
        marginBottom: '15px'
    }
});

const AddEmployee: FC<AddEmployeeProps> = (props: AddEmployeeProps) => {
    const classes = useStyles();
    const [addingEmployee, setAddingEmployee] = useState<boolean>(false);

    const initialState = {
        name: "",
        surname: "",
    };

    const { onChange, onSubmit, formValues, setFormValues } = useForm<CreateEmployee>(
        initialState,
        createEmployeeCallback
    );

    async function createEmployeeCallback() {
        EmployeeApi
            .create(formValues)
            .then(() => {
                setAddingEmployee(false);
                setFormValues(initialState);
                props.success();
            });
    }

    return (
        <div className={classes.wrapper}>
            <Modal
                open={addingEmployee}
            >
                <div className={classes.container}>
                    <div className={classes.paper}>
                        <h2 className={classes.title}>Add Employee</h2>

                        <form className={classes.form} autoComplete="off"
                            onSubmit={onSubmit}
                        >
                            <TextField
                                className={classes.formElement}
                                label="Employee name"
                                name="name"
                                variant="outlined"
                                size="small"
                                onChange={onChange}
                            />
                            <TextField
                                className={classes.formElement}
                                label="Surname"
                                variant="outlined"
                                size="small"
                                onChange={onChange}
                                name="surname"
                            />

                            <div className={classes.buttons}>
                                <Button variant="contained" color="secondary" className={classes.button}
                                    onClick={() => setAddingEmployee(false)}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" variant="contained" color="primary" className={classes.button}>
                                    Create
                        </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
            <Fab color="primary" aria-label="add" style={styles.add} onClick={() => setAddingEmployee(true)}>
                <AddIcon />
            </Fab>
        </div>

    )
}

export default AddEmployee;