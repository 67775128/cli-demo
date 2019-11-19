const execSync = require('child_process').execSync
const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
const ora = require('ora')

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
    const  oraInstance = ora({
        color: 'red',
        text: 'loading...'
    }).start()
    const clildprocess = execSync(`git clone ${pkgLink} ${tplPath} --progress`)
    // clildprocess.stdout.on('data', (m) => {
    //     console.log('stdout', m);
    // });
    // clildprocess.stderr.on('data', (m) => {
    //     console.log('stderr', m);
    // });
    // clildprocess.on('message', (m) => {
    //     console.log('message', m);
    // });
    console.log(process.cwd())
    oraInstance.succeed('template下载完成！')
    console.log(chalk.green('template下载完成！'))
}
