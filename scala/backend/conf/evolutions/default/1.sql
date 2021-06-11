# --- !Ups
CREATE TABLE Project (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name text not null UNIQUE,
    description text
)

# --- !Downs
DROP TABLE Project;