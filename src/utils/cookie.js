import Cookies from 'js-cookie'

const TokenKey = 'cmsOpsSid'

export function getToken(name) {
  var token_key = name || TokenKey
  return Cookies.get(token_key)
}

export function setToken(token,name) {
  var token_key = name || TokenKey
  return Cookies.set(token_key, token, {  path: '/',domain:'.speiyou.com',expires:365 })
}

export function removeToken(name) {
  var token_key = name || TokenKey
  return Cookies.remove(token_key)
}
