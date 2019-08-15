import axios from 'axios'
import qs from 'qs'
// import { notification } from 'antd';
import { setToken, getToken } from './authority'
import { serverAddress, defaultURLPrefix, defaultTimeout } from './../webconfig'

const codeMessage = {
  200: '服务器成功返回请求的数据',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网关超时'
}
// let ress = {}
function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    // 记录JWT信息
    const resToken = response.headers.cookie
    if (typeof resToken === 'string') {
      setToken(resToken)
    }
    return response.data
  }

  const errortext = codeMessage[response.status] || response.statusText
  // notification.error({
  //   message: `请求错误 ${response.status}: ${response.url}`,
  //   description: errortext,
  // });
  const error = new Error(errortext)
  error.name = response.status
  error.response = response
  throw error

  // const error = new Error(response.statusText);
  // error.response = response;
  // throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "axios"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request (url, options) {
  const defaultOptions = {
    // 'Access-Control-Allow-Origin': '*',
    credentials: 'include',
    // 'Access-Control-Allow-Headers': 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild'
    // Redirect:
  }
  const newOptions = { ...defaultOptions, ...options }

  // 附加JWT头部
  // console.log(options)
  // const reqtoken = 'PHPSESSID=kmfbq17ltqrn5e94s3gbvf9sj1; Hm_lvt_7ff42a974c53a93396eecb0fbe991713=1558849891,1558928078,1558949879,1559010627; Hm_lpvt_7ff42a974c53a93396eecb0fbe991713=1559031814'
  const reqtoken = getToken();
  if (typeof reqtoken === 'string') {
    newOptions.headers = {
      // cookie: "SESSION=92aa1c67-fbcf-4f23-9df2-90938be5da70",
      Token: reqtoken,
      ...newOptions.headers
    }
  }
  if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
    newOptions.data = qs.stringify({
      ...newOptions.data
    })
    newOptions.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      ...newOptions.headers
    }
  }
  newOptions.data = JSON.stringify(newOptions.body)
  console.log(serverAddress)
  const urlPrefix = typeof newOptions.prefix === 'string' ? options.prefix : defaultURLPrefix
  const resUrl = `${serverAddress}${urlPrefix}${url}`
  console.log(resUrl)
  // debugger;

  return axios.create().request({
    url: resUrl,
    method: options && options.method ? options.method : 'GET',
    timeout: defaultTimeout, // http请求超时时间
    ...newOptions
  })
    .then((res) => {
      console.log(res)
      // ress = res
      checkStatus(res)
    })
    .catch((error) => {
      console.log(error)
      if (error.code === 'ECONNABORTED') {
        // notification.error({
        //   message: `请求错误: ${url}`,
        //   description: '很抱歉您的请求已经超时了，请稍后再试！',
        // });
      } else if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        // // 清除用户权限信息并刷新页面
        // localStorage.removeItem('racs-authority');
        // localStorage.removeItem('racs-token');
        // localStorage.removeItem('racs-userInfo');
        // // eslint-disable-next-line
        // location.reload();
      } else {
        // notification.error({
        //   message: error.name,
        //   description: error.message,
        // });
      }
      return false
    })
}
