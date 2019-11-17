const execSync = require('child_process').execSync
const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
module.exports = (pkgLink) => {
    let tpldirName = pkgLink.replace(/\.git/,'')
    tpldirName = tpldirName.match(/\w+$/)[0]
    const isTpldirsExist = fs.existsSync(path.join('./tpls', tpldirName))
    console.log(isTpldirsExist)
    if (isTpldirsExist) {
        console.log(chalk.yellow(`开始删除文件夹：${tpldirName}`))
        execSync(`rm -rf ${path.join('./tpls', tpldirName)}`)
        console.log(chalk.green(`删除文件夹：${tpldirName}完成！`))
    }
    process.chdir('./tpls')
    console.log(chalk.yellow('开始template下载！'))
    execSync(`git clone ${pkgLink}`)
    process.chdir('../')
    console.log(process.cwd())
    console.log(chalk.green('template下载完成！'))
}
