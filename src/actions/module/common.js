const TMP_PATH = `${__dirname}/../../../tpl.json`;
const tempList = require(TMP_PATH);
const Table = require('cli-table3');
const chalk = require('chalk');

const showTable = ()=>{
    var table = new Table({
        head:[ "index","template name","repo","branch"]
    })
    var idx=0;
    let defaultTmp = tempList.default||'';
    for(let key in tempList){
        if(key==='default'){
            continue;
        }
        idx++;
        let tplObj = tempList[key];
        let tplName = defaultTmp===key?`${key}`+chalk.green('(default)'):`${key}`;
        table.push({
            [idx]:[tplName,tempList[key].repo,tempList[key].branch]
        })
    }
    console.log(table.toString());
}

module.exports = {
    TMP_PATH,
    tempList,
    showTable
}