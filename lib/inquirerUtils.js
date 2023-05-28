//  handle user input

//  require inquirer
const inquirer = require('inquirer');

//  prompt user with questions
function promptQuestions(questions) {
  return inquirer.prompt(questions);
}

//  exports the promptQuestions function
module.exports = {
  promptQuestions,
};