import { FC } from "react";
import {RouteComponentProps} from "react-router-dom";

interface SubtaskRouteParams {
    subtaskId: string;
}

interface SubtaskProps extends RouteComponentProps<SubtaskRouteParams> {
}

const Subtask: FC<SubtaskProps> = (props) => {
    return (
        <div>
            Subtask {props.match.params.subtaskId}!
        </div>
    )
}

export default Subtask;
