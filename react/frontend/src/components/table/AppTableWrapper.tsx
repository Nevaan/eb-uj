import {FC, PropsWithChildren} from "react";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import {makeStyles} from "@material-ui/core/styles";


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

const Table: FC<{}> = (props) => {

    const classes = useStyles();

    return (
        <div className={classes.root}>

        </div>
    )
}

export default Table;
