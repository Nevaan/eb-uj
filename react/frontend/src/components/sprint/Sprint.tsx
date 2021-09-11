import { FC, useEffect, useState } from "react";
import { StoryModel } from "../../api/story/model/StoryModel";
import { StoryApi } from "../../api/story/StoryApi";
import StoryList from "../story/StoryList";
import { Button, makeStyles } from "@material-ui/core";
import { SprintApi } from "../../api/sprint/SprintApi";
import UpdateProjectStage from "../stage/UpdateProjectStage";
import { ProjectStage } from "../../api/stage/model/ProjectStage";

type SprintProps = {
    id: number | undefined;
    projectId: number | undefined;
    completed: () => void;
}

const useStyles = makeStyles({
    completeButton: {
        marginTop: '15px'
    },
    updateForm: {
        marginTop: '15px',
        marginLeft: '15px',
        marginRight: '15px'
    }
});

const Sprint: FC<SprintProps> = (props) => {
    const classes = useStyles();
    const [sprint, setSprint] = useState<StoryModel[]>([]);
    const [stage, setStage] = useState<ProjectStage>();

    useEffect(() => {
        fetchSprint()
        fetchStage()
    }, []);

    const fetchSprint = (): void => {
        if (props.id) {
            StoryApi.getByStageId(props.id)
                .then(stories => setSprint((stories)))
                .catch((err: Error) => console.log(err))
        }
    }

    const completeSprint = (): void => {
        if (props.projectId) {
            SprintApi.complete(props.projectId).then(_ => {
                props.completed()
            })
        }
    }

    const fetchStage = () => {
        if (props.projectId) {
            SprintApi.get(props.projectId)
                .then(result => setStage(result))
        }
    }

    const updateStageIfExists = stage ? 
    <div className={classes.updateForm}>
        <UpdateProjectStage description={stage?.description} updateProjectStageCallback={(model: { description: string }) => {
        if (props.projectId) {
            SprintApi.update({ id: props.projectId, description: model.description })
        }
        }}></UpdateProjectStage>
    </div> : <div></div>;

    return (
        <div>
            {
                props.id ? (
                    <div>
                        <Button className={classes.completeButton} color="primary" variant="contained" onClick={completeSprint}>
                            Complete sprint
                        </Button>
                        {
                            updateStageIfExists
                        }
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
