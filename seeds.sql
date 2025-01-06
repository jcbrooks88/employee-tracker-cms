-- Seed departments
INSERT INTO departments (id, name) VALUES
(1, 'Human Resources'),
(2, 'Engineering'),
(3, 'Sales'),
(4, 'Finance');

-- Seed roles
INSERT INTO roles (id, title, salary, department_id) VALUES
(1, 'HR Manager', 75000, 1),
(2, 'Software Engineer', 90000, 2),
(3, 'Sales Representative', 60000, 3),
(4, 'Accountant', 65000, 4);

-- Seed employees
INSERT INTO employees (id, first_name, last_name, role_id, manager_id) VALUES
(1, 'Jeffery', 'Brooks', 1, NULL), -- HR Manager (no manager)
(2, 'Bryan', 'Dicillo', 2, NULL), -- Software Engineer (no manager)
(3, 'Darlene', 'Gore', 3, 1), -- Sales Rep reporting to Renee
(4, 'Brian', 'Jordan', 4, 1); -- Accountant reporting to Renee

