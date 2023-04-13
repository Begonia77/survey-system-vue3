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

function postCreatePaper(data) {
  return request({
    url: '/Survey/InsertSurvey',
    method: 'post',
    // 传递的参数
    data,
  })
}

function postEditPaper(data) {
  return request({
    url: '/Survey/UpdataSurvey',
    method: 'post',
    // 传递的参数
    data,
  })
}
function getChatGpt(id) {
  return request({
    url: '/Survey/GetSurveyAnalysis',
    method: 'post',
    // 传递的参数
    data: {
      surveyId: id,
    },
  })
}

export const paperInfo = {
  getPaperInfoById,
  postCreatePaper,
  postEditPaper,
  getChatGpt,
}
