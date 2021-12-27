import multer from 'multer'
import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
// import fs from 'fs'
// import path from 'path'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
})

const upload = multer({
  storage: new CloudinaryStorage({ cloudinary }),
  /* 本機上傳
  // 上傳後檔案存放位置
  storage: multer.diskStorage({
    destination (req, file, callback) {
      // 用 path 將目前執行的資料夾路徑與指定資料夾名稱組成絕對路徑
      const folder = path.join(process.cwd(), '/upload')
      if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder)
      }
      // callback(錯誤, 上傳存放相對位置)
      callback(null, 'upload/')
    },
    filename (req, file, callback) {
      // 使用日期 + 原始檔名的副檔名當儲存的檔名
      callback(null, Date.now() + path.extname(file.originalname))
    }
  }),
  */
  // 過濾檔案類型
  fileFilter (req, file, callback) {
    if (!file.mimetype.includes('image')) {
      // 觸發自訂的 LIMIT_FILE_FORMAT 錯誤
      callback(new multer.MulterError('LIMIT_FILE_FORMAT'), false)
    } else {
      callback(null, true)
    }
  },
  limits: {
    // 限制檔案 1MB
    fileSize: 1024 * 1024
  }
})

export default async (req, res, next) => {
  upload.single('image')(req, res, async (error) => {
    // 檢查是不是上傳錯誤
    if (error instanceof multer.MulterError) {
      console.log(error)
      let message = '上傳錯誤'
      if (error.code === 'LIMIT_FILE_SIZE') {
        message = '檔案太大'
      } else if (error.code === 'LIMIT_FILE_FORMAT') {
        message = '格式不符'
      }
      res.status(400).send({ success: false, message })
    } else if (error) {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    } else {
      next()
    }
  })
}
