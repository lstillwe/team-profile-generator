// Include packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');
const generateHtml = require('./src/generateHtml');

const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern'); 

// create Array to hold all of the objects that represent the team
var team = [];
// define roles - other than Manager
const roles = ['Engineer', 'Intern'];

// Create an array of questions for the manager user input
const managerQuestions = [
    {
        type: 'input',
        name: 'name',
        message: "Enter the manager's name:",
        validate: (name) => { return name != "" }
    },
    {
        type: 'input',
        name: 'id',
        message: "Enter the manager's id:",
        validate: (id) => { return  id != "" }
    },
    {
        type: 'input',
        name: 'email',
        message: "Enter the manager's email:",
        validate: function(email)
        {
            // Regex mail check (return true if valid mail)
            return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(email);
        },
    },
    {
        type: 'input',
        name: 'office',
        message: "Enter the manager's office number:",
        validate: (office) => { return office != "" }
    },
    {
        type: 'confirm',
        name: 'confirmAddEmployee',
        message: 'Would you like to add more team members?',
        default: false
    },

];

// Create an array of questions for the Engineer and Intern user input
const employeeQuestions = [
    {
        type: 'input',
        name: 'name',
        message: "Enter the employee's name:",
        validate: (name) => { return name != "" }
    },
    {
        type: 'input',
        name: 'id',
        message: "Enter the employee's id:",
        validate: (id) => { return id != "" }
    },
    {
        type: 'input',
        name: 'email',
        message: "Enter the employee's email:",
        validate: function(email)
        {
            // Regex mail check (return true if valid mail)
            return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(email);
        },
    },
    {
        type: 'list',
        name: 'role',
        message: 'Enter the role of this team member:',
        choices: roles,
    },
    {
        type: 'input',
        name: 'github',
        message: "Please enter the engineers's github username:",
        when: (input) => input.role === "Engineer",
        validate: (github) => { return github != "" }
    },
    {
        type: 'input',
        name: 'school',
        message: "Please enter the interns school name:",
        when: (input) => input.role === "Intern",
        validate: (school) => { return school != "" }
    },
    {
        type: 'confirm',
        name: 'confirmAddEmployee',
        message: 'Would you like to add more team members?',
        default: false
    },
];

// prompt for manager questions and add repsonses to team array
// also call function to add other roles, if desired
const addEmployees = () => {
    return inquirer.prompt (managerQuestions)
        .then(answers => {
            const  { name, id, email, office, confirmAddEmployee} = answers; 
            const manager = new Manager (name, id, email, office);
           
            // save this employee in the team array
            team.push(manager);

            // check to see if we should prompt for more employee questions
            if (confirmAddEmployee) {
                addEmployee(); 
            }
        })
}

// prompt for Engineer or Intern questions and add repsonses to team array
const addEmployee = () => {
    return inquirer.prompt (employeeQuestions)
        .then(answers => {

            var { name, id, email, role, github, school, confirmAddEmployee } = answers; 
            var employee; 

            // create object appropriate for the employee role
            if (role === "Engineer") {
                employee = new Engineer (name, id, email, github);
            } 
            else if (role === "Intern") {
                employee = new Intern (name, id, email, school);
            }

            // save this employee in the team array
            team.push(employee); 

            // check to see if we should prompt for more employee questions
            if (confirmAddEmployee) {
                addEmployee(); 
            }
        });
}


// write generated html file
const writeToFile = (html) => {
    const filename = "./dist/index.html";

    fs.writeFile(filename, html, function (err) {
        err ? console.log(err) : console.log(filename + " created!")
    });
}

// initialize app
function init() {

    // first add employees
    addEmployees()
    .then(() => { return generateHtml(team) })
    // now generate html
    .then(html => { return writeToFile(html) })
    // finally, write to file
    .catch(err => { console.log(err) });
}

init();