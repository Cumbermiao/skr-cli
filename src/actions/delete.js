const {tempList,TMP_PATH,showTable} = require('./module/common');
const fs = require('fs');
const chalk = require('chalk');

module.exports = arg =>{
    if(!tempList){
        console.log(chalk.red(`no template exist!`));
        return
    }
    if(arg in tempList){
        delete tempList[arg];
        try{
            fs.writeFileSync(TMP_PATH,JSON.stringify(tempList));
            showTable();
        } catch (err){
            console.log(chalk.red(`write err:${err}`));
            return false
        }
    }

}