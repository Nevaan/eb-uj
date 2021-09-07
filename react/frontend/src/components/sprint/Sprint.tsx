import { FC, useEffect, useState } from "react";
import { StoryModel } from "../../api/story/model/StoryModel";
import { StoryApi } from "../../api/story/StoryApi";
import StoryList from "../story/StoryList";
import { Button } from "@material-ui/core";
import { SprintApi } from "../../api/sprint/SprintApi";


type SprintProps = {
    id: number | undefined;
    projectId: number | undefined;
    completed: () => void;
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

    const completeSprint = (): void => {
        if(props.projectId){ 
            SprintApi.complete(props.projectId).then(_ => {
                props.completed()
            })
        }
    }

    return (
        <div>
            {
                props.id ? (
                    <div>
                        <Button color="primary" variant="contained" onClick={completeSprint}>
                            Complete sprint
                        </Button>
                        <StoryList stories={sprint}></StoryList>
                    </div>
                )
                    : (
                        <div>Sprint was not defined yet.</div>
                    )
            }

        </div>
    )
}

export default Sprint;
