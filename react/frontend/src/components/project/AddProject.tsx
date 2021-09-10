import { CSSProperties, FC, useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Button } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import { useForm } from "../../util/form/form";
import Modal from '@material-ui/core/Modal';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { CreateProject } from "../../api/project/model/CreateProject";
import { ProjectApi } from "../../api/project/ProjectApi";

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { TeamModel } from "../../api/team/model/TeamModel";
import { TeamApi } from "../../api/team/TeamApi";

type AddProjectProps = {
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

const AddProject: FC<AddProjectProps> = (props: AddProjectProps) => {
    const classes = useStyles();
    const [addingProject, setAddingProject] = useState<boolean>(false);
    const [teams, setTeams] = useState<TeamModel[]>([]);
    
    useEffect(() => {
        fetchTeams()
    }, []);

    const initialState = {
        name: "",
        description: "",
        teamId: -1
    };

    const { onChange, onSubmit, formValues, setFormValues } = useForm<CreateProject>(
        initialState,
        createProjectCallback
    );

    async function createProjectCallback() {
        ProjectApi
            .create(formValues)
            .then(() => {
                setAddingProject(false);
                setFormValues(initialState);
                props.success();
            });
    }

    const fetchTeams = (): void => {
        TeamApi.list()
            .then(teamsResponse => setTeams((teamsResponse)))
            .catch((err: Error) => console.log(err))
    }

    return (
        <div className={classes.wrapper}>
            <Modal
                open={addingProject}
            >
                <div className={classes.container}>
                    <div className={classes.paper}>
                        <h2 className={classes.title}>Add project</h2>

                        <form className={classes.form} autoComplete="off"
                            onSubmit={onSubmit}
                        >
                            <TextField
                                className={classes.formElement}
                                label="Project name"
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

                            <Select
                                id="select-team"
                                onChange={onChange}
                                value={formValues.teamId}
                                name="teamId"
                                className={classes.formElement}
                            >
                                {
                                    teams.map(team => (
                                        <MenuItem value={team.id}>
                                            {team.name}
                                        </MenuItem>
                                    ))
                                }
                            </Select>

                            <div className={classes.buttons}>
                                <Button variant="contained" color="secondary" className={classes.button}
                                    onClick={() => setAddingProject(false)}
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
            <Fab color="primary" aria-label="add" style={styles.add} onClick={() => setAddingProject(true)}>
                <AddIcon />
            </Fab>
        </div>

    )
}

export default AddProject;