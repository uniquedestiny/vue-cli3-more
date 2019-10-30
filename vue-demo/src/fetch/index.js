import axios from 'axios'
import qs from 'qs'

function fetch (type, prefix, url, params, status) {
  return new Promise((resolve, reject) => {
    let postParams = {}
    const instance = axios.create({
      timeout: 30000
    })
    postParams = params
    let fetchData = {
      method: type,
      url: `${prefix}${url}`,
      data: qs.stringify(postParams)
    }
    if (type === 'get' || type === 'GET') {
      fetchData = {
        method: type,
        url: `${prefix}${url}`,
        params: postParams
      }
    }
    instance(fetchData).then(response => {
      const res = response.data
      if (res.code === status) {
        resolve(res)
      } else {
        resolve(res)
      }
    }).catch(error => {
      reject(error)
    })
  })
}

export {
  fetch
}
