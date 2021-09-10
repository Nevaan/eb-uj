import { FC, useState, CSSProperties, useEffect } from "react";
import { Column } from "../table/column";
import { useHistory } from "react-router-dom";
import { TeamModel } from "../../api/team/model/TeamModel";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import AppTableWrapper from "../table/AppTableWrapper";
import { TeamApi } from "../../api/team/TeamApi";
import AddTeam from './AddTeam';

const styles = {
    listContainer: {
        marginTop: '10px',
        display: 'flex',
        flexDirection: 'column',
        width: "80%",
        margin: 'auto'
    } as CSSProperties
};

type TeamListProps = {}

const columns: Column<'id' | 'name' | 'description'>[] = [
    { id: 'id', label: 'Id', minWidth: 170 },
    {
        id: 'name',
        label: 'name',
        minWidth: 170,
        align: 'left',
    },
    {
        id: 'description',
        label: 'description',
        minWidth: 170,
        align: 'right',
    }
];

const TeamList: FC<TeamListProps> = () => {

    const history = useHistory();

    const [teams, setTeams] = useState<TeamModel[]>([]);

    useEffect(() => {
        fetchTeams()
    }, []);

    const fetchTeams = (): void => {
        TeamApi.list()
            .then(teamsResponse => setTeams((teamsResponse)))
            .catch((err: Error) => console.log(err))
    }

    return (
        <div style={styles.listContainer}>
            <h1>Teams: </h1>
            <div>
                {
                    teams.length ?
                        (
                            <AppTableWrapper columns={columns}>
                                {teams.map((team) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={team.id}
                                            onClick={() => history.push("/team/" + team.id)}>
                                            {columns.map((column) => {
                                                const value = team[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                            </AppTableWrapper>
                        ) :
                        <div>
                            No teams added yet
                        </div>
                }
                <AddTeam success={fetchTeams} ></AddTeam>
            </div>
        </div>

    )
}

export default TeamList;
