import {
  fetch
} from './index'
import {
  API_ROOT_CODE
} from '../config/config'
export default {
  getDemo (params) {
    // demo
    return fetch('get', API_ROOT_CODE, '/test/', params, 0)
  }
}
