// Set-up for the PostgreSQL Connection:
import dotenv from 'dotenv';
dotenv.config(); // Loads environment variables from .env file into process.env

import pkg from 'pg'; // Import 'pg' as a CommonJS module
const { Client } = pkg; // Destructure 'Client' from the default export

const client = new Client({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

client.connect()
    .then(() => console.log('Connected to the database successfully.'))
    .catch(err => console.error('Connection error', err.stack));

// Set Up Inquirer for User Interaction:
import inquirer from 'inquirer';

// Main Menu Function:
const mainMenu = async () => {
    const { action } = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Exit'
            ]
        }
    ]);

    // Switch Statement for Handling User's Choices:
    switch (action) {
        case 'View all departments':
            return viewDepartments();
        case 'View all roles':
            return viewRoles();
        case 'View all employees':
            return viewEmployees();
        case 'Add a department':
            return addDepartment();
        case 'Add a role':
            return addRole();
        case 'Add an employee':
            return addEmployee();
        case 'Update an employee role':
            return updateEmployeeRole();
        case 'Exit':
            client.end();
            console.log('Goodbye!');
            process.exit();
    }
};

mainMenu();

// Create Functions for Each Option:
const viewDepartments = async () => {
    try {
        const res = await client.query('SELECT * FROM departments');
        console.table(res.rows);
    } catch (err) {
        console.error('Error retrieving departments:', err.stack);
    }
    mainMenu();
};

const viewRoles = async () => {
    try {
        const query = `
            SELECT roles.id, roles.title, roles.salary, departments.name AS department
            FROM roles
            JOIN departments ON roles.department_id = departments.id;
        `;
        const res = await client.query(query);
        console.table(res.rows);
    } catch (err) {
        console.error('Error retrieving roles:', err.stack);
    }
    mainMenu();
};

const viewEmployees = async () => {
    try {
        const query = `
            SELECT employees.id, employees.first_name, employees.last_name, roles.title, 
                   roles.salary, departments.name AS department, 
                   CONCAT(manager.first_name, ' ', manager.last_name) AS manager
            FROM employees
            JOIN roles ON employees.role_id = roles.id
            JOIN departments ON roles.department_id = departments.id
            LEFT JOIN employees AS manager ON employees.manager_id = manager.id;
        `;
        const res = await client.query(query);
        console.table(res.rows);
    } catch (err) {
        console.error('Error retrieving employees:', err.stack);
    }
    mainMenu();
};

const addDepartment = async () => {
    try {
        const { name } = await inquirer.prompt([
            { type: 'input', name: 'name', message: 'Enter the department name:' }
        ]);
        await client.query('INSERT INTO departments (name) VALUES ($1)', [name]);
        console.log(`Added department: ${name}`);
    } catch (err) {
        console.error('Error adding department:', err.stack);
    }
    mainMenu();
};

const addRole = async () => {
    try {
        const departments = await client.query('SELECT * FROM departments');
        const { title, salary, department_id } = await inquirer.prompt([
            { type: 'input', name: 'title', message: 'Enter the role title:' },
            { type: 'input', name: 'salary', message: 'Enter the role salary:' },
            {
                type: 'list',
                name: 'department_id',
                message: 'Select the department for this role:',
                choices: departments.rows.map(dept => ({ name: dept.name, value: dept.id }))
            }
        ]);
        await client.query(
            'INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)',
            [title, salary, department_id]
        );
        console.log(`Added role: ${title}`);
    } catch (err) {
        console.error('Error adding role:', err.stack);
    }
    mainMenu();
};

const addEmployee = async () => {
    try {
        const roles = await client.query('SELECT * FROM roles');
        const employees = await client.query('SELECT * FROM employees');
        const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
            { type: 'input', name: 'first_name', message: 'Enter the employee first name:' },
            { type: 'input', name: 'last_name', message: 'Enter the employee last name:' },
            {
                type: 'list',
                name: 'role_id',
                message: 'Select the employee role:',
                choices: roles.rows.map(role => ({ name: role.title, value: role.id }))
            },
            {
                type: 'list',
                name: 'manager_id',
                message: 'Select the employee manager:',
                choices: [
                    { name: 'None', value: null },
                    ...employees.rows.map(emp => ({
                        name: `${emp.first_name} ${emp.last_name}`,
                        value: emp.id
                    }))
                ]
            }
        ]);
        await client.query(
            'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
            [first_name, last_name, role_id, manager_id]
        );
        console.log(`Added employee: ${first_name} ${last_name}`);
    } catch (err) {
        console.error('Error adding employee:', err.stack);
    }
    mainMenu();
};

const updateEmployeeRole = async () => {
    try {
        const employees = await client.query('SELECT * FROM employees');
        const roles = await client.query('SELECT * FROM roles');
        const { employee_id, role_id } = await inquirer.prompt([
            {
                type: 'list',
                name: 'employee_id',
                message: 'Select the employee to update:',
                choices: employees.rows.map(emp => ({
                    name: `${emp.first_name} ${emp.last_name}`,
                    value: emp.id
                }))
            },
            {
                type: 'list',
                name: 'role_id',
                message: 'Select the new role:',
                choices: roles.rows.map(role => ({ name: role.title, value: role.id }))
            }
        ]);
        await client.query('UPDATE employees SET role_id = $1 WHERE id = $2', [role_id, employee_id]);
        console.log('Updated employee role.');
    } catch (err) {
        console.error('Error updating employee role:', err.stack);
    }
    mainMenu();
};