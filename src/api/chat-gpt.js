import request from '../util/request'

function postChatGptChoice(keyword) {
  return request({
    url: '/generate/choice',
    method: 'post',
    data: {
      prompt: keyword,
    },
  })
}
function postChatGptFill(keyword) {
  return request({
    url: '/generate/cloze',
    method: 'post',
    data: {
      prompt: keyword,
    },
  })
}
function postChatGptNewPaper(keyword, num) {
  return request({
    url: '/Survey/generateSurvey',
    method: 'post',
    data: {
      prompt: keyword,
      count: num,
    },
  })
}

export const chatGpt = {
  postChatGptChoice,
  postChatGptFill,
  postChatGptNewPaper,
}
