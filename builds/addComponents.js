const fs = require("fs");
const findMarkdown = require("./findMarkdown");
const rootDir = "./docs";

findMarkdown(rootDir, writeComponents);

function writeComponents(dir) {
  if (dir !== './docs/README.md') {
    fs.appendFile(dir, `\n \n <comment-comment/> \n `, err => {
      if (err) throw err;
      console.log(`add components to ${dir}`);
    });
  }
}