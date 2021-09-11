import { FC, useEffect, useState } from "react";
import { CommentApi } from "../../api/comment/CommentApi";
import { GetCommentModel } from "../../api/comment/model/GetCommentModel";
import {Column} from "../table/column";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import AppTableWrapper from "../table/AppTableWrapper";
import AddComment from './AddComment';

type CommentListProps = {
    taskId: number
}

const columns: Column<'id' | 'content' | 'author'>[] = [
    {id: 'id', label: 'Id', minWidth: 170},
    {
        id: 'content',
        label: 'content',
        minWidth: 170,
        align: 'left',
    },
    {
        id: 'author',
        label: 'author',
        minWidth: 170,
        align: 'left',
    }
];

const CommentList: FC<CommentListProps> = (props) => {

    const [comments, setComments] = useState<GetCommentModel[]>([]);

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = (): void => {
        if (props.taskId) {
            CommentApi.getByTaskId(props.taskId)
                .then(commentsResponse => setComments((commentsResponse)))
                .catch((err: Error) => console.log(err))
        }
    }

    return (
        <div>
        <h1>Comments: </h1>
    <AppTableWrapper columns={columns}>
            {comments.map((comment) => {
                return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={comment.id}>
                        {columns.map((column) => {
                            const value = comment[column.id];
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
        <AddComment success={fetchComments} taskId={props.taskId}></AddComment>
    </div>
    )
}

export default CommentList;