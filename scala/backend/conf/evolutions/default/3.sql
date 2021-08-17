# --- !Ups
CREATE TABLE Team
(
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        text,
    description text
);

CREATE TABLE Employee
(
    id      INTEGER PRIMARY KEY AUTOINCREMENT,
    name    text,
    surname text
);

CREATE TABLE Role
(
    id   INTEGER PRIMARY KEY AUTOINCREMENT,
    name text UNIQUE
);

CREATE TABLE _TeamEmployee
(
    team     INTEGER,
    employee INTEGER,
    role Integer,
    FOREIGN KEY (team) REFERENCES Team (id),
    FOREIGN KEY (employee) REFERENCES Employee (id),
    FOREIGN KEY (role) REFERENCES Role (id),
    UNIQUE (team, employee)
);

INSERT INTO Role (name)
VALUES ('Manager'),
        ('Developer'),
        ('Designer');


# --- !Downs
DROP TABLE Team;
DROP TABLE Employee;
DROP TABLE Role;
DROP TABLE _TeamEmployee;