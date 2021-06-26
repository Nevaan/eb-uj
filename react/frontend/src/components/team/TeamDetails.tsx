import { FC } from "react";
import UserList from "../user/UserList";

type TeamDetailsProps = {
    teamId: number
}

const TeamDetails: FC<TeamDetailsProps> = (props) => {
    return (
        <div>
            TeamDetails {props.teamId}!
            <UserList></UserList>
        </div>
    )
}

export default TeamDetails;
