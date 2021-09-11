import { FC, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { GetStory } from "../../api/story/model/GetStory";
import { StoryApi } from "../../api/story/StoryApi";
import TaskList from "../task/TaskList";
import TextField from '@material-ui/core/TextField';
import { Button, makeStyles } from "@material-ui/core";
import { useForm } from "../../util/form/form";
import SelectEmployee from '../employee/SelectEmployee';
import { TimeEntryApi } from "../../api/timeentry/TimeEntryApi";

interface StoryRouteParams {
    storyId: string;
}

interface StoryProps extends RouteComponentProps<StoryRouteParams> {
}

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    containerElement: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width: '80%',
        marginBottom: '15px'
    },
    formRow: {
        marginTop: '10px',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    leftColumn: {
        width: '50%'
    },
    selectEmployee: {
        width: '100%'
    }
});

const Story: FC<StoryProps> = (props) => {
    const classes = useStyles();
    const [story, setStory] = useState<GetStory>();
    const [totalTimeCount, setTotalTimeCount] = useState<number>(0);

    useEffect(() => {
        fetchStory();
        fetchTotalTime();
    }, []);

    const fetchStory = (): void => {
        const storyId = props.match.params.storyId;
        if (storyId) {
            StoryApi.get(+storyId)
                .then(storyResponse => {
                    const { name, description, assigneeId } = storyResponse;
                    setFormValues({name, description, assigneeId});
                    setStory(storyResponse);
                })
                .catch((err: Error) => console.log(err))
        }
    }

    const fetchTotalTime = (): void => {
        const storyId = props.match.params.storyId;
        if (storyId) {
            TimeEntryApi.countForStory(+storyId)
            .then(count => setTotalTimeCount(count.totalCount))
        }
    };

    const { onChange, onSubmit, formValues, setFormValues } = useForm<{name: string, description: string, assigneeId?: number}>(
        {
            name: "",
            description: ""
        },
        updateStoryCallback
    );

    async function updateStoryCallback() {
        const storyId = props.match.params.storyId;
        if (storyId) {
            StoryApi.update(+storyId,{ ...formValues })
                .then( _ =>
                    fetchStory()
                );
        }
    }

    const formChanged = (): boolean => {
        return story?.name === formValues.name && story?.description === formValues.description && story?.assigneeId === formValues.assigneeId;
    }

    return (
        <div>
            {
                story ? (
                    <div className={classes.container}>
                        <form className={classes.containerElement} autoComplete="off" onSubmit={onSubmit}>
                            <div className={classes.formRow}>
                                <TextField
                                    className={classes.leftColumn}
                                    name="name"
                                    label="Story name"
                                    value={formValues.name}
                                    onChange={onChange}
                                    variant="outlined"
                                />
                                <Button type="submit" variant="contained" color="primary"
                                    disabled={formChanged()}
                                >
                                    Save
                                </Button>
                            </div>

                            <div className={classes.formRow}>
                                <TextField
                                    className={classes.leftColumn}
                                    name="description"
                                    label="Description"
                                    multiline
                                    maxRows={4}
                                    value={formValues.description}
                                    onChange={onChange}
                                    variant="outlined"
                                />
                            </div>
                            <div className={classes.formRow}>
                                <div className={classes.leftColumn}>
                                    <SelectEmployee onChange={onChange} value={formValues.assigneeId} class={classes.selectEmployee} teamId={story.teamId} formName="assigneeId"></SelectEmployee>
                                </div>
                            </div>

                        </form>
                        <h2>Total time spent on story: {totalTimeCount} hour(s)</h2>
                        <div  className={classes.containerElement} >
                            <TaskList storyId={story.id} teamId={story.teamId}></TaskList>
                        </div>
                    </div>
                ) : <div>Loading story...</div>
            }

        </div>
    )
}

export default Story;
