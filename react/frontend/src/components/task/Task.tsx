import { FC, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { TaskApi } from "../../api/task/TaskApi";
import { useForm } from "../../util/form/form";
import SubtaskList from "../subtask/SubtaskList";
import SelectEmployee from '../employee/SelectEmployee';

import TextField from '@material-ui/core/TextField';
import { Button } from "@material-ui/core";
import { GetTaskModel } from "../../api/task/model/GetTaskModel";
interface TaskRouteParams {
    taskId: string;
}

interface TaskProps extends RouteComponentProps<TaskRouteParams> {
}


const Task: FC<TaskProps> = (props) => {

    const [task, setTask] = useState<GetTaskModel>();

    useEffect(() => {
        fetchTask();
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
                            () => fetchTask()
                        )
                })
        }
    }

    const formChanged = (): boolean => {
        return task?.description === formValues.description && task?.employeeId === formValues.employeeId;
    }

    return (
        <div>
            {task? <div>
                <form autoComplete="off" onSubmit={onSubmit}>
                    <div>
                        <TextField
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
                    <SelectEmployee onChange={onChange} value={formValues.employeeId} class="" teamId={task.teamId} formName="employeeId"></SelectEmployee>
                </form>
                <SubtaskList taskId={task.id} storyId={task.storyId} teamId={task.teamId}></SubtaskList> 
                </div>:
                <div>Loading task...</div>
                }
        </div>
    )
}

export default Task;
