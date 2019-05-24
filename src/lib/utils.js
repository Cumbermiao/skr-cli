const chalk = require('chalk');
const Table = require("cli-table3");

const showTmpList = function(tmpObj,str){
    let table = new Table({
        head:['template','owner/name','branch']
    });

    if(Object.toString.call(tmpObj)==='[object Object]'){
        for(key in tmpObj){
            table.push([tmpObj[key].template,tmpObj[key].url,tmpObj[key].branch])
        }
    }
    
}