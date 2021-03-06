<br/>
<br/>
<br/>

**DEPRECATED: moved to** https://github.com/helpfulengineering/project-manufacturer-database

<br/>
<br/>
<br/>

[![Netlify Status](https://api.netlify.com/api/v1/badges/45145ece-03f7-45f3-9e71-4991bca90c3d/deploy-status)](https://app.netlify.com/sites/he-local-manufacturer-search/deploys)

Web app to search for nearby production facilities offered by volunteers.

The backend for this project is: https://github.com/felix19350/hw-local-manufacturer-search-backend

## Install

    npm install
    
## Run

Run the app in the development mode.

    npm start

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Configure

To performs searches locally you'll need an API key with access to the Places API for localhost.
To use the one from the team, ask around for it **and** get your IP whitelisted.

To use .env variables you should create a .env.development.local file, that will be used in development environment - this file is always ignored by git.
Please don't change .env file unless you need to add a new environment variable, this file is not ignored by git, so no values should be on it.

## Build

    npm run build
    
Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

# Authentication/Authorization

Authentication is done using Auth0.
A user will get the default role `user` from the Auth0 flow.
If assigned in Auth0, a user may also get the role `user-manager`.

Calls to Hasura can be done with and without authentication.
Without authentication, the role `unauthenticated` is used in Hasura to determine permissions.

By adding the `Authorization: bearer <token>` with the token from the Auth0 flow we authenticate requests to Hasura.
By also setting the `X-Hasura-Role` to one of the allowed roles (set by Auth0), we determine which permissions are applied.

At the time of writing, the `user-manager` role **is required to view contact information**. 

<br />
<br />
<br />

# Slimmed down version of Readme generated by create react app

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
