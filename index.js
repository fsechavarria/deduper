const fs = require('fs')
const file = require('./required_seller.json')

const fileName = './required_seller_deduped.json'

function sortAndDeDupe() {
  // Sort file first!
  const sortedFile = file.sort()

  // Remove duplicates by turning the items into a set and then back into an array
  const newFile = Array.from(new Set(sortedFile))

  fs.writeFileSync(fileName, JSON.stringify(newFile, null, 2), function(err) {
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
sortAndDeDupe()

// Check duplicates
checkDuped()
