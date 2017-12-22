import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/api/merchant',
    method: 'get',
    params
  })
}

export function createMerchant(params) {
  return request({
    url: '/api/merchant',
    method: 'post',
    params
  })
}

export function fetchMerchant(params) {
  return request({
    url: '/api/merchant/' + params.id,
    method: 'get'
  })
}

export function updateMerchant(params) {
  return request({
    url: '/api/merchant/' + params.id,
    method: 'put',
    params
  })
}
