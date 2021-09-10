import { FC, useEffect, useState } from "react";
import { TimeEntryModel } from "../../api/timeentry/model/TimeEntryModel";
import { TimeEntryApi } from "../../api/timeentry/TimeEntryApi";
import AddTimeEntry from "./AddTimeEntry";
import AppTableWrapper from "../table/AppTableWrapper";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { Column } from "../table/column";

type TimeEntryListProps = {
    subtaskId: number;
    teamId: number;
}

const columns: Column<'assigneeId' | 'manHours'>[] = [
    { id: 'assigneeId', label: 'assigneeId', minWidth: 170 },
    {
        id: 'manHours',
        label: 'manHours',
        minWidth: 170,
        align: 'left',
    }
];

const TimeEntryList: FC<TimeEntryListProps> = (props) => {

    const [timeEntries, setTimeEntries] = useState<TimeEntryModel[]>([]);

    useEffect(() => {
        fetchTimeEntries();
    }, []);

    const fetchTimeEntries = (): void => {
        if (props.subtaskId) {
            TimeEntryApi.listForSubtask(props.subtaskId)
                .then(subs => setTimeEntries(subs))
        }
    }

    return (
        <div>
            <h1>Time entries: </h1>
            <h2>Total time spent: {timeEntries.map(e => e.manHours).reduce((previous, current) => current+previous, 0)} hour(s)</h2>
            <AppTableWrapper columns={columns}>
                {timeEntries.map((timeEntry) => {
                    return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={timeEntry.id}>
                            {columns.map((column) => {
                                const value = timeEntry[column.id];
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
            <AddTimeEntry teamId={props.teamId} subtaskId={props.subtaskId} success={fetchTimeEntries}></AddTimeEntry>
        </div>
    )
}

export default TimeEntryList;