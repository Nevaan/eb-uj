import { FC, useEffect, useState } from "react";
import { StoryApi } from "../../api/story/StoryApi";
import AddStory from "../story/AddStory";
import StoryList from "../story/StoryList";
import { Button, makeStyles } from "@material-ui/core";
import { SprintApi } from "../../api/sprint/SprintApi";
import UpdateProjectStage from "../stage/UpdateProjectStage";
import { ProjectStage } from "../../api/stage/model/ProjectStage";
import { BacklogApi } from "../../api/backlog/BacklogApi";
import { GetStoryList } from "../../api/story/model/GetStoryList";

type BacklogProps = {
    id: number | undefined;
    projectId: number | undefined;
    sprintStart: () => void;
}

const useStyles = makeStyles({
    startSprint: {
        marginTop: '15px'
    },
    updateForm: {
        marginTop: '15px',
        marginLeft: '15px',
        marginRight: '15px'
    }
});

const Backlog: FC<BacklogProps> = (props) => {
    const classes = useStyles();
    const [backlog, setBacklog] = useState<GetStoryList[]>([]);
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

            <Button className={classes.startSprint} color="primary" variant="contained" onClick={startSprint} disabled={backlog.length === 0}>
                Start sprint
            </Button>
            {
                stage?
                <div className={classes.updateForm}>
                    <UpdateProjectStage description={stage?.description} updateProjectStageCallback={(model: {description: string}) => {
                    if(props.projectId) {
                        BacklogApi.update({ id: props.projectId, description: model.description })
                    }
                    }}></UpdateProjectStage> 
                </div>: <div></div>
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