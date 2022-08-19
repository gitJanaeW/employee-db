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

const accessDatabase = (section) => {
    switch (section) {
        case 'View Employees':
            viewEmployees();
            // questions();
            break;
        case 'View Roles':
            viewRoles();
            // questions()
            break;
        case 'View Departments':
            viewDepartments();
            // questions();
            break;
        case 'Add Employee':
            inquireAddEmployee();
            // questions();
            break;
        case 'Update Employee Role':
            // FIX BUGS
            inquireUpdateEmployee();
            break;
            // questions();
        case 'Add Role':
            inquireAddRole();
            // questions();
            break;
        case 'Add Department':
            inquireAddDepartment();
            // questions();
            break;
        case 'EXIT':
            console.log('PRESS CTRL+C (OR) COMMAND+C TO QUIT')
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

const inquireAddEmployee = () => {
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
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager) VALUES
    ('${employee.firstName}', '${employee.lastName}', '${employee.role}', '${employee.managerId}')`;
    db.query(sql, (err, row) => {
        console.log('EMPLOYEE ADDED');
        console.table(employee);
    });
}

const inquireUpdateEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'employee',
            message: 'Which id matches the employee you would like to update?'
        },
        {
            type: 'input',
            name: 'role',
            message: 'Which id matches the position the employee will be filling?'
        }
    ]).then(employeeUpdate => updateEmployee(employeeUpdate))
}

const updateEmployee = (employeeUpdate) => {
    const sql = `UPDATE employee
    SET role_id = '${parseInt(employeeUpdate.role)}
    WHERE id = '${parseInt(employeeUpdate.employee)};`
    db.query(sql, (err, row) => {
        console.log('EMPLOYEE UPDATED');
    });
}

const inquireAddRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What role would you like to add?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of this role?'
        },
        {
            type: 'input',
            name: 'departmentId',
            message: 'Which department ID does this role belong to?'
        }
    ]).then(roleInfo => addRole(roleInfo));
}

const addRole = (roleInfo) => {
    const sql = `INSERT INTO role (title, salary, department_id) 
    VALUES ('${roleInfo.title}',
    '${parseInt(roleInfo.salary)}',
    '${parseInt(roleInfo.departmentId)}');`;
    db.query(sql, (err, row) => {
        console.log('ROLE ADDED');
    });
}

const inquireAddDepartment = () => {
    inquirer.prompt(
        {
            type: 'input',
            name: 'department',
            message: 'What is the name of the new department?'
        }
    ).then(({department}) => addDepartment(department));
};

const addDepartment = (department) => {
    const sql = `INSERT INTO department (name) VALUES ('${department}')`
    db.query(sql, (err, row) => {
        console.log('DEPARTMENT ADDED');
    });
}

// ADD IF THERE'S TIME
// const showSqlSelect = (columnOne, columnTwo, table) => {
//     const sql = `SELECT * FROM ${columnOne}, ${columnTwo} FROM ${table}`;
//     const consoleTable = db.query(sql, (err, rows) => {
//         console.table(rows);
//     });
//     return consoleTable;
// }

questions()
    .then(({action}) => accessDatabase(action));
    // .then(questions);