import { ChangeEvent, FC, useEffect, useState } from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';
import ProjectTab from "./ProjectTab";
import Sprint from "../sprint/Sprint";
import Backlog from "../backlog/Backlog";
import TeamDetails from "../team/TeamDetails";
import { ProjectApi } from "../../api/project/ProjectApi";
import { ProjectModel } from "../../api/project/model/ProjectModel";
import { useForm } from "../../util/form/form";
import TextField from '@material-ui/core/TextField';
import { Button } from "@material-ui/core";

interface ProjectRouteParams {
    projectId: string;
}

interface ProjectProps extends RouteComponentProps<ProjectRouteParams> {
}

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        width: '80%'
    },
    form: {
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
    button: {
        justifySelf: 'flex-end',
        height: '40px',
        width: '75px'
    }
});

const Project: FC<ProjectProps> = (props) => {
    const classes = useStyles();
    const [tabIdx, setTabIdx] = useState(0);
    const [project, setProject] = useState<ProjectModel>();

    const history = useHistory();

    useEffect(() => {
        fetchProjectById()
    }, []);

    const fetchProjectById = (): void => {
        ProjectApi.get(+props.match.params.projectId)
            .then(projectResponse => {
                setProject((projectResponse));
                const { name, description } = projectResponse
                setFormValues({ name, description })
                setTabIdx(0)
            })
            .catch((err: Error) => console.log(err))
    }

    const handleTabChange = (event: ChangeEvent<{}>, newValue: number) => {
        setTabIdx(newValue);
    };

    const { onChange, onSubmit, formValues, setFormValues } = useForm<Omit<ProjectModel, 'id' | 'teamId'>>(
        {
            name: "",
            description: ""
        },
        updateProjectCallback
    );

    async function updateProjectCallback() {
        if (project) {
            const { id } = project;
            ProjectApi.update({
                ...formValues,
                id
            })
                .then((result) =>
                    setProject(result)
                );
        }
    }

    const deleteProject = () => {
        if (project) {
            ProjectApi.remove(project.id)
                .then(() => {
                    history.push("/project")
                })
        }
    }

    const formChanged = (): boolean => {
        return project?.name === formValues.name && project?.description === formValues.description;
    }

    return (
        <div>
            {
                project ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <form className={classes.form} autoComplete="off" onSubmit={onSubmit}>
                            <div className={classes.formRow}>
                                <TextField
                                    className={classes.leftColumn}
                                    name="name"
                                    label="Project name"
                                    value={formValues.name}
                                    onChange={onChange}
                                    variant="outlined"
                                />
                                <Button type="submit" variant="contained" color="primary" className={classes.button}
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

                                <Button variant="contained" color="secondary" className={classes.button} onClick={deleteProject} >
                                    Delete
                    </Button>
                            </div>

                        </form>

                        <Paper className={classes.root}>
                            <Tabs
                                value={tabIdx}
                                onChange={handleTabChange}
                                indicatorColor="primary"
                                textColor="primary"
                                centered
                            >
                                <Tab label="Sprint" />
                                <Tab label="Backlog" />
                                <Tab label="Team" />
                            </Tabs>
                            <ProjectTab value={tabIdx} index={0}>
                                <Sprint id={project.sprintId} projectId={project.id} completed={fetchProjectById}></Sprint>
                            </ProjectTab>
                            <ProjectTab value={tabIdx} index={1}>
                                <Backlog id={project.backlogId} projectId={project.id} sprintStart={() => { 
                                    fetchProjectById();
                                }}></Backlog>
                            </ProjectTab>
                            <ProjectTab value={tabIdx} index={2}>
                                <TeamDetails teamId={project.teamId} allowAdding={false}></TeamDetails>
                            </ProjectTab>
                        </Paper>
                    </div>
                ) : (
                    <div>
                        Loading project
                    </div>
                )
            }
        </div>

    )
}

export default Project;
