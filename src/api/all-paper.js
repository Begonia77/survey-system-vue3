import request from '../util/request'

export function getPapersList() {
  return request({
    url: '/Survey/FindAllSurvey',
    method: 'get',
  })
}
