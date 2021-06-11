import {FC, useEffect, useState} from "react";
import {Project as ProjectModel} from '../../api/project/model/Project';
import {ProjectApi} from "../../api/project/ProjectApi";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { useHistory } from 'react-router-dom';

type ProjectListProps = {}

interface Column {
    id: 'id' | 'name' | 'description';
    label: string;
    minWidth?: number;
    align?: 'right';
}

const columns: Column[] = [
    { id: 'id', label: 'Id', minWidth: 170 },
    { id: 'name', label: 'Project name', minWidth: 100 },
    {
        id: 'description',
        label: 'description',
        minWidth: 170,
        align: 'right',
    }
];

const useStyles = makeStyles({
    root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    paper: {
        width: '75%'
    },
    container: {
        maxHeight: '80%'
    },
});

const ProjectList: FC<ProjectListProps> = () => {
    const classes = useStyles();
    const history = useHistory();

    const [projects, setProjects] = useState<ProjectModel[]>([]);

    useEffect(() => {
        fetchProjects()
    }, []);

    const fetchProjects = (): void => {
        ProjectApi.list()
            .then(projects => setProjects((projects)))
            .catch((err: Error) => console.log(err))
    }

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {projects.map((project) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={project.id} onClick={() => history.push("/project/" + project.id)}>
                                        {columns.map((column) => {
                                            const value = project[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    { value }
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>

    )
}

export default ProjectList;