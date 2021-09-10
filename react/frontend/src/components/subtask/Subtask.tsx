import { FC, useEffect, useState } from "react";
import {RouteComponentProps} from "react-router-dom";
import { SubtaskApi } from "../../api/subtask/SubtaskApi";
import { GetTaskModel } from "../../api/task/model/GetTaskModel";
import { useForm } from "../../util/form/form";

import TextField from '@material-ui/core/TextField';
import { Button } from "@material-ui/core";
import SelectEmployee from '../employee/SelectEmployee';
interface SubtaskRouteParams {
    subtaskId: string;
}

interface SubtaskProps extends RouteComponentProps<SubtaskRouteParams> {
}

const Subtask: FC<SubtaskProps> = (props) => {

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
        <div>
            {subtask? <div>
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
                    <SelectEmployee onChange={onChange} value={formValues.employeeId} class="" teamId={subtask.teamId} formName="employeeId"></SelectEmployee>
                </form>
                </div>:
                <div>Loading subtask...</div>
                }
        </div>
    )
}

export default Subtask;
