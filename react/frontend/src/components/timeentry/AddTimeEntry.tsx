import { FC, useState, CSSProperties } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { CreateTimeEntry } from "../../api/timeentry/model/CreateTimeEntry";
import { TimeEntryApi } from "../../api/timeentry/TimeEntryApi";
import { useForm } from "../../util/form/form";
import { Button } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import SelectEmployee from '../employee/SelectEmployee';

    type AddTimeEntryProps = {
        teamId: number;
        subtaskId: number;
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

    const AddTimeEntry: FC<AddTimeEntryProps> = (props) => {
        const classes = useStyles();
        const [addingTimeEntry, setAddingTimeEntry] = useState<boolean>(false);
    
        const initialState = {
            manHours: 0
        };
    
        const { onChange, onSubmit, formValues, setFormValues } = useForm<Omit<CreateTimeEntry, 'subtaskId'>>(
            initialState,
            createTimeEntryCallback
        );
    
        async function createTimeEntryCallback() {
            if(formValues.manHours && formValues.assigneeId) {
                TimeEntryApi
                    .create({ ...formValues, manHours: +formValues.manHours, subtaskId: props.subtaskId } )
                    .then(() => {
                        setAddingTimeEntry(false);
                        setFormValues(initialState);
                        props.success();
                    });
            }
        }
    

        return (
            <div className={classes.wrapper}>
            <Modal
                open={addingTimeEntry}
            >
                <div className={classes.container}>
                    <div className={classes.paper}>
                        <h2 className={classes.title}>Add time entry</h2>

                        <form className={classes.form} autoComplete="off"
                            onSubmit={onSubmit}
                        >
                            <TextField
                                className={classes.formElement}
                                label="Man hours"
                                variant="outlined"
                                size="small"
                                onChange={onChange}
                                name="manHours"
                                type="number"
                            />

                            <SelectEmployee onChange={onChange} value={formValues.assigneeId} class={classes.formElement} teamId={props.teamId} formName="assigneeId" ></SelectEmployee>

                            <div className={classes.buttons}>
                                <Button variant="contained" color="secondary" className={classes.button}
                                    onClick={() => setAddingTimeEntry(false)}
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
            <Fab color="primary" aria-label="add" style={styles.add} onClick={() => setAddingTimeEntry(true)}>
                <AddIcon />
            </Fab>
        </div>
        )
    }

    export default AddTimeEntry;