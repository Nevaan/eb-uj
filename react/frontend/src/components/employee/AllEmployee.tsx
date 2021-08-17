import { CSSProperties, FC, useEffect, useState } from "react";

import { useHistory } from 'react-router-dom';
import { EmployeeApi } from "../../api/employee/EmployeeApi";
import { EmployeeModel } from "../../api/employee/model/EmployeeModel";
import EmployeeList from './EmployeeList';
import AddEmployee from './AddEmployee';

type AllEmployeeProps = {}

const styles = {
    listContainer: {
        marginTop: '10px',
        display: 'flex',
        flexDirection: 'column',
        width: "80%",
        margin: 'auto'
    } as CSSProperties
};

const AllEmployee: FC<AllEmployeeProps> = () => {

    const history = useHistory();

    const [employees, setEmployees] = useState<EmployeeModel[]>([]);

    useEffect(() => {
        fetchEmployees()
    }, []);

    const fetchEmployees = (): void => {
        EmployeeApi.list()
            .then(employees => setEmployees((employees)))
            .catch((err: Error) => console.log(err))
    }

    return (
        <div style={styles.listContainer}>
        <div>
            {
                employees.length ?
                    (
                        <EmployeeList employees={employees}></EmployeeList>
                    ) :
                    <div>
                        No employees added yet
                    </div>
            }
            <AddEmployee success={fetchEmployees} ></AddEmployee>
        </div>
    </div>
    )
}

export default AllEmployee;