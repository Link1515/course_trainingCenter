import axios from 'axios'
import schedule from 'node-schedule'

export let data = []

export let count = 0

export const test = () => {
  count++
  console.log(count)
}

// 更新資料的 function
const getData = () => {
  axios.get('https://gis.taiwan.net.tw/XMLReleaseALL_public/scenic_spot_C_f.json').then((response) => {
    data = response.data.XML_Head.Infos.Info
    console.log('資料成功更新')
  })
}

// 機器人啟動時先更新資料
getData()

// 設定排程每日 0:00 點更新
schedule.scheduleJob('0 0 * * *', getData)
