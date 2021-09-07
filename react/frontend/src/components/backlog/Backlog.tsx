import { FC, useEffect, useState } from "react";
import { StoryModel } from "../../api/story/model/StoryModel";
import { StoryApi } from "../../api/story/StoryApi";
import AddStory from "../story/AddStory";
import StoryList from "../story/StoryList";

type BacklogProps = {
    id: number | undefined;
}

const Backlog: FC<BacklogProps> = (props) => {

    const [backlog, setBacklog] = useState<StoryModel[]>([]);

    useEffect(() => fetchBacklog(), []);

    const fetchBacklog = (): void => {
        if (props.id) {
            StoryApi.getByStageId(props.id)
                .then(stories => setBacklog((stories)))
                .catch((err: Error) => console.log(err))
        }
    }

    return (
        <div>
            {
                backlog.length ?
                    <StoryList stories={backlog}></StoryList>
                    : (
                        <div> Backlog is empty! </div>
                    )


            }

            {
                props.id ?
                    <AddStory stageId={props.id} success={fetchBacklog}></AddStory>
                    : (<div></div>)
            }


        </div>
    )
}

export default Backlog;