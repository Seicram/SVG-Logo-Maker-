// logoGenerator.js

const inquirerUtils = require('./inquirerUtils');
const fileUtils = require('./fileUtils');

// Generate a logo based on user input
function generateLogo() {
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

    // Ask the user if they want to add a shape to the logo
    {
      type: 'list',
      name: 'shape',
      message: 'Select a shape:',
      choices: ['circle', 'triangle', 'square'],
      validate: function (input) {
        return input.trim().length !== 0 || 'Please select a shape.';
      },
    },

    // Ask the user for the shape color
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

    // Ask the user for the text color
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

    // Ask the user for the logo size
    {
      type: 'list',
      name: 'logoSize',
      message: 'Select the logo size:',
      choices: ['Small', 'Medium', 'Large'],
    },
  ];

  // Prompt the user for input
  inquirerUtils.promptQuestions(questions)
    .then((answers) => {
      const userInput = answers.textInput;
      const shape = answers.shape;
      const shapeColor = answers.shapeColor;
      const textColor = answers.textColor;
      const logoSize = answers.logoSize.toLowerCase();

      if (!userInput || !shape || !shapeColor || !textColor || !logoSize) {
        throw new Error('Invalid user input. Please ensure all required fields are filled.');
      }

      // Trim the user input to a maximum of three characters
      const trimmedUserInput = userInput.trim().substring(0, 3);
      const trimmedShapeColor = shapeColor.trim();
      const trimmedTextColor = textColor.trim();

      // Generate the SVG content
      let shapeElement;

      switch (shape) {
        case 'circle':
          shapeElement = `<circle cx="150" cy="100" r="50" fill="${trimmedShapeColor}" />`;
          break;
        case 'triangle':
          shapeElement = `<polygon points="150,50 100,150 200,150" fill="${trimmedShapeColor}" />`;
          break;
        case 'square':
          shapeElement = `<rect x="100" y="50" width="100" height="100" fill="${trimmedShapeColor}" />`;
          break;
        default:
          shapeElement = '';
      }

      // Set the logo width and height based on the user's selection
      let logoWidth, logoHeight;

      switch (logoSize) {
        case 'small':
          logoWidth = 200;
          logoHeight = 150;
          break;
        case 'medium':
          logoWidth = 300;
          logoHeight = 200;
          break;
        case 'large':
          logoWidth = 400;
          logoHeight = 300;
          break;
        default:
          logoWidth = 300;
          logoHeight = 200;
      }

      // Generate the SVG content
      const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${logoWidth}" height="${logoHeight}">
        ${shapeElement}
        <text x="50%" y="50%" fill="${trimmedTextColor}" text-anchor="middle" dominant-baseline="middle">${trimmedUserInput}</text>
      </svg>`;

      fileUtils.writeFile('logo.svg', svgContent)
        .then(() => {
          console.log('Generated logo.svg');
        })
        .catch((err) => {
          console.error('Error generating logo.svg:', err);
        });
    })
    .catch((err) => {
      console.error('Error:', err.message);
    });
}

// Export the generateLogo function
module.exports = {
  generateLogo,
};
