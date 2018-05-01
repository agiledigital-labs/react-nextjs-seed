# Project Seed

This project is the public front end UI for a project. It is written in Typescript with the Next.js framework for Server Side Rendering of React, using a Redux data store using Saga for async/side effecting. Jest is used for testing, with Enzyme for DOM tests.

Locations where changes are needed are marked with "#@Change-this".

The slack channel for the project is the 'projectShort = "#@Change-this"' from the .cicd/deploy.jenkinsfile if #@Change-this was replaced with "test=seed" the slack channel would need to be named #test=seed .

For a build to run, each project requires a volume in jenkins project to store the npm packages as it is building. The volumes can be made [https://openshift.staging.CompanyName.co/console/project/jenkins/browse/storage] or equivalent. The volume should be named $projectShort-home-jenkins-npm.
These volume are needed for jenkins to build the project.

The project will also need a name space defined in the openshift [https://openshift.staging.CompanyName.co/console/projects]. The name of the space should be $projectShort-staging. The project will not deploy without this space.


## Project Structure

Next uses convention based routing, with each file in the `pages` directory corresponding to a route. Each page uses reusable react components defined in `src/components`.

State is managed by Redux/Saga. New reducers, sagas and actions can be defined by creating the relevant file in the respective directory in `src/store`.

Styling is defined as SCSS in `src/styles`. Ultimately `main.scss` acts as the stylesheet for the application. All colours used should be defined as variables in `colours.scss` under role-based names to allow for easy pallete switches at a later time. Styling specific to individual pages or components should be under the relevant subdirectory.

## Development

To run in dev mode with hot-reloading and linting, run `yarn dev`.

## Testing

To execute the Jest test suite, run `yarn test`. Tests are defined in `test` under the same subdirectory structure as the corresponding source code.

## Production

To run in a production environment, build using `yarn build`, and start with `yarn start`.