# --- !Ups

CREATE TABLE Comment
(
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    content  integer,
    authorId integer,
    FOREIGN KEY (authorId) REFERENCES User (id)
);

CREATE TABLE _CommentTask
(
    comment INTEGER,
    task    INTEGER,
    FOREIGN KEY (comment) REFERENCES Comment (id),
    FOREIGN KEY (task) REFERENCES Task (id)
);

# --- !Downs
DROP TABLE Comment;
DROP TABLE _CommentTask;