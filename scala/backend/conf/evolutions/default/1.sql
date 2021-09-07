# --- !Ups
CREATE TABLE Team
(
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        text,
    description text
);

CREATE TABLE ProjectStage (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    description text,
    projectId integer,
    FOREIGN KEY (projectId) references Project(id)
);

CREATE TABLE Project (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name text not null UNIQUE,
    description text,
    teamId integer,
    sprintId integer,
    backlogId integer,
    FOREIGN KEY (teamId) references Team(id),
    FOREIGN KEY (sprintId) references ProjectStage(id),
    FOREIGN KEY (backlogId) references ProjectStage(id)
)

# --- !Downs
DROP TABLE Team;
DROP TABLE ProjectStage;
DROP TABLE Project;
