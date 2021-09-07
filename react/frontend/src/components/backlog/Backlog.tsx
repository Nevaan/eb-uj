import { FC } from "react";
import StoryList from "../story/StoryList";

type BacklogProps = {}

const Backlog: FC<BacklogProps> = () => {
    return (
        <div>
            <StoryList></StoryList>
        </div>
    )
}

export default Backlog;