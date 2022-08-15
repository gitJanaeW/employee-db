const inquirer = require('inquirer');
const db = require('./db/connection');

const questions = () => {
    return inquirer.prompt(
        {
            type: 'list',
            name: 'action',
            message: `\n- = = = = = = = = = = = = = = = = = -\n| E M P L O Y E E   D A T A B A S E |\n- = = = = = = = = = = = = = = = = = -\nWhat would you like to do?`,
            choices: ['View Employees', 'View Roles', 'View Departments', 'Add Employee', 'Update Employee Role', 'Add Role', 'Add Department']
        }
    )
}

const viewDatabase = (section) => {
    if (section === 'View Employees') {
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
    } else if (section === 'View Roles') {
        const sql = `Select role.title, department.name AS department, role.salary
        FROM role 
        LEFT JOIN department ON
        role.department_id = department.id;`
        db.query(sql, (err, rows) => {
            console.table(rows);
        });
    } else if (section === 'View Departments') {
        const sql = `SELECT * FROM department;`
        db.query(sql, (err, rows) => {
            console.table(rows);
        });
    } else if (section === 'Add Employee') {
        inquireEmployee();
    }
}

const inquireEmployee = () => {
    console.log('in inquirerEmp')
    inquirer.prompt(
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
            message: 'What is the job title of the employee?'
        },
        {
            type: 'confirm',
            name: 'firstName',
            message: 'Is the employee a manager?',
            default: false
        }
    ).then((employeeInfo) => addEmployee(employeeInfo));
    
}

const addEmployee = (employee) => {
    console.log(employee);
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager) VALUES
    (${firstName}, ${lastName}, ${roleId}, ${manager})`;
    db.query(sql, (err, row) => {
        console.log('Employee added.');
        console.table(row);
    });
}

questions()
    .then(({action}) => viewDatabase(action));