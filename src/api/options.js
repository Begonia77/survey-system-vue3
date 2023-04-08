import request from '../util/request'

function getPaperInfoById(id) {
  return request({
    url: '/Survey/FindAllSurveyInfo',
    method: 'post',
    // 传递的参数
    data: {
      survey_id: id,
    },
  })
}

export const options = {
  getPaperInfoById,
}
