import fs from 'fs'

fs.readFile('./template/flex.json', (err, data) => {
  console.log(data.toString())
})
