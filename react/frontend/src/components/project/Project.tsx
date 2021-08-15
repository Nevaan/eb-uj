import {ChangeEvent, FC, useEffect, useState} from "react";
import { RouteComponentProps } from "react-router-dom";

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
});

const Project: FC<ProjectProps> = (props) => {
    const classes = useStyles();
    const [tabIdx, setTabIdx] = useState(0);
    const [project, setProject] = useState<ProjectModel>();

    useEffect(() => {
        fetchProjectById()
    }, []);

    const fetchProjectById = (): void => {
        ProjectApi.get(+props.match.params.projectId)
            .then(project => setProject((project)))
            .catch((err: Error) => console.log(err))
    }

    const handleTabChange = (event: ChangeEvent<{}>, newValue: number) => {
        setTabIdx(newValue);
    };

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <p>Project {project?.id}!</p>
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
                    <Sprint></Sprint>
                </ProjectTab>
                <ProjectTab value={tabIdx} index={1}>
                    <Backlog></Backlog>
                </ProjectTab>
                <ProjectTab value={tabIdx} index={2}>
                    <TeamDetails teamId={1}></TeamDetails>
                </ProjectTab>
            </Paper>
        </div>
    )
}

export default Project;
