# Static environment

To set up a local, frontend environment you will need [Node](https://nodejs.org/en/) and [Node Version Manager](https://github.com/creationix/nvm#node-version-manager---).

Once NVM is installed, navigate to the project root and run:

1. ```nvm use```
2. ```npm install```
3. ```npm install gulp -g```
4. ```gulp app```

Source files are located in

* ```src/html/app``` for HTML
* ```src/scss/app``` for SCSS
* ```src/media/*``` for PNGs, SVGs, ...
* ```src/css``` for unminified CSS
* ```src/js``` for unminified JS


# Static view, without running the environment

* open ```build/index.html```
