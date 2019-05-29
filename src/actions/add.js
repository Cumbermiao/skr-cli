const fs = require('fs');
const chalk = require('chalk');
const { prompt } = require('inquirer');
const {tempList,TMP_PATH,showTable} = require('./module/common');

var rules = [{
    type: 'input',
    message: 'owner/repoName',
    name: 'repo',
    validate: url => {
        const regx = /^\w+\/\w+$/;
        if (regx.test(url)) {
            return true
        }
        return 'owner is your github account ,repoName is your github respository name, eg:githubAccount/demo'
    }
}, {
    type: "input",
    message: "branch(master)",
    name: "branch",
}]

module.exports = arg => {
    if(arg in tempList){
        console.log(chalk.red(`${arg} has already exist!`));
        return
    }

    prompt(rules).then(({ repo, branch }) => {
        try {
            tempList[arg] = {
                repo,
                branch:branch||'master'
            };
            fs.writeFileSync(TMP_PATH, JSON.stringify(tempList ));
            showTable()
        } catch (err) {
            console.log(`write error:${err}`);
        }
    })
}