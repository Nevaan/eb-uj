import { FC } from "react";
import {RouteComponentProps} from "react-router-dom";
import TaskList from "../task/TaskList";

interface StoryRouteParams {
    storyId: string;
}

interface StoryProps extends RouteComponentProps<StoryRouteParams> {
}

const Story: FC<StoryProps> = (props) => {
    return (
        <div>
            Story {props.match.params.storyId}!
            <TaskList></TaskList>
        </div>
    )
}

export default Story;
