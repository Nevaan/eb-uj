# --- !Ups

CREATE TABLE Story
(
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        text,
    description text,
    stageId     integer,
    assigneeId  integer,
    FOREIGN KEY (stageId) references ProjectStage (id),
    FOREIGN KEY (assigneeId) references Employee (id)
);

# --- !Downs
DROP TABLE Story;