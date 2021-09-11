import { FC, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { TaskApi } from "../../api/task/TaskApi";
import { useForm } from "../../util/form/form";
import SubtaskList from "../subtask/SubtaskList";
import SelectEmployee from '../employee/SelectEmployee';

import TextField from '@material-ui/core/TextField';
import { Button, makeStyles } from "@material-ui/core";
import { GetTaskModel } from "../../api/task/model/GetTaskModel";
import { TimeEntryApi } from "../../api/timeentry/TimeEntryApi";
import CommentList from "../comment/CommentList";
interface TaskRouteParams {
    taskId: string;
}

interface TaskProps extends RouteComponentProps<TaskRouteParams> {
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

const Task: FC<TaskProps> = (props) => {
    const classes = useStyles();
    const [task, setTask] = useState<GetTaskModel>();
    const [totalTimeCount, setTotalTimeCount] = useState<number>(0);

    useEffect(() => {
        fetchTask();
        fetchTotalTime();
    }, []);

    const fetchTask = (): void => {
        const taskId = props.match.params.taskId;
        if (taskId) {
            TaskApi.get(+taskId)
                .then(t => {
                    const { description, employeeId } = t;
                    setFormValues({ description, employeeId })
                    setTask(t);
                })
        }
    }

    const fetchTotalTime = (): void => {
        const taskId = props.match.params.taskId;
        if (taskId) {
            TimeEntryApi.countForTask(+taskId)
            .then(count => setTotalTimeCount(count.totalCount))
        }
    };

    const { onChange, onSubmit, formValues, setFormValues } = useForm<{ description: string, employeeId?: number }>(
        {
            description: ""
        },
        updateTaskCallback
    );

    async function updateTaskCallback() {
        const taskId = props.match.params.taskId;
        if (taskId) {
            TaskApi.update(+taskId, formValues.description)
                .then(() => {
                        TaskApi.assignEmployee(+taskId, formValues.employeeId).then(
                            () => { 
                                fetchTask();
                                fetchTotalTime();
                            }
                        )
                })
        }
    }

    const formChanged = (): boolean => {
        return task?.description === formValues.description && task?.employeeId === formValues.employeeId;
    }

    return (
        <div className={classes.container}>
            {task? <div className={classes.containerElement}>
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
                            <SelectEmployee onChange={onChange} value={formValues.employeeId} class={classes.selectEmployee} teamId={task.teamId} formName="employeeId"></SelectEmployee>
                        </div>
                    </div>
                </form>
                <h2>Total time spent on task: {totalTimeCount} hour(s)</h2>
                <SubtaskList taskId={task.id} storyId={task.storyId} teamId={task.teamId}></SubtaskList> 
                <CommentList taskId={task.id}></CommentList>
                </div>:
                <div>Loading task...</div>
                }
        </div>
    )
}

export default Task;
