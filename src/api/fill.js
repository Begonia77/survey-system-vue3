import request from '../util/request'

export function getPapersList(data) {
  return request({
    url: '/FillIn/InsertFillIn',
    method: 'post',
    // 传递的参数
    data,
  })
}
