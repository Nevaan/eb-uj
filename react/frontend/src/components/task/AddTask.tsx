import { FC, useState, CSSProperties, useEffect } from "react";
import { EmployeeModel } from "../../api/employee/model/EmployeeModel";
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from "../../util/form/form";
import {AddTask as AddTaskModel} from "../../api/task/model/AddTask";
import { TaskApi } from "../../api/task/TaskApi";
import { TeamApi } from "../../api/team/TeamApi";
import { Button } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import SelectEmployee from '../employee/SelectEmployee';

type AddTaskProps = {
    storyId: number;
    teamId: number;
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



const AddTask: FC<AddTaskProps> = (props) => {
    const classes = useStyles();
    const [addingTask, setAddingTask] = useState<boolean>(false);
    

    const initialState = {
        description: ""
    };

    const { onChange, onSubmit, formValues } = useForm<AddTaskModel>(
        createTaskCallback,
        initialState
    );

    async function createTaskCallback() {
        TaskApi
            .create({ ...formValues, storyId: props.storyId } )
            .then(() => {
                setAddingTask(false);
                props.success();
            });
    };

    return (
        <div className={classes.wrapper}>
            <Modal
                open={addingTask}
            >
                <div className={classes.container}>
                    <div className={classes.paper}>
                        <h2 className={classes.title}>Add task</h2>

                        <form className={classes.form} autoComplete="off"
                            onSubmit={onSubmit}
                        >
                            <TextField
                                className={classes.formElement}
                                label="Description"
                                variant="outlined"
                                size="small"
                                onChange={onChange}
                                name="description"
                            />

                            <SelectEmployee onChange={onChange} value={formValues.assigneeId} class={classes.formElement} teamId={props.teamId}></SelectEmployee>

                            <div className={classes.buttons}>
                                <Button variant="contained" color="secondary" className={classes.button}
                                    onClick={() => setAddingTask(false)}
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
            <Fab color="primary" aria-label="add" style={styles.add} onClick={() => setAddingTask(true)}>
                <AddIcon />
            </Fab>
        </div>
    )
}

export default AddTask;