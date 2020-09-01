const fs = require('fs')
const findMarkdown = require('./findMarkdown')
const rootDir = './docs/backend'
const rootDir2 = './docs/frontend'
const rootDir3 = './docs/interview'
const rootDir4 = './docs/mini-program'
const rootDir5 = './docs/vue'

findMarkdown(rootDir, writeComponents)
findMarkdown(rootDir2, writeComponents)
findMarkdown(rootDir3, writeComponents)
findMarkdown(rootDir4, writeComponents)
findMarkdown(rootDir5, writeComponents)

function writeComponents(dir) {
  fs.appendFile(dir, `\n \n <comment-comment/> \n `, (err) => {
    if (err) throw err
    console.log(`add components to ${dir}`)
  })
}