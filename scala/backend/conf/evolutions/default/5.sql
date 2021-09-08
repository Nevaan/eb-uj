# --- !Ups

CREATE TABLE Task
(
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    description text,
    parentId    integer,
    assigneeId  integer,
    storyId integer,
    FOREIGN KEY (parentId) references Task (id),
    FOREIGN KEY (assigneeId) references Employee (id),
    FOREIGN KEY (storyId) references Story (id)
);

# --- !Downs
DROP TABLE Task;