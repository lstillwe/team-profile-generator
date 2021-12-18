// Include packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');
//const generateMarkdown = require('./src/generateHtml');

const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern'); 

var team = [];

const roles = ['Engineer', 'Intern'];

// Create an array of questions for the manager user input
const managerQuestions = [
    {
        type: 'input',
        name: 'name',
        message: "Enter the manager's name:",
        validate: function(name) {
            return name != "";
        }
    },
    {
        type: 'input',
        name: 'id',
        message: "Enter the manager's id:",
        validate: function(id) {
            return id != "";
        }
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
        validate: function(office) {
            return office != "";
        }
    },
    {
        type: 'confirm',
        name: 'confirmAddEmployee',
        message: 'Would you like to add more team members?',
        default: false
    },

];

const employeeQuestions = [
    {
        type: 'input',
        name: 'name',
        message: "Enter the employee's name:",
        validate: function(name) {
            return name != "";
        }
    },
    {
        type: 'input',
        name: 'id',
        message: "Enter the employee's id:",
        validate: function(id) {
            return id != "";
        }
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
        validate: nameInput => {
            if (nameInput ) {
                return true;
            } else {
                console.log ("Please enter the employee's github username")
            }
        }
    },
    {
        type: 'input',
        name: 'school',
        message: "Please enter the interns school name:",
        when: (input) => input.role === "Intern",
        validate: nameInput => {
            if (nameInput ) {
                return true;
            } else {
                console.log ("Please enter the employee's school name")
            }
        }
    },
    {
        type: 'confirm',
        name: 'confirmAddEmployee',
        message: 'Would you like to add more team members?',
        default: false
    },
];

const addManager = () => {
    return inquirer.prompt (managerQuestions)
            .then(answers => {
                const  { name, id, email, office } = answers; 
                const manager = new Manager (name, id, email, office);
        
                team.push(manager); 
            })
}

const addEmployee = () => {
    return inquirer.prompt (employeeQuestions)
        .then(answers => {

            var { name, id, email, role, github, school, confirmAddEmployee } = answers; 
            var employee; 

            if (role === "Engineer") {
                employee = new Engineer (name, id, email, github);
            } 
            else if (role === "Intern") {
                employee = new Intern (name, id, email, school);
            }

            team.push(employee); 
            console.log(team);

            if (confirmAddEmployee) {
                addEmployee(); 
            }
        });
}


// write generated html file
/*
const writeToFile = (html) => {
    const filename = "./index.html";

    fs.writeFile(filename, html, function (err) {
        err ? console.log(err) : console.log(filename + " created!")
    });
}
*/

// initialize app
function init() {
    // set up stuff for saving html file

    // first add manager, and then any employees
    addManager()
    .then(addEmployee)
  /*
    .then(team => {
        return generateHTML(team);
    })
    .then(html => {
        return writeToFile(html);
    })
  */
  .catch(err => {
    console.log(err);
  });
}

init();