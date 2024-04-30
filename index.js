#!/usr/bin/env node
// # - pound
// <>  angular brackets means you must provide this thing
// []  square brackets means it is optional option
// spawn, it returns an object called a child process.


const debounce = require("lodash.debounce"); // famous larger library/ package
const chokidar = require("chokidar");
const program = require("caporal");
const fs = require("fs");
const { spawn } = require('child_process');
const chalk = require('chalk');

program
  .version("0.0.1")
  .argument("[filename]", "Name of the file to execute")
  .action(async ({ filename }) => {
    const name = filename || "index.js";
   
    //if we get this try catch statement that file actually does exist 
    try {
      await fs.promises.access(name);
    } catch (err) {
      throw new Error(`Could not find the file ${name}`);
    }

    let proc;
    const start = debounce(() => {
      if (proc) {
        proc.kill();
      }
      console.log(chalk.bold(">>>> STARTING PROCESS"));
      proc = spawn('node', [name], { stdio: 'inherit' });
    }, 100);

    chokidar
      .watch(".")
      // added event listener callbacks func
      //  .on('add', () => console.log('STARTING USERS PROGRAM'))  // file is added
      .on("add", start)
      .on("change", start) // file is changed
      .on("unlink", start); // file is deleted
  });
program.parse(process.argv);

// const start = debounce(() => {
//   console.log('STARTING USERS PROGRAM');
// }, 100);

// chokidar
// .watch('.')
// // added event listener callbacks func
// //  .on('add', () => console.log('STARTING USERS PROGRAM'))  // file is added
//  .on('add', start)
//  .on('change', () => console.log('FILE CHANGED'))  // file is changed
//  .on('unlink', () => console.log('FILE UNLINKED')) // file is deleted
