import { FC } from "react";
import {RouteComponentProps} from "react-router-dom";

interface StoryRouteParams {
    storyId: string;
}

interface StoryProps extends RouteComponentProps<StoryRouteParams> {
}

const Story: FC<StoryProps> = (props) => {
    return (
        <div>
            Story {props.match.params.storyId}!
        </div>
    )
}

export default Story;
