import { FC, useEffect, useState } from "react";
import { StoryModel } from "../../api/story/model/StoryModel";
import { StoryApi } from "../../api/story/StoryApi";
import AddStory from "../story/AddStory";
import StoryList from "../story/StoryList";
import { Button } from "@material-ui/core";
import { SprintApi } from "../../api/sprint/SprintApi";
import UpdateProjectStage from "../stage/UpdateProjectStage";
import { ProjectStage } from "../../api/stage/model/ProjectStage";
import { BacklogApi } from "../../api/backlog/BacklogApi";

type BacklogProps = {
    id: number | undefined;
    projectId: number | undefined;
    sprintStart: () => void;
}

const Backlog: FC<BacklogProps> = (props) => {

    const [backlog, setBacklog] = useState<StoryModel[]>([]);
    const [stage, setStage] = useState<ProjectStage>();

    useEffect(() => {
        fetchStage()
        fetchBacklog()
    }, []);

    const fetchBacklog = (): void => {
        if (props.id) {
            StoryApi.getByStageId(props.id)
                .then(stories => setBacklog((stories)))
                .catch((err: Error) => console.log(err))
        }
    }

    const fetchStage = () => {
        if (props.projectId) {
            BacklogApi.get(props.projectId)
            .then(result => setStage(result))
        }
    }

    const startSprint = () => {
        const { id, projectId } = props;
        if(id && projectId) {
            SprintApi.create({
                projectId,
                backlogId: id
            }).then(res => {
                if(res) {
                    props.sprintStart()
                }
            })
        }
        
    }

    return (
        <div>

            <Button color="primary" variant="contained" onClick={startSprint} disabled={backlog.length === 0}>
                Start sprint
            </Button>
            {
                stage?
                <UpdateProjectStage description={stage?.description} updateProjectStageCallback={(model: {description: string}) => {
                    if(props.projectId) {
                        BacklogApi.update({ id: props.projectId, description: model.description })
                    }
                }}></UpdateProjectStage> : <div></div>
            }

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