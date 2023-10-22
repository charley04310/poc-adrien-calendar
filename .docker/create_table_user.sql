CREATE TABLE IF NOT EXISTS visiteur (
    id SERIAL NOT NULL PRIMARY KEY, 
    nom TEXT NOT NULL,
    full_date TEXT NOT NULL,
    date TEXT NOT NULL,
    month TEXT NOT NULL,
    day INTEGER NOT NULL,
    year TEXT NOT NULL
);
