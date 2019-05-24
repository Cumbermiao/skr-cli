module.exports = arg => {
    console.log('init--------')
    console.log(arg)
    console.log('tempList', tempList)
    if (arg in tempList) {
        console.log(`${arg} has already exist!`)
        return
    }
    tempList[arg] = {};
    prompt([{
        type: 'input',
        message: 'owner/repoName',
        validate: url => {
            const regx = /^\w+\/\w+$/;
            if (regx.test(url)) {
                tempList[arg] = {
                    url: url
                };
                try {
                    fs.writeFileSync(TMP_PATH, JSON.stringify({ tempList: tempList }))
                } catch (err) {
                    console.log(`write error:${err}`);
                }
                return true
            }
            return 'owner is your github account ,repoName is your github respository name, eg:githubAccount/demo'
        }
    }, {
        type: "input",
        name: "branch(master)",
        validate: branch => {
            if (branch) {

            }
        }
    }])
}
