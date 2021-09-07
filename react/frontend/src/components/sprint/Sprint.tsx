import { FC, useEffect, useState } from "react";
import { StoryModel } from "../../api/story/model/StoryModel";
import { StoryApi } from "../../api/story/StoryApi";
import StoryList from "../story/StoryList";
type SprintProps = {
    id: number | undefined;
}

const Sprint: FC<SprintProps> = (props) => {

    const [sprint, setSprint] = useState<StoryModel[]>([]);

    useEffect(() => fetchSprint(), []);

    const fetchSprint = (): void => {
        if (props.id) {
            StoryApi.getByStageId(props.id)
                .then(stories => setSprint((stories)))
                .catch((err: Error) => console.log(err))
        }
    }

    return (
        <div>
            {
                props.id ?
                    <StoryList stories={sprint}></StoryList>
                    : (
                        <div>Sprint was not defined yet.</div>
                    )
            }

        </div>
    )
}

export default Sprint;
