import { data } from '../data.js'

export default async (event) => {
  const region = event.message.text.replace('!region ', '')
  const results = []

  try {
    for (const info of data) {
      if (info.Region === region) {
        results.push(info.Name)
        if (results.length >= 5) {
          break
        }
      }
    }
    console.log(results)
    if (results.length > 0) {
      event.reply(results)
    } else {
      event.reply('找不到')
    }
  } catch {
    event.reply('發生錯誤')
  }
}
