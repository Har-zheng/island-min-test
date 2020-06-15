import { Base64 } from 'js-base64'
Page({
  onGetToken(){
    wx.login({
      complete: (res) => {
        if(res.code){
          wx.request({
            url: 'http://localhost:3000/v1/token',
            method: 'POST',
            data: {
              "account": res.code,
              "type": 100,
              "secret": "1234567qq"
            },
            success:(res) => {
              console.log(res.data)
              const code = res.statusCode.toString()
              if(code.startsWith('2')){
                wx.setStorageSync('token', res.data.token)
              }
            }
          })
        }
      },
    })
  },
  onVerify(){
    wx.request({
      url: 'http://localhost:3000/v1/token/verify',
      complete: (res) => {},
      data: {
        token: wx.getStorageSync('token')
      },
      fail: (res) => {},
      method: "POST",
      success: (result) => {},
    })
  },
  onGetClassis(){
    wx.request({
      url: 'http://localhost:3000/v1/classic/latest',
      method: "GET",
      header: {
        Authorization: this._encode()
      },
      success:(res)=> {
        console.log(wx.getStorageSync('token'))
        console.log(res)
      }
    })
  },
  _encode(){
    const token = wx.getStorageSync('token')
    const base64 = Base64.encode(token+':')
    return 'Basic '+base64
  }
})