import {FC, useState} from "react";
import {Column} from "../table/column";
import {useHistory} from "react-router-dom";
import {TeamModel} from "../../api/team/model/TeamModel";
import User from "./User";
import {UserModel} from "../../api/user/model/UserModel";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import AppTableWrapper from "../table/AppTableWrapper";

type UserListProps = {}

const columns: Column<'id' | 'name'>[] = [
    {id: 'id', label: 'Id', minWidth: 170},
    {
        id: 'name',
        label: 'name',
        minWidth: 170,
        align: 'left',
    }
];

const UserList: FC<UserListProps> = () => {

    const history = useHistory();

    //TODO: real data
    const [users, setUsers] = useState<UserModel[]>([
        {
            id: 1,
            name: "user1"
        },
        {
            id: 2,
            name: "user2"
        }
    ]);

    return (
        <AppTableWrapper columns={columns}>
            {users.map((user) => {
                return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={user.id}
                              onClick={() => history.push("/user/" + user.id)}>
                        {columns.map((column) => {
                            const value = user[column.id];
                            return (
                                <TableCell key={column.id} align={column.align}>
                                    {value}
                                </TableCell>
                            );
                        })}
                    </TableRow>
                );
            })}
        </AppTableWrapper>
    )
}

export default UserList;
