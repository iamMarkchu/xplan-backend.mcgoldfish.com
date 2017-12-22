import request from '@/utils/request'
const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET

export function login(username, password) {
  return request({
    url: '/oauth/token',
    method: 'post',
    data: {
      grant_type: 'password',
      scope: '',
      client_id: clientId,
      client_secret: clientSecret,
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/api/user',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/api/user/logout',
    method: 'post'
  })
}
