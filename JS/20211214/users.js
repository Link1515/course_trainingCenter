import mongoose from 'mongoose'
import validator from 'validator'
import md5 from 'md5'

const Schema = mongoose.Schema

// 設定 collection 的結構
const userSchema = new Schema({
  // 欄位名稱
  account: {
    // 資料類型
    type: String,
    // mongoose 內建驗證
    // 最小長度字數與錯誤訊息
    minlength: [4, '帳號最少 4 個字元'],
    // 最大長度字數與錯誤訊息
    maxlength: [20, '你最好記得住'],
    // 必填與錯誤訊息
    required: [true, '帳號必填'],
    // 欄位值不可重複
    unique: true
  },
  password: {
    type: String,
    // minlength: [4, '密碼最少 4 個字元'],
    // maxlength: [20, '你最好記得住'],
    required: [true, '密碼必填']
  },
  email: {
    type: String,
    unique: true,
    required: [true, '信箱必填'],
    // 自訂驗證
    validate: {
      // 驗證 function
      validator (value) {
        return validator.isEmail(value)
      },
      // 錯誤訊息
      message: '信箱格式錯誤'
    }
  },
  age: {
    type: Number,
    // 最小值
    min: [13, '必須大於 13 歲'],
    // 最大值
    max: [110, '老頭少騙了'],
    required: [true, '年齡必填']
  }
}, { versionKey: false })

// 在驗證後準備把資料存入前
// 不能使用箭頭函數，因為箭頭函數沒有this
userSchema.pre('save', function (next) {
  // this 代表準備存入的資料
  const user = this
  // 如果有改過密碼
  if (user.isModified('password')) {
    user.password = md5(user.password)
  }

  // 繼續動作
  next()
})

userSchema.pre('findOneAndUpdate', function () {
  if (this._update.password) {
    if (this._update.password.length >= 4 && this._update.password.length <= 20) {
      this._update.password = md5(this._update.password)
    }
  }
})

// mongoose.model(collection名, schema)
// collection 名一定要加 s
const users = mongoose.model('users', userSchema)

export default users
