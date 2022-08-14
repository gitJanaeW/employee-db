const inquirer = require('inquirer');
const db = require('./db/connection');

const questions = () => {
    return inquirer.prompt(
        {
            type: 'list',
            name: 'action',
            message: `\n- = = = = = = = = = = = = = = = = = -\n| E M P L O Y E E   D A T A B A S E |\n- = = = = = = = = = = = = = = = = = -\nWhat would you like to do?`,
            choices: ['View Employees', 'View Roles', 'View Departments']
        }
    ).then(({action}) => viewDatabase(action));
}

const viewDatabase = (section) => {
    if (section === 'View Employees') {
        // const sql = `SELECT employee.first_name, employee.last_name, role.title AS title, department.name AS department 
        // FROM employee
        // LEFT JOIN role ON
        // role.department_id = employee.role_id
        // LEFT JOIN department ON
        // department.name = employee.role_id;`
        const sql = `SELECT employee.first_name, employee.last_name, role.title AS title
        FROM employee
        LEFT JOIN role ON
        role.department_id = employee.role_id;`
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
    } else {
        const sql = `SELECT * FROM department;`
        db.query(sql, (err, rows) => {
            console.table(rows);
        });
    }

}

questions();