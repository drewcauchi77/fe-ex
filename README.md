## Project Overview

This project enables end-users to create a project and connect a video camera. While the video feed is active, specific frames can be captured for later analysis. Users can stop the feed, review the captured frames, and delete any that are unnecessary or taken in error. Additionally, users can tag frames and manage previous projects, including the ability to open and delete them.

## Technologies/Dependencies Used

- Vue3: Core framework
- Vue Router: Routing management
- TypeScript: Programming language
- Pinia: State management system
- Cypress: End-to-end and unit testing
- Quasar: Component building and styling
- Prettier: Code formatting
- ESLint: Error checking
- Vite: Build tooling

## Setup and Installation

1. Unzip the provided file.
2. Change directory to the project folder.
3. Execute `npm install` to install dependencies.
4. Start the application locally by running `npm run dev`.

## Project Structure

- `/cypress`: Includes end-to-end tests and settings for unit tests.
- `/public`: Stores assets such as images, icons, and fonts.
- `/src`: Contains all application logic.
  - `/src/assets`: Includes styling and Quasar configurations.
  - `/src/components`: Vue3 components organised by reusability.
  - `/src/components/__tests__`: Cypress component and unit tests.
  - `/src/definitions`: Type definitions and interfaces for strong typing.
  - `/src/router`: Manages routes created with Vue Router.
  - `/src/stores`: Contains Pinia stores, with a primary focus on the project store.
  - `/src/views`: Represents pages accessed via routes; minimal logic is present.
  - `/src/App.vue`: The application's root template.
  - `/src/main.ts`: Initialises plugins and the root component.
- `/index.html`: Entry point of the application.

## Run Project

To launch the project in development mode, run:

```sh
npm run dev
```

## E2E Testing

To execute end-to-end tests via Cypress, use:

```sh
npm run test:e2e:dev
```

## Unit Testing

To perform unit tests via Cypress, run:

```sh
npm run test:unit:dev
```

## Code Linting

To detect and fix linting errors, execute:

```sh
npm run lint
```

## Deployment

For production, build the project with:

```sh
npm run build
```

Deploy the contents of the `/dist` folder to your server.

## Contact Information

For questions about this project, contact Andrew Cauchi at [drewcauchi@gmail.com].
