const fs = require('fs')
const file = require('./required_seller.json')

const fileName = './required_seller_deduped.json'

function sortAndDeDupe() {
  // Sort file first!
  const sortedFile = file.sort()

  const newFile = []

  for (let i = 1; i <= sortedFile.length; i++) {
    // Remove 0 or 1 value from EOL before comparing.
    const current = file[i]
    const last = file[i - 1]
    if (current !== last) {
      newFile.push(last)
    }
  }

  fs.writeFile(fileName, JSON.stringify(newFile, null, 2), function(err) {
    if (err) return console.log(err)
    console.log('writing to ' + fileName)
  })
}

function checkDuped() {
  const file = require(fileName)

  for (let i = 1; i < file.length; i++) {
    const current = file[i].split(',')[0].toLowerCase()
    const last = file[i - 1].split(',')[0].toLowerCase()

    if (current === last) {
      console.group(`duplicate in line ${i - 1}`)
      console.log('->', file[i])
      console.log('->', file[i - 1])
      console.groupEnd()
    }
  }
}

// Sort and filter
// sortAndDeDupe()

// Check duplicated ids with different values
checkDuped()

// const arr = file2.sort()
// fs.writeFile('./testjson.json', JSON.stringify(arr, null, 2), function(err) {
//   if (err) return console.log(err)
// })
