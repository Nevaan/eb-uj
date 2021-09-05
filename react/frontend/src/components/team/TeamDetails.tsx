import { FC, useEffect, useState } from "react";
import { EmployeeApi } from "../../api/employee/EmployeeApi";
import { EmployeeModel } from "../../api/employee/model/EmployeeModel";
import { TeamApi } from "../../api/team/TeamApi";
import EmployeeList from "../employee/EmployeeList";
import AddEmployeeToTeam from './AddEmployeeToTeam';
interface TeamDetailsProps  {
    teamId: number;
    className?: string;
}

const TeamDetails: FC<TeamDetailsProps> = (props: TeamDetailsProps) => {

    const [employees, setEmployees] = useState<EmployeeModel[]>([]);
    const [unassignedEmployees, setUnassignedEmployees] = useState<EmployeeModel[]>([]);

    useEffect(() => {
        fetchTeamEmployees();
        fetchUnassignedEmployees();
    }, []);

    const fetchTeamEmployees = (): void => {
        TeamApi.getEmployees(props.teamId)
            .then(employees => {
                setEmployees(employees);
            })
            .catch((err: Error) => console.log(err))
    }

    const fetchUnassignedEmployees = (): void => {
        EmployeeApi.notAssignedToTeam(props.teamId)
        .then(unassigned => setUnassignedEmployees(unassigned))
        .catch((err: Error) => console.log(err))

    }

    const assignEmployeeCallback = (form: { userId: string }) => {
        TeamApi.addEmployeeToTeam({
            teamId: props.teamId,
            employeeId: +form.userId
        }).then(
            () => { 
                fetchTeamEmployees();
                fetchUnassignedEmployees()
            }
        )
    }

    return (
        <div className={props.className}>
            <AddEmployeeToTeam employees={unassignedEmployees} addEmployeeCallback={assignEmployeeCallback}></AddEmployeeToTeam>     
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
