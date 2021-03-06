# OpenDashboard UX

<img src='.github/preview.JPG'/>

## Required

-  [npm](https://www.npmjs.com/) ^6.10.2

-  [node](https://nodejs.org/en/) ^12.9.0

-  [react-scripts](https://www.npmjs.com/package/react-scripts) ^3.4.0

  
  

For production environment, use 'serve':

https://create-react-app.dev/docs/deployment/

  

## Configuration

**Dev Mode**
Note, if you edit the file src/shared/path.js in OpenDashboard-ux and change `DEV_MODE` to true, you should be able to simply launch the app with false data to see it working. When DEV_MODE is set to true, you cannot access the admin screens. Any attempt to 'log in' will fail. 
Once you edit Dev Mode to be true, you can simply access the site by going straight to the following URL: [http://localhost:3000/courselist](http://localhost:3000/courselist)

You cannot access the site with an LTI Launch when in dev mode


**NON Dev Mode**  

Edit `public/config.json` with the following setting

```javascript
{
	"API_BASE_URL": "https://[YOUR OpenDashboard-api url]/",
	"logo": {
		"url":  "",
		"imagePath":  "[your url]"
	}
}
```

## Available Scripts

  

In the project directory, you can run:

  

### `npm start`

  

Runs the app in the development mode.<br  />

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

  

The page will reload if you make edits.<br  />

You will also see any lint errors in the console.

  

### `npm test`

  

Launches the test runner in the interactive watch mode.<br  />

See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

  

### `npm run build`

  

Builds the app for production to the `build` folder.<br  />

It correctly bundles React in production mode and optimizes the build for the best performance.

  

The build is minified and the filenames include the hashes.<br  />

Your app is ready to be deployed!

  

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

  

### `npm run eject`

  

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

  

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

  

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

  

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

## In a production Environment
We recommend using the following information to run this in a production environment
[https://create-react-app.dev/docs/deployment/](https://create-react-app.dev/docs/deployment/)
