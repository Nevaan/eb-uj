import { FC, useEffect, useState, CSSProperties } from "react";
import { ProjectModel } from '../../api/project/model/ProjectModel';
import { ProjectApi } from "../../api/project/ProjectApi";
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import AppTableWrapper from "../table/AppTableWrapper";
import Modal from '@material-ui/core/Modal';
import AddProject from './AddProject';
import { Button, makeStyles } from "@material-ui/core";

import { useHistory } from 'react-router-dom';
import { Column } from "../table/column";
import React from "react";
import TextField from '@material-ui/core/TextField';
import { useForm } from "../../util/form/form";

type ProjectListProps = {}

const styles = {
    listContainer: {
        marginTop: '10px',
        display: 'flex',
        flexDirection: 'column',
        width: "80%",
        margin: 'auto'
    } as CSSProperties,
    table: {
        
    } as CSSProperties
};

const useStyles = makeStyles({
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

const columns: Column<'id' | 'name' | 'description'>[] = [
    { id: 'id', label: 'Id', minWidth: 170 },
    { id: 'name', label: 'Project name', minWidth: 100 },
    {
        id: 'description',
        label: 'description',
        minWidth: 170,
        align: 'right',
    }
];

const ProjectList: FC<ProjectListProps> = () => {
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
        <div style={styles.listContainer}>
            <div style={styles.table}>
                {
                    projects.length ?
                        (<AppTableWrapper columns={columns}>
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
                        </AppTableWrapper>)
                        : (
                            <div>
                                No projects added yet
                            </div>
                        )
                }
            </div>
            <AddProject success={fetchProjects} ></AddProject>
            
        </div>

    )
}

export default ProjectList;