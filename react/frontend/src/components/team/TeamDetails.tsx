import { FC } from "react";
import EmployeeList from "../employee/EmployeeList";

interface TeamDetailsProps  {
    teamId: number;
    className?: string;
}

const TeamDetails: FC<TeamDetailsProps> = (props: TeamDetailsProps) => {

    //TODO: fetch employees for team
    return (
        <div className={props.className}>            
            <EmployeeList employees={[]}></EmployeeList>
        </div>
    )
}

export default TeamDetails;
