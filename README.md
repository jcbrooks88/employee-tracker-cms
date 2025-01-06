# Employee Database Management CLI Application
# Description ✍🏾
This project is a command-line application built from scratch to manage a company's employee database. The application uses Node.js, Inquirer, and PostgreSQL to provide a robust and interactive experience for users. The goal is to efficiently handle CRUD (Create, Read, Update, Delete) operations for departments, roles, and employees in a company.
# Table of Contents 🗂️
* Technologies Used 
* Installation
* Usage
* License
* Contributing
* Tests
* Questions
# Technologies Used 📱
* **Node.js**: For running the application and handling logic.
* **Inquirer**: For interactive command-line prompts.
* **PostgreSQL**: For database management and storage.
# Installation ⏬
1.	Clone the repository to your local machine:
2.	Navigate to the project directory:
`cd employee-tracker-cms`
3.	Install the required dependencies:
`npm install`
4.	Install the required packages:
`npm install inquirer pg`
5.	Set up the PostgreSQL database:
    * Create a new PostgreSQL database.
    * Run the provided schema and seed files to initialize the database structure and populate it with sample data.
# Usage
1.	Navigate to the project directory:
`cd employee-tracker-cms`
2.	Invoke the application using Node.js: 
`node index.js`
3.	Follow the interactive prompts provided by Inquirer to perform desired operations, such as viewing or modifying database records.
# Database Structure
The application uses the following tables:
* **`departments`**
  * `id` (Primary Key)
  * `name`
* **`roles`**
  * `id` (Primary Key)
  * `title`
  * `salary`
  * `department_id` (Foreign Key referencing departments)
* **`employees`**
  * `id` (Primary Key)
  * `first_name`
  * `last_name`
  * `role_id` (Foreign Key referencing roles)
  * `manager_id` (Self-referencing Foreign Key)
# Example Walkthrough 🎥
For a demonstration of the application's functionality, please watch this walkthrough video: Walkthrough Video Link.
# Future Enhancements 🔮
* Add functionality to delete departments, roles, and employees.
* Implement validation to prevent invalid input.
* Add the ability to view employees by manager or department.
* Improve error handling and user feedback.
# License
This project is licensed under the terms of the MIT License.
# Contributing 👋🏾
Contributions are welcome! Please follow these steps to contribute:
1.	Fork the repository
2.	Create a new branch for your feature or bugfix
3.	Commit your changes
4.	Push the branch to your fork
5.	Submit a pull request for review
# Tests 📈
To run tests for the application, use the following command:
`npm test`
# Questions ❔
For any questions or feedback, feel free to reach out:
* GitHub: github.com/jcbrooks88
* Email: jcbrooks.tech@gmail.com 
