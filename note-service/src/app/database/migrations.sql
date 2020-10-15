CREATE TABLE IF NOT EXISTS notes
(
    id      INT PRIMARY KEY AUTO_INCREMENT,
    category_id INT NOT NULL,
    title   VARCHAR(250) NOT NULL,
    note    TEXT         NOT NULL,
    created_at    VARCHAR(30)  NOT NULL,
    updated_at    VARCHAR(30)  NOT NULL
);

CREATE TABLE IF NOT EXISTS categories
(
    id      INT PRIMARY KEY AUTO_INCREMENT,
    name   VARCHAR(250) NOT NULL,
    created_at    VARCHAR(30)  NOT NULL,
    updated_at    VARCHAR(30)  NOT NULL
);