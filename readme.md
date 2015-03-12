Frontend gedeelte van inchecksysteem
====================================
Bronnen:
 - http://blog.elenakolevska.com/using-grunt-with-laravel-and-bootstrap/

Installatie
-----------
### Dependencies
 - Node
    $ brew install node             # apt-get install node
 - Bower
    $ npm install -g bower
 - Grunt
    $ npm install -g grunt
    $ npm install -g grunt-cli
 - git
    $ brew install git              # apt-get install git

### Prepare project
#### Node
 - Create a package.json file
    $ npm init
#### Bower
 - Create a `.bowerrc` file containing
    {
        "directory": "app/bower_components"
    }
 - Setup Bower dependencies (adds them to `bower.json` file)
    $ bower install bootstrap-sass-official -S
    $ bower install jquery -S
    $ bower install backbone -S
    $ bower install underscore -S
 - Install Bower dependencies (reads the `bower.json` file)
    $ bower install
#### Grunt
 - Install Grunt plugins (installs & adds them to `package.json`)
    $ npm install grunt-bower-concat --save-dev
    $ npm install grunt-contrib-concat --save-dev
    $ npm install grunt-contrib-sass --save-dev
    $ npm install grunt-contrib-watch --save-dev
 - Create `gruntfile.js`
#### Git
 - Setup git
    $ git init
 - Setup `.gitignore`
    node_modules
    app/bower_components
    build
    dist/javascript
    dist/css

### Run project
 - Concatenate all bower components
    $ grunt bower
 - Watch all files
    $ grunt
