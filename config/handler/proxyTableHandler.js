/*
 * 开发环境代理配置 生产环境请使用 nginx 配置代理 或 其他方式
 * @Author: wujiang
 * @Date: 2018-08-16 17:16:55
 * @Last Modified by: wujiang
 * @Last Modified time: 2018-08-19 09:18:18
 */
const configDev = require('../config.dev')
module.exports = (() => {
	let proxyApi = {}
    let servers = configDev.servers
    for (let key of Object.keys(servers)) {
        proxyApi[`/${key}`] = {
            // 传递给http(s)请求的对象
            target: servers[key],
            // 是否将主机头的源更改为目标URL
            changeOrigin: true,
            // 是否代理websocket
            ws: true,
            // 是否验证SSL证书
            secure: false,
            // 重写set-cookie标头的域，删除域名
            cookieDomainRewrite: '',
            // 代理响应事件
            onProxyRes: onProxyRes,
            // 重写目标的url路径
            pathRewrite: {
                [`^/${key}`]: ''
            }
        }
    }
    return proxyApi
})()

/**
 * 过滤cookie path，解决同域下不同path,cookie无法访问问题
 * （实际上不同域的cookie也共享了）
 * @param proxyRes
 * @param req
 * @param res
 */
function onProxyRes (proxyRes, req, res) {
  let cookies = proxyRes.headers['set-cookie']
  // 目标路径
  let originalUrl = req.originalUrl
  // 代理路径名
  let proxyName = originalUrl.split('/')[1] || ''
  // 开发服url
  let server = configDev.servers[proxyName]
  // 后台工程名
  let projectName = server.substring(server.lastIndexOf('/') + 1)
  console.log(eqqeq);
  // 修改cookie Path
  if (cookies) {
      let newCookie = cookies.map(function (cookie) {
          if (cookie.indexOf(`Path=/${projectName}`) >= 0) {
              cookie = cookie.replace(`Path=/${projectName}`, 'Path=/')
              return cookie.replace(`Path=//`, 'Path=/')
          }
          return cookie
      })
      // 修改cookie path
      delete proxyRes.headers['set-cookie']
      proxyRes.headers['set-cookie'] = newCookie
  }
}
