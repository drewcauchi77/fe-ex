# Design Document for a New Inference Server

## Introduction

The application is designed to enable users to connect to a camera feed, capture frames during recording, and manage these frames within projects. Users can tag frames with relevant descriptors for later retrieval and analysis. This functionality is essential in environments such as manufacturing for quality control or in healthcare for detailed analysis.

## User Stories & Use Cases

### Target Environment

- Manufacturing: Operators can monitor assembly lines, capture irregularities in production, and tag frames for quality assurance.
- Healthcare: Professionals can capture and tag frames for diagnostic and training purposes.

### Example Use Case

An operator at a manufacturing plant monitors an assembly line via a camera feed. They capture a frame showing a dented can under poor lighting conditions and tag it with "Dented Can" and "Bad Lighting". The project containing these frames is saved into a database for future quality control analysis.

## Technical Overview

### Frontend Framework

VueJS with Composition API and TypeScript: Ensures organized, reusable code and enhances maintainability with improved type safety.

### State Management

Pinia: Offers a simple API, compatibility with the Composition API, and efficient tree-shaking capabilities.

### Routing

Vue Router: Supports asynchronous route loading to improve application speed.

### UI Toolkit

Quasar: Aids in maintaining a high-quality user interface that is responsive across various devices and extendable.

### Testing

Cypress: For end-to-end testing of user flows and unit testing of individual Vue components to ensure they meet functional requirements.

## Architecture Overview

The diagram provided [[here](https://imgur.com/a/Fb7ZXk8)] illustrates the architecture of our camera feed and frame capture application. The diagram shows the usage of components and the routing structure within our application. If the link does not work, you can find the image in `/architecture-overview` directory.

## Design Considerations

### Responsiveness

Ensure the application is adaptable to various screen sizes, prioritizing usability on larger screens while accommodating split-screen views for multitasking.

### Accessibility

Implement keyboard navigability and ensure visibility enhancements for users with visual impairments.

## Security Measures

### Current State

No advanced security measures like authentication and authorization are in place due to the application's initial simplicity.

### Future Enhancements

- Authentication: Introduce methods such as OAuth for secure access.
- Authorisation: Implement role-based access control to restrict functionalities based on user roles.
- Audit Trails: Maintain logs of user actions to enable accountability and traceability.

## Deployment & Maintenance

### Deployment Strategy

- Environment Separation: Utilize distinct development, testing, and production environments.
- Containerisation: Use Docker for consistent deployment across environments.
- CI/CD Pipeline: Employ Azure DevOps or GitHub Actions for automated builds, testing, and deployments.

### Maintenance Strategy

- Error Tracking: Implement tools like Sentry for real-time frontend issue logging and troubleshooting.
- Performance Monitoring: Regularly review and optimise application performance to meet evolving user needs.

## Conclusion

To summarise, the design proposal provides a solid base for creating an application which will not only cover the basic needs in relation to capturing and managing video feed frames but also take into account such aspects as scalability, security, functionality etc. This means that by using VueJS, Pinia, Quasar we make sure our app is based on modern technologies and at the same time it can be easily modified according to new user requirements or technological progress.

It is obvious that this software has a lot of advantages among which are the ability to improve working capacity and accuracy in various spheres – manufacturing or healthcare, for instance. In addition, we should point out its reliability supported by wide testing coverage along with strict rules of deployment and maintenance process organisation aimed at continuous performance enhancement.

By implementing this proposal, we aim to deliver an application that is intuitive, efficient, and secure, providing users with a powerful tool for managing and analysing video feeds effectively in their respective fields.
