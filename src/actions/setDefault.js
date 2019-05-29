const {tempList,TMP_PATH} = require('./module/common');
const {prompt} = require("inquirer");
const chalk = require('chalk');
const fs = require('fs');

module.exports = async (template)=>{
    var tmpName;
    if(!template){
        try{
            const {template} = await prompt([{
                type:"input",
                name:"template",
                message:"template name",
                validate:tmp=>{
                    if(!tmp){
                        return chalk.red("Plear enter template name");
                    }
                    return true
                }
            }])
            tmpName = template
        }catch(err){
            console.log(chalk.red(err))
        }
    }else{
        tmpName = template;
    }

    if(tmpName in tempList){
        tempList.default = tmpName;
        fs.writeFileSync(TMP_PATH,JSON.stringify(tempList));
        console.log(chalk.green(`set ${tmpName} default successfully!`));
    }else{
        console.log(chalk.red(`${tmpName} is not exist!`));
        process.exit();
    }
}