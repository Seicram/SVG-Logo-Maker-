// import inquirer module 
const inquirer = require('inquirer');

// questions for user to input text
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
  // prompt user to select a shape
  {
    type: 'list',
    name: 'shape',
    message: 'Select a shape:',
    choices: ['circle', 'triangle', 'square'],
  },
  // prompt user to select a shape color
  {
    type: 'input',
    name: 'shapeColor',
    message: 'Enter the shape color (color keyword or hexadecimal number):',
    validate: function (input) {
      // Regular expression to match valid color keywords or hexadecimal numbers
      const colorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$|^(?:(?:rgb|hsl)a?\([-+]?[0-9]*\.?[0-9]+(?:[eE][-+]?[0-9]+)?%?(?:,[-+]?[0-9]*\.?[0-9]+(?:[eE][-+]?[0-9]+)?%?){2,3}\)|[a-z]+)$/i;
      if (!colorRegex.test(input)) {
        return 'Please enter a valid color keyword or hexadecimal number.';
      }
      return true;
    },
  },
  // prompt user to select a text color
  {
    type: 'input',
    name: 'textColor',
    message: 'Enter the text color (color keyword or hexadecimal number):',
    validate: function (input) {
      // Regular expression to match valid color keywords or hexadecimal numbers
      const colorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$|^(?:(?:rgb|hsl)a?\([-+]?[0-9]*\.?[0-9]+(?:[eE][-+]?[0-9]+)?%?(?:,[-+]?[0-9]*\.?[0-9]+(?:[eE][-+]?[0-9]+)?%?){2,3}\)|[a-z]+)$/i;
      if (!colorRegex.test(input)) {
        return 'Please enter a valid color keyword or hexadecimal number.';
      }
      return true;
    },
  },
];

  
// prompt user for input and log it to the console when done 
inquirer.prompt(questions).then((answers) => {
    const userInput = answers.textInput.trim();
    const textColor = answers.textColor.trim();
    console.log('User input:', userInput);
    console.log('Text color:', textColor);
  });