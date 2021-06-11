import { FC } from "react";
import StoryList from "../story/StoryList";
type SprintProps = {}

const Sprint: FC<SprintProps> = () => {
    return (
        <div>
            Spring!
            <StoryList></StoryList>
        </div>
    )
}

export default Sprint;
