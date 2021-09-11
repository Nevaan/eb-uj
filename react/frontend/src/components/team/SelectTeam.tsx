import { makeStyles } from "@material-ui/core";
import { FC, useEffect, useState } from "react";
import { TeamModel } from "../../api/team/model/TeamModel";
import { TeamApi } from "../../api/team/TeamApi";

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

type SelectTeamProps = {
    onChange: (event: React.ChangeEvent<any>) => void;
    value: any;
    class: string;
    formName: string;
}

const useStyles = makeStyles({
    text: {
        width: '120px',
        lineHeight: '30px',
        height: '30px',
        alignSelf: 'center',
        textAlign: 'left'
    },
    container: {
        display: 'flex',
        flexDirection: 'row'
    }
});

const SelectTeam: FC<SelectTeamProps> = (props) => {
    const classes = useStyles();

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
        <div className={classes.container}>
            <div className={classes.text}>Select team: </div>
            <Select
                id="select-team"
                onChange={props.onChange}
                value={props.value}
                name={props.formName}
                className={props.class}
            >
                <MenuItem value={undefined}>
                    <em>None</em>
                </MenuItem>
                {
                    teams.map(team => (
                        <MenuItem value={team.id}>
                            {team.name}
                        </MenuItem>
                    ))
                }
            </Select>
        </div>
    )
}

export default SelectTeam;