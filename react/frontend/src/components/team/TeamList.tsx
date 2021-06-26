import {FC, useState} from "react";
import {Column} from "../table/column";
import {useHistory} from "react-router-dom";
import {SubtaskModel} from "../../api/subtask/model/SubtaskModel";
import {TeamModel} from "../../api/team/model/TeamModel";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import AppTableWrapper from "../table/AppTableWrapper";

type TeamListProps = {}

const columns: Column<'id' | 'name'>[] = [
    {id: 'id', label: 'Id', minWidth: 170},
    {
        id: 'name',
        label: 'name',
        minWidth: 170,
        align: 'left',
    }
];

const TeamList: FC<TeamListProps> = () => {

    const history = useHistory();

    //TODO: real data
    const [teams, setTeams] = useState<TeamModel[]>([
        {
            id: 1,
            name: "team1"
        },
        {
            id: 2,
            name: "team2"
        }
    ]);

    return (
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
    )
}

export default TeamList;
