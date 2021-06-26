import { FC } from "react";
import {RouteComponentProps} from "react-router-dom";
import SubtaskList from "../subtask/SubtaskList";

interface TaskRouteParams {
    taskId: string;
}

interface TaskProps extends RouteComponentProps<TaskRouteParams> {
}
const Task: FC<TaskProps> = (props) => {
    return (
        <div>
            Task {props.match.params.taskId}!
            <SubtaskList></SubtaskList>
        </div>
    )
}

export default Task;
