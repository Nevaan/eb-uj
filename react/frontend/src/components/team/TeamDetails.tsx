import { FC, useEffect, useState } from "react";
import { EmployeeModel } from "../../api/employee/model/EmployeeModel";
import { TeamApi } from "../../api/team/TeamApi";
import EmployeeList from "../employee/EmployeeList";

interface TeamDetailsProps  {
    teamId: number;
    className?: string;
}

const TeamDetails: FC<TeamDetailsProps> = (props: TeamDetailsProps) => {

    const [employees, setEmployees] = useState<EmployeeModel[]>([]);

    useEffect(() => {
        fetchTeamEmployees()
    }, []);

    const fetchTeamEmployees = (): void => {
        TeamApi.getEmployees(props.teamId)
            .then(employees => {
                setEmployees(employees);
            })
            .catch((err: Error) => console.log(err))
    }

    //TODO: fetch employees for team
    return (
        <div className={props.className}>     
            {
                employees.length ? (
                    <EmployeeList employees={employees}></EmployeeList>
                ) :
                <div>
                    No employees in team yet!
                </div>
            }       
        </div>
    )
}

export default TeamDetails;
