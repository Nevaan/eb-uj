import { CSSProperties, FC, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { CreateStory } from "../../api/story/model/CreateStory";
import { StoryApi } from "../../api/story/StoryApi";
import { Button } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import { useForm } from "../../util/form/form";
import Modal from '@material-ui/core/Modal';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

type AddStoryProps = {
    stageId: number;
    success: () => void;
}

const styles = {
    add: {
        marginTop: '15px',
        alignSelf: "flex-end",
        marginBottom: '15px',
        marginRight: '15px'
    } as CSSProperties
};

const useStyles = makeStyles({
    wrapper: {
        display: 'flex',
        flexDirection: 'column'
    },
    container: {
        position: 'absolute',
        display: 'flex',
        width: '100%',
        top: '30%',
    },
    paper: {
        width: '40%',
        border: '2px solid #000',
        margin: 'auto',
        backgroundColor: 'white'
    },
    title: {
        textAlign: 'center'
    },
    buttons: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    button: {
        margin: '15px'
    },
    form: {
        display: 'flex',
        flexDirection: 'column'
    },
    formElement: {
        marginLeft: '15px',
        marginRight: '15px',
        marginBottom: '15px'
    }
});

const AddStory: FC<AddStoryProps> = (props) => {

    const classes = useStyles();
    const [addingStory, setAddingStory] = useState<boolean>(false);

    const initialState = {
        name: "",
        description: "",
    };

    const { onChange, onSubmit, formValues, setFormValues } = useForm<CreateStory>(
        initialState,
        createEmployeeCallback
    );

    async function createEmployeeCallback() {
        const { stageId } = props;
        StoryApi
            .create({ ...formValues, stageId })
            .then(() => {
                setAddingStory(false);
                props.success();
                setFormValues(initialState);
            });
    }

    return (
        <div className={classes.wrapper}>
            <Modal
                open={addingStory}
            >
                <div className={classes.container}>
                    <div className={classes.paper}>
                        <h2 className={classes.title}>Add Story</h2>

                        <form className={classes.form} autoComplete="off"
                            onSubmit={onSubmit}
                        >
                            <TextField
                                className={classes.formElement}
                                label="Story name"
                                name="name"
                                variant="outlined"
                                size="small"
                                onChange={onChange}
                            />
                            <TextField
                                className={classes.formElement}
                                label="Description"
                                variant="outlined"
                                size="small"
                                onChange={onChange}
                                name="description"
                            />

                            <div className={classes.buttons}>
                                <Button variant="contained" color="secondary" className={classes.button}
                                    onClick={() => setAddingStory(false)}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" variant="contained" color="primary" className={classes.button}>
                                    Create
                        </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
            <Fab color="primary" aria-label="add" style={styles.add} onClick={() => setAddingStory(true)}>
                <AddIcon />
            </Fab>
        </div>
    )
}

export default AddStory;