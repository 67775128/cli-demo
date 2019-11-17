const Generator = require('yeoman-generator')
const yoemanEnv = require('yeoman-environment').createEnv()
const fs = require('fs')
const path = require('path')
var pkgLink = null
const myGenerator = class extends Generator {
  constructor (args, opts) {
      super(args, opts);
      let tpldirName = opts.pkgLink.replace(/\.git/,'')
      tpldirName = tpldirName.match(/\w+$/)[0]
      this.tpldirName = tpldirName
  }
  prompting() {
    return this.prompt([
      {
        type: 'input',
        name: 'appName',
        message: '项目名称：',
        validate(input) {
          if (!input) return '请输入项目名称'
          if (fs.readdirSync(process.cwd()).includes(input)) {
            return '目录已存在'
          }
          return true
        },
      },
      {
        type: 'list',
        choices: ['Javascript', 'TypeScript'],
        name: 'language',
        message: '项目语言',
        default: 'TypeScript',
      },
    ]).then(answers => {
      this.answers = answers
    })
  }
  writing() {
    const { language, appName } = this.answers
      console.log(process.cwd(), this.tpldirName, this.templatePath(), this.destinationPath())
    // copyTpl 会使用模板引擎，替换 <%= appName %>
      const tplPath = path.join(__dirname, '../tpls/'+this.tpldirName)

      this.fs.copyTpl(tplPath, process.cwd()+'/'+appName, this.answers)
    // copy 支持文件/文件夹
    // fs.readdirSync(this.templatePath(language))
    //   .filter(name => !name.startsWith('_'))
    //   .forEach(item => {
    //     this.fs.copy(this.templatePath(language, item), this.destinationPath(appName, item))
    //   })
  }
  install() {
    // const projectDir = path.join(process.cwd(), this.answers.appName)
    console.log(process.cwd(), this.templatePath(), this.destinationPath())
    // this.spawnCommandSync('npm', ['install', '--registry=https://registry.npm.taobao.org'], {cwd: projectDir})
  }
  end() {
    this.log('happy coding!')
  }
}
module.exports = function (pkgLink) {
  pkgLink = pkgLink
  yoemanEnv.registerStub(myGenerator, 'test')
  yoemanEnv.run('test', {pkgLink})
}
