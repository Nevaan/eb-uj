# --- !Ups

CREATE TABLE TimeEntry
(
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    manHours   integer,
    assigneeId integer,
    FOREIGN KEY (assigneeId) REFERENCES Employee (id)
);

CREATE TABLE _TimeEntrySubtask
(
    subtask   INTEGER,
    timeEntry INTEGER,
    FOREIGN KEY (subtask) REFERENCES Task (id),
    FOREIGN KEY (timeEntry) REFERENCES TimeEntry (id)
);

# --- !Downs
DROP TABLE TimeEntry;
DROP TABLE _TimeEntrySubtask;