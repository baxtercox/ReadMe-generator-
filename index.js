const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "What is the name of your project?",
      message: "Title",
    },
    {
      type: "input",
      name: "description",
      message: "Please enter a description of your project.",
    },
    {
      type: "input",
      name: "installation",
      message:
        "What are the installation instructions for this project. Write NONE if there are no instructions",
    },
    {
      type: "input",
      name: "usage",
      message: "How would you like your application to be used?",
    },
    {
      type: "input",
      name: "contribution",
      message: "Who contributed on this project?",
    },
    {
      type: "input",
      name: "test",
      message: "What are the Text instructions?",
    },
    {
      type: "checkbox",
      message: "Please select a license.",
      choices: ["Apache", "MIT", "ISC", "GNU GPLv3"],
      name: "license",
    },
    {
      type: "input",
      message: "What is your email address?",
      name: "email",
    },
    {
      type: "input",
      message: "What is your github username?",
      name: "username",
    },
  ]);
}

function generateMarkdown(response) {
  return `
    #${response.title}

    # Table of Contents

    -[Description](#description)
    -[Installation](#installation)
    -[Usage](#usage)
    -[Contributing](#contributing)
    -[Test](#test)
    -[License](#license)
    -[Questions](#questions)

    ## Description:
    ![License](https://img.shields.io/badge/License-${response.license}-blue.svg "License Badge")


    ${response.description}
  ## Installation:
  ${response.installation}
  ## usage:
  $ {response.usage}
  ## contributing:
  ${response.contributing}
  ## Test:
  ${response.test}
  ## License:
  for more information about the license please click the link below.
  -[License](https://opensource.org/licenses/${response.license})

  ##questions:
    For more questions about the Generator you cna go to 
    my GitHub page at the followig link:
    - [GitHub Profile](https://github.com/${response.username})

    For additional quesitons feel free to reach out to my email at ${response.email}.
    `;
}
//function to initialize program
async function init() {
  try {
    const response = await promptUser();

    const readMe = generateMarkdown(response);

    await writeFileAsync("README.md", readMe);
    console.log("Success!");
  } catch (err) {
    console.log(err);
  }
}

//function call to initialize program
init();
