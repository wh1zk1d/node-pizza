// Import required packages
const inquirer = require('inquirer')
const chalk = require('chalk')

// Create an alias for console.log() to avoid writing that thing all the time
const log = console.log

// START THE ORDERING PROCESS
// Greet the user
log(chalk.red('🍕 Hi, welcome to Node Pizza!\n👨🏻‍🍳 Please place your order\n'))

// Create the important questions
const questions = [
  {
    type: 'confirm',
    name: 'toBeDelivered',
    message: 'Is this for delivery?',
    default: false,
  },
  {
    type: 'input',
    name: 'phone',
    message: "What's your phone number?",
  },
  {
    type: 'list',
    name: 'size',
    message: 'How hungry are you?',
    choices: ['Large', 'Medium', 'Small'],
    filter: val => val.toLowerCase(),
  },
  {
    type: 'input',
    name: 'quantity',
    message: 'How many do you need?',
    validate: function (value) {
      const valid = !isNaN(parseFloat(value))
      return valid || 'Please enter a number'
    },
    filter: Number,
  },
  {
    type: 'checkbox',
    message: 'Choose yo toppings',
    name: 'toppings',
    choices: [
      new inquirer.Separator('== 🥩 The Meats =='),
      {
        name: 'Pepperoni',
      },
      {
        name: 'Ham',
      },
      {
        name: 'Bacon',
      },
      {
        name: "Nah man i'm vegan",
      },
      new inquirer.Separator('== 🧀 The Cheeeese =='),
      {
        name: 'Mozzarella',
        checked: true,
      },
      {
        name: 'Cheddar',
      },
      {
        name: 'Parmesan',
      },
      {
        name: 'Vegan cheese',
      },
      new inquirer.Separator('== 🌶 The Veggies =='),
      {
        name: 'Tomato',
      },
      {
        name: 'Mushrooms',
      },
      {
        name: 'Pepperoni',
      },
      {
        name: 'Pepper',
      },
      {
        name: 'Eggplant',
      },
      {
        name: 'Spinach',
      },
      new inquirer.Separator('== ✨ Make it fancy =='),
      {
        name: 'Pineapple (choose wisely)',
      },
      {
        name: 'Olives',
      },
      {
        name: 'Extra cheese',
      },
      {
        name: 'Avocado',
      },
    ],
    validate: function (answer) {
      if (answer.length < 1) {
        return 'You must choose at least one topping.'
      }

      return true
    },
  },
  {
    type: 'list',
    name: 'beverage',
    message: 'You also get a free 2L beverage',
    choices: ['Pepsi', '7up', 'Coke', 'Mountain Dew'],
  },
  {
    type: 'input',
    name: 'comments',
    message: 'Any comments on your purchase experience?',
    default: "Nah, i'm fine!",
  },
  {
    type: 'list',
    name: 'freebie',
    message: 'For leaving a comment, you get a freebie',
    choices: ['Cake', 'Fries'],
    when: function (answers) {
      return answers.comments !== "Nah, i'm fine!"
    },
  },
]

// Ask the questions and process the answers
inquirer.prompt(questions).then(answers => {
  log(chalk.green('\nHere is your order receipt:'))
  log(JSON.stringify(answers, null, ' '))
})
