# React basic setup

## Installation
```
npm install
```

## Run app
```
npm start
```
> open browser at [http://localhost:3000](http://localhost:3000/)

## Build app
```

npm run build
```
Create dist directory and inside that create index_bundle.js and index.html template.

## Build app with style changes
```

npm run watch
```
Update Tailwindcss style changes immediately

### **Run server in production mode**
#### Windows
```terminal
SET "NODE_ENV=production" && npm start
``` 
#### Unix-like
```terminal
NODE_ENV=production npm start
``` 
> open browser at [http://localhost:4200](http://localhost:4200/)

---
## Explanation
This project provides a setup for further projects with React JS. Webpack is the build system and there is a production and a developer mode. You will find the descriptions below.

### NPM Scripts
***Start*** - The start script decides whether we are in production mode or in developer mode.
The production mode is usually set by the variable `NODE_ENV`. With `if-enf` we can check this variable and either start the tasks for production or developer mode.
```
"start": "if-env NODE_ENV=production && npm run start:prod || npm run start:dev"
```

***Start:dev*** - This script runs our developer server (webpack-dev-server). Its configuration can be found in the `dev-server.js`.
```
"start:dev": "node dev-server.js",
```

***Start:prod*** - This script runs the productive build and the production server.The configuration of this server is found in the `server.js`;
```
"start:prod": "npm run build-prod && node server.js",
```

***Build-prod*** - With this script we clean our dist folder and start webpack with the specific config file for the production mode.
```
"build-prod": "npm run clean:dist && webpack --config webpack.config.prod.js --progress",
```

***Clean:dist*** - clears the dist folder if needed (useful in production mode)

```
"clean:dist": "rimraf dist/*",
```

> *In most cases you are good to go with `npm start`.*

## Dev-server
The configuration for our developer server can be found in the `dev-server.js`-file.

Here we are creating a new instance of the `WebpackDevServer`. We are running webpack with the configurations inside this server. The configurations of the developer mode are found in the `webpack.config.dev.js`.

```Javascript
new WebpackDevServer(webpack(config), { ... }
```

### Configuration:
* ***publicPath:*** The build folder during the development does only exist in memory. So you cannot see it in your file system. PublicPath defines a structure in this memory and defines where to find the files. [More...](https://webpack.github.io/docs/webpack-dev-server.html#content-base)
* ***hot:*** enable hot reloading [More...](https://webpack.github.io/docs/webpack-dev-server.html#hot-module-replacement)
* ***historyApiFallback:*** needed for the react router to use the `browserhistory`. [More...](https://webpack.github.io/docs/webpack-dev-server.html#the-historyapifallback-option)
* ***ContentBase:*** define the root folder in which we can find the `index.html`. [More...](https://webpack.github.io/docs/webpack-dev-server.html#content-base)

## Production server
The configuration of the production server can be found in the file `server.js`.
Here you can simply setup the server for the production mode. It is configured with node's express.

> The productive server is running under [localhost:8080](http://localhost:8080)

## Webpack
There are two webpack configuration files:
* `webpack.config.dev.js` (developer configuration)
* `webpack.config.prod.js` (production configuration)

In the production version there are some plugins for minification and compression.

## Hey, where's my index.html??!
In this setup there is a [Embedded Javascript File](http://www.embeddedjs.com/), short `.ejs`. You do not need to insert your script files or the style sheets. Webpack is doing the job with this configuration. All you need is a `<body>`-tag in which you create a `<div>` in which we will load our app. If you need stylesheets call a `require` in your JS-Files and webpack knows to insert it into your application. Great :) Same thing with our images, javascript files and even the favicon.ico will be loaded with webpack into your application.
```html
<body>
    <div id="root"></div>    
</body>
```

## JSX
In the `src`-folder are only `.jsx`-files. Those files will be compiled by webpack into browser readable javascript files. As you can see in the webpack configuration it is `babel` which does this job.

## SCSS
There is a scss and css loader included into the webpack configuration. So you can write your styles in the format you like and webpack helps you if you require your stylesheets in the javascript.

```Javascript
import styles from './Navigation.scss';
```
