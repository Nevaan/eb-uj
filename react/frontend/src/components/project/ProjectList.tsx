import {FC, useEffect, useState} from "react";
import {ProjectModel} from '../../api/project/model/ProjectModel';
import {ProjectApi} from "../../api/project/ProjectApi";
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import AppTableWrapper from "../table/AppTableWrapper";

import { useHistory } from 'react-router-dom';
import {Column} from "../table/column";

type ProjectListProps = {}

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
            <AppTableWrapper columns={columns}>
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
            </AppTableWrapper>
    )
}

export default ProjectList;