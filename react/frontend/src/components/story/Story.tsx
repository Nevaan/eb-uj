import { FC, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { GetStory } from "../../api/story/model/GetStory";
import { StoryApi } from "../../api/story/StoryApi";
import TaskList from "../task/TaskList";
import TextField from '@material-ui/core/TextField';
import { Button } from "@material-ui/core";
import { useForm } from "../../util/form/form";
import SelectEmployee from '../employee/SelectEmployee';

interface StoryRouteParams {
    storyId: string;
}

interface StoryProps extends RouteComponentProps<StoryRouteParams> {
}

const Story: FC<StoryProps> = (props) => {

    const [story, setStory] = useState<GetStory>();

    useEffect(() => {
        fetchStory();
    }, []);

    const fetchStory = (): void => {
        const storyId = props.match.params.storyId;
        if (storyId) {
            StoryApi.get(+storyId)
                .then(story => {
                    setStory(story);
                    const { name, description, assigneeId } = story;
                    setFormValues({name, description, assigneeId});
                })
                .catch((err: Error) => console.log(err))
        }
    }

    const { onChange, onSubmit, formValues, setFormValues } = useForm<{name: string, description: string, assigneeId?: number}>(
        updateStoryCallback,
        {
            name: "",
            description: ""
        }
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
                    <div>
                        <form autoComplete="off" onSubmit={onSubmit}>
                            <div>
                                <TextField
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

                            <div>
                                <TextField
                                    name="description"
                                    label="Description"
                                    multiline
                                    maxRows={4}
                                    value={formValues.description}
                                    onChange={onChange}
                                    variant="outlined"
                                />
                            <SelectEmployee onChange={onChange} value={formValues.assigneeId} class="" teamId={story.teamId} formName="assigneeId"></SelectEmployee>
                            </div>

                        </form>
                        <TaskList storyId={story.id} teamId={story.teamId}></TaskList>
                    </div>
                ) : <div>Loading story...</div>
            }

        </div>
    )
}

export default Story;
