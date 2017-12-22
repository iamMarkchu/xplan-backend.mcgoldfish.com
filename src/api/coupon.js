import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/api/coupon',
    method: 'get',
    params
  })
}

export function createCoupon(params) {
  return request({
    url: '/api/coupon',
    method: 'post',
    params
  })
}

export function fetchCoupon(params) {
  return request({
    url: '/api/coupon/' + params.id,
    method: 'get'
  })
}

export function updateCoupon(params) {
  return request({
    url: '/api/coupon/' + params.id,
    method: 'put',
    params
  })
}
