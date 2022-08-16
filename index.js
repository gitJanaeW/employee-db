const inquirer = require('inquirer');
const db = require('./db/connection');

const questions = () => {
    return inquirer.prompt(
        {
            type: 'list',
            name: 'action',
            message: `\n- = = = = = = = = = = = = = = = = = -\n| E M P L O Y E E   D A T A B A S E |\n- = = = = = = = = = = = = = = = = = -\nWhat would you like to do?`,
            choices: [
                'View Employees',
                'View Roles',
                'View Departments',
                'Add Employee',
                'Update Employee Role',
                'Add Role',
                'Add Department',
                'EXIT'
            ]
        }
    )
}

const viewDatabase = (section) => {
    switch (section) {
        case 'View Employees':
            viewEmployees();
            break;
        case 'View Roles':
            viewRoles();
            break;
        case 'View Departments':
        viewDepartments();
        break;
        case 'Add Employee':
            inquireEmployee();
            break;
    }
}

const viewEmployees = () => {
    const sql = `SELECT employee.first_name, employee.last_name,
        role.title AS title, role.salary AS salary,
        department.name AS department, employee.manager
        FROM employee
        LEFT JOIN role ON
        employee.role_id = role.id
        LEFT JOIN department ON
        role.department_id = department.id;`
    db.query(sql, (err, rows) => {
        console.table(rows);
    });
}
const viewRoles = () => {
    const sql = `Select role.title, department.name AS department, role.salary
        FROM role 
        LEFT JOIN department ON
        role.department_id = department.id;`
    db.query(sql, (err, rows) => {
        console.table(rows);
    });
}
const viewDepartments = () => {
    const sql = `SELECT * FROM department;`
    db.query(sql, (err, rows) => {
        console.table(rows);
    });
}

const inquireEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is the first name of the employee?'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'What is the last name of the employee?'
        },
        {
            type: 'input',
            name: 'role',
            message: 'What is the role id of the employee?'
        },
        {
            type: 'confirm',
            name: 'manager',
            message: 'Is the employee a manager?',
            default: false
        }
    ]).then(employeeInfo => inquirerManager(employeeInfo));   
}

const inquirerManager = (employee) => {
    if (employee.manager) {
        inquirer.prompt({
            type: 'input',
            name: 'managerId',
            message: 'What is the id number of their manager?'
        }).then(({managerId}) => addEmployee(parseInt(managerId), employee));
        return;
    }
    addEmployee('NULL', employee);
}

const addEmployee = (managerId, employee) => {
    delete employee.manager;
    employee.managerId = managerId;
    employee.role = parseInt(employee.role);
    console.log(employee);
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager) VALUES
    ('${employee.firstName}', '${employee.lastName}', '${employee.role}', '${employee.managerId}')`;
    db.query(sql, (err, row) => {
        console.log('Employee added.');
        console.table(row);
    });
}

questions()
    .then(({action}) => viewDatabase(action));
    // .then(questions);