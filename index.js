const inquirer = require('inquirer');

const questions = [
  {
    type: 'input',
    name: 'textInput',
    message: 'Enter up to three characters:',
    validate: function (input) {
      const length = input.trim().length;
      if (length > 3) {
        return 'Please enter a maximum of three characters.';
      } else if (length === 0) {
        return 'Please enter at least one character.';
      }
      return true;
    },
  },
];

inquirer.prompt(questions).then((answers) => {
  const userInput = answers.textInput.trim();
  console.log('User input:', userInput);
});