const fs = require('fs');
const chalk = require('chalk');
const { prompt } = require('inquirer');
const {tempList,TMP_PATH,showTable} = require('./module/common');

var rules = [{
    type: 'input',
    message: 'github account',
    name: 'account',
    validate: account => {
        if(!account.length)return 'github account is required!';
        return true
    }
},{
    type: 'input',
    name: 'repo',
    message: 'github repository',
    validate: repo=>{
        if(!repo.length)return `github repository is required!`;
        return true
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

    prompt(rules).then(({ account,repo,branch }) => {
        try {
            tempList[arg] = {
                repo:`${account}/${repo}`,
                branch:branch||'master'
            };
            fs.writeFileSync(TMP_PATH, JSON.stringify(tempList ));
            showTable()
        } catch (err) {
            console.log(`write error:${err}`);
        }
    })
}