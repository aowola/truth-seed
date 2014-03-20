# Planting Seeds at Truth

Here at Truth we like to spend time building beautiful things. Whether we are prototyping with our MakerBot [Arnold](http://blogs.truthlabs.com/2013/11/25/makerbot-chrome-extension/) or creating a purely digital experience, a lot of [tools](http://blogs.truthlabs.com/2013/11/04/bootsrapping-a-design-studio/) are used in our process. This post will focus on a development stack we put together for web apps, affectionately called Truth Seed. All of the source is available on [github](https://github.com/aowola/truth-seed.git). As its name implies Truth Seed is meant to be a starting point, and since it is built on [Grunt](http://gruntjs.com/) tasks, it is totally customizable, so use what pieces work for you.

## What is a Seed Project and why should I use one?
A seed project is scaffolding; it's the ground work necessary to get a project up and running. Like most seed projects, Truth Seed requires cloning a repository and entering some terminal commands to get up and running. Seed projects also include an example at their core, Truth Seed is no exception, continue reading to find out more.

You should use a seed project to shorten the time from project formation to project deployment. A seed project is a curation of the countless frameworks and tools that exist today in the web development space. It is a grouping of useful client-side markup & scripts, as well as build tools and frameworks that have been painstakingly stitched together for a seamless development and deployment experience.

### Curation
Some of the more opinionated parts of the Truth Seed project are listed below. Check out the package.json, bower.json and gruntfile.js to get a full understanding of what is included.

* **JavaScript Module Loader:** [Requirejs](http://requirejs.org/) provides a means to concatenate all script files, as well as optimizing them.
* **JavaScript MVW Framework:** [Angularjs](http://angularjs.org/) provides a client side model-view-controller framework along with templates, data binding and dependency injection. 
* **JavaScript Code Quality:** [JShint](http://www.jshint.com/) checks javascript and produces errors when rules are violated.
* **CSS Code Quality:** [CSSlint](http://csslint.net/) checks css and produces errors when rules are violated.
* **CSS Normalize/Reset:** [Normalize.css](http://necolas.github.io/normalize.css/) provides css to normalize default styles across browsers.
* **CSS Preprocessor:** [Lesscss](http://lesscss.org/) provides programatic additions to css, as well as scoping and variables.
* **CSS Postprocessor:** [autoprefixer](https://github.com/ai/autoprefixer) provides support for browser prefixed css properties.

### Example Weather App
The Truth Seed project is [Angular](http://angularjs.org/) centric, and tries to provide a more fleshed out example application than other seed projects. The example app provides the current weather of four American cities, as well as the 5 day forecast. The design, and a bit of the source is based on a previous [blog post](http://blogs.truthlabs.com/2014/02/07/ios-parallax-in-html5/). A general disclaimer, the example code is just that, it hasn't been battle tested, and probably shouldn't be used in production. It's included as a tool for learning and exploration. Also the seed project is a work in progress, as we gain insights at Truth we hope to translate those learnings into efficiencies. Out of the box the weather app serves stale temperature and forecast data, but if you have an API Key (Cumulus Plan or above) from [Weather Underground](http://www.wunderground.com/), add it to the config.json file. This will allow the included node server to make XHR requests to the Weather Underground API.

## Required Reading
To make sure things go smoothly, lets ensure you have the tools necessary to use Truth Seed. We will be using [Nodejs](http://nodejs.org/), [Grunt](http://gruntjs.com/), and [Bower](http://bower.io/). Installation instructions are below.

### Install Nodejs
Follow the instructions on the [Nodejs](http://nodejs.org/) website.

### Install Grunt

```
$ npm install -g grunt
```
### Install Bower

```
$ npm install -g bower
```
 
## Using Truth Seed
Once you have the necessary tools installed, either clone the repo using [git](http://git-scm.com/) or download the zip file from [github](https://github.com/aowola/truth-seed.git). A brief description of the directory structure is below.

### Directory Structure
```
./                   # project root
  assets/            # source files for project
    fonts/           # local fonts 
    icons/           # icon files (including apple specific sizes)
    img/             # image files
    resources/       # misc. content (i.e. audio, video)
    scripts/         # javascript files
      controllers/   # app controllers 
      directives/    # app directives
      filters/       # app filters
      services/      # app services
      app.js         # angular app module definition 
      bootstrap.js   # angular app bootstrap/init          
      min.js         # requirejs configuration
      routes.js      # angular router configuration      
    styles/          # less styles  
    vendor/          # 3rd party libraries managed by bower  
    views/           # html templates & partials
      partials/      # partial html fragments & markup
      index.html     # main layout file of app
      ...
    dist/            # package directory
    server/          # node server for simple hosting
    .bowerrc         # bower configuration file
    .gitignore       # excludes files from git repo
    .npmignore       # excludes files from npm package
    bower.json       # client dependencies
    config.json      # node server configuration values
    gruntfile.js     # grunt task configuration
    LICENSE          # license file (MIT)
    package.json     # node dependencies
    ...
```

### Generated Directories and Files
Some files and directories will be generated as part of the build process, they are called out below. They are temporary files, and are excluded from the git repository by default.

```
./                         # project root
  .build/                  # compiled files for either production
                           # distribution or development build
  config.development.json  # development config values
  config.production.json   # production config values
```

### During Development
To run the application in development mode simply enter the command below. The grunt tasks associated with the registered task `serve` will be run. The end result will be content served at the port specified in the `config.json` file for development.

```
$ grunt serve
```
To view the weather application, open a browser of your choice and navigate to `http://localhost:9001` (Note: light testing performed in chrome).

### During Testing
Apart from some linting and hinting performed on specific files, there are no automated tests performed. This would be a great place to start to extend Truth Seed.

### During Deployment
There are a lot of things to consider when approaching deployment. This seed project packages the necessary pieces for a simple deployment of our nodejs server (which proxies weather underground to get around [CORS](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing) restrictions). To package a distribution enter the command below.

```
$ grunt dist
```

####  Running deployment version
Copy the `dist` directory to a server of your choosing (Note: it should already have node installed). To start the node server and host the angular app, you will need to execute the following commands from the `dist` directory.

```
$ npm install --production # install production dependencies
$ NODE_ENV=production node ./server/app # start node with production flag set
```

### Official Release
To update the version numbers of the project and push changes to your repository of choosing (specified in package.json). Simply enter the command below. Check out the documentation for the [grunt-bump](https://github.com/vojtajina/grunt-bump) task for more options.

```
$ grunt bump
```

## Growing a Forest
From a small seed a mighty trunk may grow. Truth Seed is a project that will evolve over time, with branches being pruned, while others grow. It is a starting point, not an end. With that knowledge go forth and conquer. Feel free to leave feedback about what you liked or didn't about Truth Seed.

Find me on twitter [@aowola](http://www.twitter.com/aowola)