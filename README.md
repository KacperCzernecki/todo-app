# Todo App - Kacper Czernecki

Simple web-app made in React using Vite - it allows you to create, view and manage tasks. Project also serves as a basis for automated testing using the Vitest framework

## 🧩Project description

The app displays a list of tasks, allows you to add new ones, mark them as completet, remove or edit them (CRUD). The project was created in React + Vite enviroment.

## 🛠️ Tools used

The project uses:
**React**
**Vite**
**npm**
**Vitest**
**@testing-library/react**

## 🚀 Startup instructions

Clone the repository

    git clone https://github.com/KacperCzernecki/todo-app.git
    cd todo-app/front

Install dependencies

    npm install

Lunch in dev mode

    npm run dev

Open your browser and go to [localhost](http://localhost:5173/)

## 🧪 Testing instructions

The project includes automated tests based on Vitest.

To run the tests:

runs Vitest in watch mode (continuous testing when changes are made)

    npm run test

or
runs all tests at once

    npm run test:run

The tests are defined in the src/tests/ directory. This makes testing components and application logic easier and more organized.

## 🏗️ Project Structure

```text
.
├── src/
│   ├── components/              # UI components
│   │   ├── AddButton.jsx        # Button for adding new todos
│   │   ├── AddButton.css        # Styles for AddButton component
│   │   ├── Calendar.jsx         # Calendar view component
│   │   ├── Calendar.css         # Styles for Calendar component
│   │   ├── Details.jsx          # Todo details view
│   │   └── Details.css          # Styles for Details component
│   │
│   ├── tests/                   # Automated tests (Vitest)
│   │   ├── App.test.jsx
│   │   ├── Calendar.test.jsx
│   │   └── AddButton.test.jsx
|   |   └── setup.js
│   │
│   ├── App.jsx                  # Root application component
│   ├── App.css                  # Global App styles
│   ├── dateHelpers.js           # Date utility functions
│   ├── index.css                # Global styles
│   └── main.jsx                 # Application entry point
│
├── index.html                   # HTML template
├── package.json                 # Project configuration and scripts
├── package-lock.json            # Locked dependency versions
├── vite.config.js               # Vite configuration
├── eslint.config.js             # ESLint configuration
├── .gitignore                   # Git ignored files
└── README.md                    # Project documentation

```
