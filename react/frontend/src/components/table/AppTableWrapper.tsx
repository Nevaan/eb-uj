import {FC, PropsWithChildren} from "react";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import {makeStyles} from "@material-ui/core/styles";
import {GenericColumn} from "../util/GenericColumn";
import Table from '@material-ui/core/Table';

type TableProps<T = any> = PropsWithChildren<{
    columns: GenericColumn<T>[]
}>

const useStyles = makeStyles({
    root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    paper: {
        width: '75%'
    },
    container: {
        maxHeight: '80%'
    }
});

const Table: FC<TableProps> = (props) => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <TableContainer className={classes.container}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {props.columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{minWidth: column.minWidth}}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.children}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Table;
