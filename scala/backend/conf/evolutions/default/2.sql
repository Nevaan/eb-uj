# --- !Ups
CREATE TABLE User (
    id text PRIMARY KEY ,
    first_name text,
    last_name text,
    full_name text,
    email text,
    avatar_url text
);
CREATE TABLE OAuthUser (
                           provider_id text,
                           provider_key text,
                           access_token text,
                           token_type text,
                           expires_in integer,
                           refresh_token text,
                           params text
);
# --- !Downs
DROP TABLE User;
DROP TABLE OAuthUser;