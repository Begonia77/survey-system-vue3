import request from '../util/request'

function getPaperInfoById(id) {
  return request({
    url: '/Survey/FindSurveyInfoById',
    method: 'post',
    // 传递的参数
    data: {
      surveyId: id,
    },
  })
}

export const paperInfo = {
  getPaperInfoById,
}
