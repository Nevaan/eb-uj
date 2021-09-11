import { FC, useEffect, useState } from "react";
import {RouteComponentProps} from "react-router-dom";
import { SubtaskApi } from "../../api/subtask/SubtaskApi";
import { GetTaskModel } from "../../api/task/model/GetTaskModel";
import { useForm } from "../../util/form/form";

import TextField from '@material-ui/core/TextField';
import { Button, makeStyles } from "@material-ui/core";
import SelectEmployee from '../employee/SelectEmployee';
import TimeEntryList from '../timeentry/TimeEntryList';
import CommentList from '../comment/CommentList'
interface SubtaskRouteParams {
    subtaskId: string;
}

interface SubtaskProps extends RouteComponentProps<SubtaskRouteParams> {
}

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    containerElement: {
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
    selectEmployee: {
        width: '100%'
    }
});

const Subtask: FC<SubtaskProps> = (props) => {
    const classes = useStyles();
    const [subtask, setSubtask] = useState<GetTaskModel>();

    useEffect(() => {
        fetchSubtask();
    }, []);

    const fetchSubtask = (): void => {
        const subtaskId = props.match.params.subtaskId;
        if (subtaskId) {
            SubtaskApi.get(+subtaskId)
                .then(t => {
                    const { description, employeeId } = t;
                    setFormValues({ description, employeeId })
                    setSubtask(t);
                })
        }
    }

    const { onChange, onSubmit, formValues, setFormValues } = useForm<{ description: string, employeeId?: number }>(
        {
            description: ""
        },
        updateSubtaskCallback
    );

    async function updateSubtaskCallback() {
        const subtaskId = props.match.params.subtaskId;
        if (subtaskId) {
            SubtaskApi.update(+subtaskId, formValues.description)
                .then(() => {
                        SubtaskApi.assignEmployee(+subtaskId, formValues.employeeId).then(
                            () => fetchSubtask()
                        )
                })
        }
    }

    const formChanged = (): boolean => {
        return subtask?.description === formValues.description && subtask?.employeeId === formValues.employeeId;
    }

    return (
        <div className={classes.container}>
            {subtask? <div className={classes.containerElement}>
                <form autoComplete="off" onSubmit={onSubmit}>
                    <div className={classes.formRow}>
                        <TextField
                            className={classes.leftColumn}
                            name="description"
                            label="Task description"
                            value={formValues.description}
                            onChange={onChange}
                            variant="outlined"
                        />
                        <Button type="submit" variant="contained" color="primary"
                            disabled={formChanged()}
                        >
                            Save
                                </Button>
                    </div>
                    <div className={classes.formRow}>
                        <div className={classes.leftColumn}>
                            <SelectEmployee onChange={onChange} value={formValues.employeeId} class={classes.selectEmployee} teamId={subtask.teamId} formName="employeeId"></SelectEmployee>
                        </div>
                    </div>
                    <TimeEntryList subtaskId={subtask.id} teamId={subtask.teamId}></TimeEntryList>
                    <CommentList taskId={subtask.id}></CommentList>
                </form>
                </div>:
                <div>Loading subtask...</div>
                }
        </div>
    )
}

export default Subtask;
