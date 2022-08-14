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
        const sql = `SELECT * FROM employee;`
        db.query(sql, (err, rows) => {
            const employeeArr = rows;
            const sansId =  employeeArr.forEach(() => {
                delete employeeArr.department_id;
            });
            console.table(sansId);
        });
    } else if (section === 'View Roles') {
        const sql = `Select role.*, department.name AS department_name 
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