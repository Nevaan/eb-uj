import { FC } from "react";
import { Column } from "../table/column";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import AppTableWrapper from "../table/AppTableWrapper";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { GetStoryList } from "../../api/story/model/GetStoryList";

type StoryListProps = {
    stories: GetStoryList[]
}

const columns: Column<'id' | 'name' | 'description' | 'assignee'>[] = [
    { id: 'id', label: 'Id', minWidth: 170 },
    {
        id: 'name',
        label: 'name',
        minWidth: 170,
        align: 'left',
    },
    {
        id: 'description',
        label: 'description',
        minWidth: 170,
        align: 'left',
    },
    {
        id: 'assignee',
        label: 'assignee',
        minWidth: 170,
        align: 'left',
    }
];

const useStyles = makeStyles({
    container: {
        marginLeft: '15px',
        marginRight: '15px',
        marginBottom: '15px'
    }
});

const StoryList: FC<StoryListProps> = (props) => {
    const classes = useStyles();
    const history = useHistory();

    return (
        <div className={classes.container}>
            <h1>Stories: </h1>
            <AppTableWrapper columns={columns}>
                {props.stories.map((story) => {
                    return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={story.id}
                            onClick={() => history.push("/story/" + story.id)}>
                            {columns.map((column) => {
                                const value = story[column.id];
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
        </div>

    )
}

export default StoryList;
