#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

const files = require('./lib/files');
const github = require('./lib/github');
const repo =  require('./lib/repo');

clear();

console.log(
  chalk.yellow(
      figlet.textSync('Ginit', {horizontalLayout: 'full'})
  )
);

if(files.directoryExists('.git')){
    console.log(chalk.red('Already a git repository!'));
    process.exit();
}

const getGithubToken = async () => {
    // Fetch token from config store
    let token = github.getStoredGithubToken();
    if(!token) token = await github.getPersonalAccessToken();
    return token;
};

const run = async () =>{
    try{
        // Retrieve & Set Authentication Token
        const token = await getGithubToken();
        github.githubAuth(token);

        // Create remote repository
        const url = await repo.createRemoteRepo();

        // Create .gitignore file
        await repo.createGitignore();

        // Set up local repository and push to remote
        await repo.setupRepo(url);

        console.log(chalk.green('All done!'));
    } catch (e) {
        if(e){
            switch (e.status) {
                case 401:
                    console.log(
                      chalk.red('Couldn\'nt log you in. Please provide correct credentials/token.')
                    );
                    break;
                case 422:
                    console.log(
                      chalk.red('There is already a remote repository or token with the same name')
                    );
                    break;
                default:
                    console.log(chalk.red(e));
            }
        }
    }
};

run();