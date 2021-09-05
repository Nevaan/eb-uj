# --- !Ups

CREATE TABLE Employee
(
    id      INTEGER PRIMARY KEY AUTOINCREMENT,
    name    text,
    surname text
);

CREATE TABLE _TeamEmployee
(
    team     INTEGER,
    employee INTEGER,
    FOREIGN KEY (team) REFERENCES Team (id),
    FOREIGN KEY (employee) REFERENCES Employee (id),
    UNIQUE (team, employee)
);

# --- !Downs
DROP TABLE Employee;
DROP TABLE _TeamEmployee;