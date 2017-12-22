import request from '@/utils/request'

export function deleteImage(params) {
  return request({
    url: '/api/upload',
    method: 'delete',
    params
  })
}

export const UploadRequestPath = process.env.BASE_API + '/api/upload'
