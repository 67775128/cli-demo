const Generator = require('yeoman-generator')
const yoemanEnv = require('yeoman-environment').createEnv()
const fs = require('fs')
const path = require('path')
const myGenerator = class extends Generator {
  prompting() {
    return this.prompt([
      {
        type: 'input',
        name: 'appName',
        message: '项目名称：',
        validate(input) {
          if (!input) return '请输入项目名称'
          if (fs.readdirSync('./createdTpls').includes(input)) {
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
    console.log(process.cwd(), this.templatePath(), this.destinationPath())
    // copyTpl 会使用模板引擎，替换 <%= appName %>
    // this.fs.copyTpl(this.templatePath(language, '_package.json'), this.destinationPath(appName, 'package.json'), this.answers)
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
module.exports = function () {
  yoemanEnv.registerStub(myGenerator, 'test')
  yoemanEnv.run('test')
}
