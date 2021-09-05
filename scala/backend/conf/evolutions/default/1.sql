# --- !Ups
CREATE TABLE Team
(
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        text,
    description text
);

CREATE TABLE Project (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name text not null UNIQUE,
    description text,
    teamId integer,
    FOREIGN KEY (teamId) references Team(id)
)

# --- !Downs
DROP TABLE Team;
DROP TABLE Project;