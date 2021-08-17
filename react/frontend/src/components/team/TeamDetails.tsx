import { FC } from "react";
import EmployeeList from "../employee/EmployeeList";

interface TeamDetailsProps  {
    teamId: number;
    className?: string;
}

const TeamDetails: FC<TeamDetailsProps> = (props: TeamDetailsProps) => {
    return (
        <div className={props.className}>            
            <EmployeeList></EmployeeList>
        </div>
    )
}

export default TeamDetails;
