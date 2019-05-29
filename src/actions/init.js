//TODO: set default template
const fs = require('fs');
const { prompt } = require('inquirer');
const chalk = require("chalk");
const ora = require('ora');
const download = require('download-git-repo');


const { tempList } = require('./module/common');
let DEFAULT_TMP;
if ('default' in tempList) {
    DEFAULT_TMP = tempList.default;
} else {
    DEFAULT_TMP = '';
}

//{project,template}
const promptProj = {
    type: 'input',
    name: "project",
    message: 'project name',
    validate: project => {
        if (!project) {
            return chalk.red('Please enter project name!')
        }
        return true
    }
};
const promptTmp = {
    type: 'input',
    name: 'template',
    message: 'template name'
}

const createProject = (projName, repoPath) => {
    let spinner = ora("downloading...");
    spinner.start();
        
    download(repoPath, `./${projName}`, err => {
        if (err) {
            console.log(`download error: ${err}`);
            process.exit();
        }
        spinner.succeed('init successfully!')
    })
}

module.exports = async (projectName, templateName) => {
    var promptList = [], projName, tmpName;
    if (!projectName) {
        promptList.push(promptProj, promptTmp);
    } else if (!templateName) {
        promptList.push(promptTmp);
    }
    if (promptList.length) {
        try {
            const { project, template } = await prompt(promptList);
            projName = project || projectName;
            tmpName = templateName || template || DEFAULT_TMP;
        } catch (err) {
            console.log(chalk.red(`prompt error:${err}`));
            process.exit();
        }
    } else {
        projName = projectName;
        tmpName = templateName || DEFAULT_TMP;
    }

    if (!(tmpName in tempList)) {
        console.log(chalk.red(`${tmpName} is not exist!`));
        return
    }
    let repo = tempList[tmpName].repo;
    let branch = tempList[tmpName].branch;
    createProject(projName, `github:${repo}#${branch}`);
}