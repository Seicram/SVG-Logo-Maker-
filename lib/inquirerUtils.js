//  handle user input

const inquirer = require('inquirer');

function promptQuestions(questions) {
  return inquirer.prompt(questions);
}

module.exports = {
  promptQuestions,
};