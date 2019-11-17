#!/usr/bin/env node
const program = require('commander');
const package = require('../package.json');
const clone = require('../scripts/clone.js');
const packageSet = require('../scripts/packageSet.js');
program
	.version(package.version, '-v, --version')
	.option('-c, --create <tplLink>', 'create new prgram')
    .parse(process.argv);

if (program.create) {
    console.log('create Something',program.create)
    clone(program.create)
    packageSet(program.create)
}