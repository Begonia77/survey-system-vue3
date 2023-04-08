import request from '../util/request'

function InsertQuestion(paperId, questionType, questionTitle, questionOptions) {
  return request({
    url: '/Question/InsertQuestion',
    method: 'post',
    // 传递的参数
    data: {
      survey_id: id,
    },
  })
}

export const topics = {
  getPaperInfoById,
}
