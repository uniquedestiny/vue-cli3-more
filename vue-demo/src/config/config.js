
const hostname = window.location.hostname
const protocal = window.location.protocol
const domains = [] // 正式服域名 配置

export const isRelease = (domains.indexOf(hostname) > -1) ? 1 : 0
export const API_ROOT_CODE = (domains.indexOf(hostname) > -1) ? `${protocal}//[正式服域名]` : `${protocal}//[测试服域名]`