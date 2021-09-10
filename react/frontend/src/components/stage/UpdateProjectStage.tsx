import { FC } from "react";
import { useForm } from "../../util/form/form";
import TextField from '@material-ui/core/TextField';
import { Button } from "@material-ui/core";

type UpdateProjectStageProps = {
    description: string | undefined,
    updateProjectStageCallback: (formValues: {description: string}) => void;
}

const UpdateProjectStage: FC<UpdateProjectStageProps> = (props) => {
    
    const callback = () => {
        props.updateProjectStageCallback(formValues)
    }
    
    const { onChange, onSubmit, formValues } = useForm<{description: string}>(
        {
            description: (props.description ? props.description : "")
        },
        callback
    );

    const formChanged = (): boolean => {
        return props.description === formValues.description;
    }


    return (
        <div>
            <form autoComplete="off" onSubmit={onSubmit}>
            <div>
                                <TextField
                                    name="description"
                                    label="Description"
                                    value={formValues.description}
                                    onChange={onChange}
                                    variant="outlined"
                                />
                                <Button type="submit" variant="contained" color="primary"
                                    disabled={formChanged()}
                                >
                                    Save
                                </Button>
                            </div>
            </form>
        </div>
    )
}

export default UpdateProjectStage;