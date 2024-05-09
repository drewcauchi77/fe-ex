## Project Overview

This project allows the end-user to create a project and connect the video camera. Whilst the feed is running, specific frames can be taken. The feed can then be stopped and the frames taken can be analysed, deleting the ones that are deemed useless or mistakenly taken. The user can also created 1 or more tags to each frame. The user can also go back to previous projects, open and delete them.

## Technologies/Dependencies Used

- Vue3
- Vue Router
- Typescript
- Pinia for our state management system
- Cypress for e2e testing
- Quasar for component building and styling
- Prettier for code formatting
- EsLint for error discovery
- Vite for project building tooling

## Setup and Installation

1. Extract the zip file provided
2. Navigate to the extracted folder, now the project directory
3. Run `npm install` to install all the related dependencies of the project
4. Server the application by running `npm run dev`
5. This will run the application locally

## Project Structure

- `/cypress`: Contains all the e2e testing to simulate a running project from start to finish mainly project creation and previous project handling
- `/public`: Includes all the assets that we need for the project like images, icons and fonts
- `/src`: All the logic of our application is here
- `/src/assets`: Styling for the application together with Quasar configuration is placed here
- `/src/components`: All the components are in Vue3, split in different folders according for re-usability - most of the logic is here
- `/src/components/__tests__`: Cypress component/unit tests are located here
- `/src/definitions`: All the interfaces we require to strongly type our projects (usually also a types.ts file is included)
- `/src/router`: All the routes created through Vue Router for our project, each path is a view located in `/src/views`
- `/src/stores`: Our Pinia stores, we only need project store for our current application
- `/src/views`: All the pages called as routes - components are imported on the pages as needed and minimal logic is included here
- `/src/App.vue`: Holds the template of our views - the root of our application
- `/src/main.ts`: Responsible to setup all our plugins and to initialise the root component
- `/index.html`: Our application entry point

## Features and Functionality

To Do

## Testing

Run the following command to execute tests:

```sh
npm run test:e2e:dev
```

## Deployment

To build the project for production:

```sh
npm run build
```

Deploy the contents of the `/dist` folder to your server.

## Contact Information

For help or questions about this project, contact Andrew Cauchi at [drewcauchi@gmail.com].
