/**
 * [Jsonrpc 数据请求接口]
 * vue中的调用方式 this.http({url,method,params}) || this.http([{url,method,params},{url,method,params}])
 * [http jsonrpc请求封装方法]
 * @params String url [接口地址]
 * @parmas String method [jsonrpc中的method]
 * @params Array params [jsonrpc中的params]
 * @return Promise
 */
import axios from 'axios'
import api from './api'
var isPro = process.env.NODE_ENV === 'production'
console.log(isPro)
var Jsonrpc = {
  install (Vue, options) {
    Vue.prototype.http = service
    Vue.prototype.$ajax = axios
    Vue.prototype.api = api
  }
}
function service () {
  if (arguments[0] instanceof Array) {
    var resultArr = []
    for (let i in arguments[0]) {
      resultArr.push(fetchData(arguments[0][i]))
    }
    console.log(resultArr)
    return axios.all(resultArr).catch((e) => {
      console.log(e)
    })
  } else {
    let params = arguments[0]
    return fetchData(params)
  }
}
function fetchData (params) {
  let jsonObj = {
    jsonrpc: '2.0',
    method: params['method'],
    params: params['params'],
    id: 1
  }
  let json = JSON.stringify(jsonObj)
  console.log(json)
  return axios({
    url: params.url,
    method: 'post',
    data: json,
    timeout: 1000,
    withCredentials: !isPro
  })
}
export default Jsonrpc
