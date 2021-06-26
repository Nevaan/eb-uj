import {FC} from "react";
import {RouteComponentProps} from "react-router-dom";
import TeamDetails from "./TeamDetails";

interface TeamRouteParams {
    teamId: string;
}

interface TeamProps extends RouteComponentProps<TeamRouteParams> {

}

const Team: FC<TeamProps> = (props) => {

    const teamId = Number(props.match.params.teamId);

    return (
        <TeamDetails teamId={teamId}> </TeamDetails>
    )
}

export default Team;
