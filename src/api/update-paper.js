import request from '../util/request'

function postPaperUnpublish(id) {
  return request({
    url: '/Survey/UpdateSurveyState',
    method: 'post',
    // 传递的参数
    data: {
      surveyId: id,
      state: 0,
    },
  })
}

function postPaperPublish(id) {
  return request({
    url: '/Survey/UpdateSurveyState',
    method: 'post',
    // 传递的参数
    data: {
      surveyId: id,
      state: 1,
    },
  })
}

function postPaperEnd(id) {
  return request({
    url: '/Survey/UpdateSurveyState',
    method: 'post',
    // 传递的参数
    data: {
      surveyId: id,
      state: 2,
    },
  })
}

function postPaperModel(id) {
  return request({
    url: '/Survey/UpdateSurveyState',
    method: 'post',
    // 传递的参数
    data: {
      surveyId: id,
      state: 3,
    },
  })
}

function postPaperDelete(id) {
  return request({
    url: '/Survey/UpdateSurveyState',
    method: 'post',
    // 传递的参数
    data: {
      surveyId: id,
      state: 0,
    },
  })
}

function postNewModel(model) {
  return request({
    url: '/Survey/CreateTemplate',
    method: 'post',
    // 传递的参数
    data: model,
  })
}

export const update = {
  postPaperUnpublish,
  postPaperPublish,
  postPaperEnd,
  postPaperModel,
  postPaperDelete,
  postNewModel,
}
