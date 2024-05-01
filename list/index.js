#!/usr/bin/env node
 // Project  Building Node LS tool

// **** Node Standard Library
const fs = require("fs");
const util = require("util");
const chalk = require("chalk"); 
const path = require("path");

// that's how we get access to this library.

// *****
// *****JSON in general, it is used to configure a project
// ***** last argument is the callback function is always going to be called with the same
// order of arguments
// ***** nodemon filename with extension eg. nodemon index.js
// ***** nodemon tool is about just watching your files and rerunning your project 
// any time


// Method #2
// const lstat = util.promisify(fs.lstat);

// Method #3
const { lstat } = fs.promises;

// fs.readdir('.', (err, filenames) => {
//   // EITHER
//   // err === an error object, which means something went wrong
//   // OR
//   // err === null, which means everything is okay

//   if (err) {
//     //error handling code here
//     console.log(err);
//     // return;
//   }
// });

//CALLBACK FUNCTION
const targetDir = process.argv[2] || process.cwd();
fs.readdir(targetDir, async (err, filenames) => {
  if (err) {
    console.log(err);
  }

  // Promise.all Based Solution
  const statPromises = filenames.map(filename => {
    return lstat(path.join(targetDir, filename));
  });

  const allStats = await Promise.all(statPromises);

  for (let stats of allStats) {
    const index = allStats.indexOf(stats);

    // console logs with color
    if (stats.isFile()) {
      console.log(filenames[index]);
    } else {
      console.log(chalk.bold(filenames[index]));
    }
    // console.log(filenames[index], stats.isFile());
  }

  // Method # 3
  // for(let filename of filenames) {
  //   try {
  //     const stats = await lstat(filename);

  //     console.log(filename, stats.isFile());
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  // console.log(filenames);

  // // BAD CODE HERE!!!
  // for(let filename of filenames) {
  //   fs.lstat(filename, (err, stats) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //     console.log(filename, stats.isFile());
  //   });
  // }
  // // BAD CODE COMPLETE!!

  /* 1st option/Approach */
  // Maintain an array of the result from each lstat. As each callback is invoked,
  // add the stats object to this array. When array is full, log everything in it

  // const allStats = Array(filenames.length).fill(null);

  // for(let filename of filenames) {
  //   const index = filenames.indexOf(filename);

  //   fs.lstat(filename, (err, stats) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //     allStats[index] = stats;

  //     //The every function is built into every single array
  //     //if we call every we can pass in iterator function to this thing
  //     const ready = allStats.every(stats => {
  //       return stats;
  //     });
  //     if (ready) {
  //       allStats.forEach((stats,index) => {
  //         console.log(filenames[index], stats.isFile());
  //       });
  //     }
  //   });
  // }

  // 2nd Option
  // Wrap the lstat call with a promise, use async/await syntax to process lstat
  // call one at a time

  // Method #1
  // const lstat = (filename) =>  {
  //   return new Promise((resolve, reject) => {
  //     fs.lstat(filename, (err, stats) => {
  //       if (err) {
  //         reject(err);
  //       }
  //       resolve(stats);
  //     });
  //   });
  // }
});
