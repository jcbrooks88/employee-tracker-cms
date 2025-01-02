-- Create new database --
DROP DATABASE IF EXISTS myemployee_db;
CREATE DATABASE myemployee_db;

-- Use myemployee_db --
\c myemployee_db;

-- See database in use --
SELECT current_database();

CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    salary NUMERIC NOT NULL,
    department_id INT REFERENCES departments(id)
);

CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    role_id INT REFERENCES roles(id),
    manager_id INT REFERENCES employees(id)
);