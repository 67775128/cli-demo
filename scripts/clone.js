const execSync = require('child_process').execSync
const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
module.exports = (pkgLink) => {
    let tpldirName = pkgLink.replace(/\.git/,'')
    tpldirName = tpldirName.match(/\w+$/)[0]
    const tplPath = path.join(__dirname, '../tpls/'+tpldirName)
    const isTpldirsExist = fs.existsSync(tplPath)
    console.log(tplPath, isTpldirsExist)
    console.log(process.cwd())
    if (isTpldirsExist) {
        console.log(chalk.yellow(`开始删除文件夹：${tpldirName}`))
        execSync(`rm -rf ${tplPath}`)
        console.log(chalk.green(`删除文件夹：${tpldirName}完成！`))
    }
    console.log(chalk.yellow('开始template下载！'))
    execSync(`git clone ${pkgLink} ${tplPath}`)
    console.log(process.cwd())
    console.log(chalk.green('template下载完成！'))
}
