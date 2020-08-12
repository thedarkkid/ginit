const inquirer = require('./inquirer');

const CLI = require('clui');
const Spinner = CLI.Spinner;

const pkg = require('../package.json');
const Configstore = require('configstore');

const {Octokit} = require('@octokit/rest');
const {createBasicAuth} = require('@octokit/auth-basic');

const conf = new Configstore(pkg.name);

let octokit;

module.exports = {
    getInstance: () => {
        return octokit;
    },

    getStoredGithubToken: () => {
        return conf.get('github.token');
    },

    getPersonalAccessToken: async () => {
        const credentials = await inquirer.askGithubCredentials();
        const status = new Spinner('Authenticating you, please wait...');
        status.start();

        const auth = createBasicAuth({
            username: credentials.username,
            password: credentials.password,
            async on2Fa() {
                status.stop();
                const res = await inquirer.getTwoFactorAuthenticationCode();
                status.start();
                return res.twoFactorAuthenticationCode;
            },
            token: {
                scopes: ['user', 'public_repo', 'repo', 'repo:status'],
                note: 'ginit, the command-line tool for initializing Git repos'
            }
        });

        try {
            const res = await auth();

            if(res.token){
                conf.set('github.token', res.token);
                return res.token;
            } else {
                console.log("here");
                throw new Error('GitHub token was not found in the response');
            }
        } finally {
            status.stop();
        }
    },

    githubAuth: (token) => {
        octokit = new Octokit({
            auth: token
        });
    }
};