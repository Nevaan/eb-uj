import {FC, useState} from "react";
import {Column} from "../table/column";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import AppTableWrapper from "../table/AppTableWrapper";
import {useHistory} from "react-router-dom";
import {StoryModel} from "../../api/story/model/StoryModel";

type StoryListProps = {}

const columns: Column<'id' | 'description'>[] = [
    {id: 'id', label: 'Id', minWidth: 170},
    {
        id: 'description',
        label: 'description',
        minWidth: 170,
        align: 'left',
    }
];

const StoryList: FC<StoryListProps> = () => {
    const history = useHistory();

    //TODO: real data
    const [stories, setStories] = useState<StoryModel[]>([
        {
            id: 1,
            description: "story1"
        },
        {
            id: 2,
            description: "story2"
        }
    ]);
    return (
            <AppTableWrapper columns={columns}>
                {stories.map((story) => {
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
    )
}

export default StoryList;
