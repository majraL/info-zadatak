# Static environment

To set up a local, front-end environment you will need the [Node Version Manager](https://github.com/creationix/nvm) first.

Once NVM is installed, navigate to the project root and run:

1. ```nvm use```
2. ```npm install```
3. ```npm install gulp -g```
4. ```gulp app```

Source files are located in

* ```src/html/app``` for HTML
* ```src/scss/app``` for SCSS
* ```src/media/*``` for PNGs and large SVGs
* ```src/media/symbols``` for smaller SVGs (as arrows, chevrons)
* ```src/css``` for unminified CSS
* ```src/js``` for unminified JS


# Static view, without running the environment

* open build/index.html
