import { FC, CSSProperties, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { AddSubtaskModel } from "../../api/subtask/model/AddSubtaskModel";
import { useForm } from "../../util/form/form";
import { SubtaskApi } from "../../api/subtask/SubtaskApi";
import { Button } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import SelectEmployee from '../employee/SelectEmployee';

type AddSubtaskProps = {
    taskId: number;
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


const AddSubtask: FC<AddSubtaskProps> = (props) => {
    const classes = useStyles();
    const [addingSubtask, setAddingSubtask] = useState<boolean>(false);

    const initialState = {
        description: ""
    };

    const { onChange, onSubmit, formValues } = useForm<AddSubtaskModel>(
        createSubtaskCallback,
        initialState
    );

    async function createSubtaskCallback() {
        SubtaskApi
            .create({ ...formValues, storyId: props.storyId, taskId: props.taskId } )
            .then(() => {
                setAddingSubtask(false);
                props.success();
            });
    };

    return (
        <div className={classes.wrapper}>
            <Modal
                open={addingSubtask}
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

                            <SelectEmployee onChange={onChange} value={formValues.assigneeId} class={classes.formElement} teamId={props.teamId} formName="assigneeId" ></SelectEmployee>

                            <div className={classes.buttons}>
                                <Button variant="contained" color="secondary" className={classes.button}
                                    onClick={() => setAddingSubtask(false)}
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
            <Fab color="primary" aria-label="add" style={styles.add} onClick={() => setAddingSubtask(true)}>
                <AddIcon />
            </Fab>
        </div>
    )
}

export default AddSubtask;