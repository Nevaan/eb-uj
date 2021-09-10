import { FC, CSSProperties, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { CommentApi } from "../../api/comment/CommentApi";
import { Button } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { useForm } from "../../util/form/form";

type AddCommentProps = {
    taskId: number;
    success: () => void;
}

const styles = {
    add: {
        marginTop: '15px',
        alignSelf: "flex-end"
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

const AddComment: FC<AddCommentProps> = (props) => {

    const classes = useStyles();
    const [addingComment, setAddingComment] = useState<boolean>(false);

    const initialState = {
        content: ""
    };


    const { onChange, onSubmit, formValues, setFormValues } = useForm<{content: string}>(
        initialState,
        createSubtaskCallback
    );

    async function createSubtaskCallback() {
        CommentApi
            .create({ ...formValues, taskId: props.taskId } )
            .then(() => {
                setAddingComment(false);
                setFormValues(initialState);
                props.success();
            });
    }

    return (
        <div className={classes.wrapper}>
        <Modal
            open={addingComment}
        >
            <div className={classes.container}>
                <div className={classes.paper}>
                    <h2 className={classes.title}>Add comment</h2>

                    <form className={classes.form} autoComplete="off"
                        onSubmit={onSubmit}
                    >
                        <TextField
                            className={classes.formElement}
                            label="Content"
                            variant="outlined"
                            size="small"
                            onChange={onChange}
                            name="content"
                        />

                        <div className={classes.buttons}>
                            <Button variant="contained" color="secondary" className={classes.button}
                                onClick={() => setAddingComment(false)}
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
        <Fab color="primary" aria-label="add" style={styles.add} onClick={() => setAddingComment(true)}>
            <AddIcon />
        </Fab>
    </div>
    )
}

export default AddComment;