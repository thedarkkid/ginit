## GINIT
A CLI (command line interface) for intializing git remote repositories both locally
and remotely. Currently supports github only.
##
It was created by following this sitepoint tutorial https://www.sitepoint.com/javascript-command-line-interface-cli-node-js/
and will be updated till it becomes a full blown CLI for node,js backend. 
My intention is to make it a CLI for the creation of a very opinionated
node.js backend scaffolding architecture.
##  INSTALL
Clone the application into any desired directory then install it globally by "cd"-ing
to the cloned directory using terminal/cmd and then running:</br>

`npm install -g`

## USE
Once installed globally the application can be used to initialise github repos both
locally and remotely by "cd"-ing into your project folder using terminal/cmd and
running </br>

`ginit` or `ginit <repo-name> <repo-description>` </br>

where `<repo-name>` and `<repo-description>` are the repository name 
and description respectively. Follow the instructions from there
and your repo should be all set-up.

## TODO
<ul>
    <li>Fix the error 403 when pushing to github repo</li>
    <li>there was a get base path problem method I found problematic- might be the problem</li>
</ul>
