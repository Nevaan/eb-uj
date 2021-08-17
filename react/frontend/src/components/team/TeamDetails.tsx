import { FC } from "react";
import EmployeeList from "../employee/EmployeeList";

type TeamDetailsProps = {
    teamId: number
}

const TeamDetails: FC<TeamDetailsProps> = (props) => {
    return (
        <div>
            TeamDetails {props.teamId}!
            <EmployeeList></EmployeeList>
        </div>
    )
}

export default TeamDetails;
