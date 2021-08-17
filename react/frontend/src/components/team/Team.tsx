import {FC, useEffect, useState} from "react";
import TeamDetails from "./TeamDetails";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { TeamApi } from "../../api/team/TeamApi";
import { useForm } from "../../util/form/form";
import { TeamModel } from "../../api/team/model/TeamModel";
import TextField from '@material-ui/core/TextField';
import { Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

interface TeamRouteParams {
    teamId: string;
}

interface TeamProps extends RouteComponentProps<TeamRouteParams> {}

const useStyles = makeStyles({
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
    },
    details: {
        width: '80%'
    }
});

const Team: FC<TeamProps> = (props) => {
    const classes = useStyles();
    const teamId = Number(props.match.params.teamId);
    const history = useHistory();
    const [team, setTeam] = useState<TeamModel>();

    useEffect(() => {
        fetchTeamById()
    }, []);

    const fetchTeamById = (): void => {
        TeamApi.get(teamId)
            .then(team => {
                setTeam((team));
                const { name, description } = team;
                setFormValues({ name, description })
            })
            .catch((err: Error) => console.log(err))
    }

    const { onChange, onSubmit, formValues, setFormValues } = useForm<Omit<TeamModel, 'id'>>(
        updateTeamCallback,
        {
            name: "",
            description: ""
        }
    );

    async function updateTeamCallback() {
        if (team) {
            const { id } = team;
            TeamApi.update({
                ...formValues,
                id
            })
                .then((result) =>
                    setTeam(result)
                );
        }
    }

    const deleteTeam = () => {
        if(team) {
            TeamApi.remove(team.id)
            .then(() => {
                history.push("/team")
            })
        }
    }

    const formChanged = (): boolean  => {
        return team?.name === formValues.name && team?.description === formValues.description;
    }

    return (
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

                    <Button  variant="contained" color="secondary" className={classes.button} onClick={deleteTeam} >
                        Delete
                    </Button>
                </div>

            </form>

            <TeamDetails className={classes.details} teamId={teamId}> </TeamDetails>
        </div>
    )
}

export default Team;
