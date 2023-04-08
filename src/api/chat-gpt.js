import request from '../util/request'

function postChatGptQs(keyword) {
  return request({
    url: '/generate',
    method: 'post',
    data: {
      prompt: keyword,
    },
  })
}

export const chatGpt = {
  postChatGptQs,
}
