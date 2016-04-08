#!/bin/sh

. pause

pause This script will install all dependencies of the jobertus-cup project. Press <Ctrl-C> to abort.

npm install
npm install -g grunt grunt-cli bower
bower install
sudo gem install sass compass
