import request from '../util/request'

function postPaperUnpublish(id) {
  return request({
    url: '/Survey/UpdataSurvey',
    method: 'post',
    // 传递的参数
    data: {
      survey_id: id,
      state: 0,
    },
  })
}

function postPaperPublish(id) {
  return request({
    url: '/Survey/UpdataSurvey',
    method: 'post',
    // 传递的参数
    data: {
      survey_id: id,
      state: 1,
    },
  })
}

function postPaperEnd(id) {
  return request({
    url: '/Survey/UpdataSurvey',
    method: 'post',
    // 传递的参数
    data: {
      survey_id: id,
      state: 2,
    },
  })
}

function postPaperModel(id) {
  return request({
    url: '/Survey/UpdataSurvey',
    method: 'post',
    // 传递的参数
    data: {
      survey_id: id,
      state: 3,
    },
  })
}

function postPaperDelete(id) {
  return request({
    url: '/Survey/UpdataSurvey',
    method: 'post',
    // 传递的参数
    data: {
      survey_id: id,
      state: 4,
    },
  })
}

export const update = {
  postPaperUnpublish,
  postPaperPublish,
  postPaperEnd,
  postPaperModel,
  postPaperDelete,
}
