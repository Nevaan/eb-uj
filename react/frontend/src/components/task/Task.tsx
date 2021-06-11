import { FC } from "react";
import {RouteComponentProps} from "react-router-dom";

interface TaskRouteParams {
    taskId: string;
}

interface TaskProps extends RouteComponentProps<TaskRouteParams> {
}
const Task: FC<TaskProps> = (props) => {
    return (
        <div>
            Task {props.match.params.taskId}!
        </div>
    )
}

export default Task;
