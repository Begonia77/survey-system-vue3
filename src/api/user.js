import request from '../util/request'

function postRegisterUser(name, password) {
  return request({
    url: '/user/RegisterCheck',
    method: 'post',
    // 传递的参数
    data: {
      name,
      password,
    },
  })
}

function postLoginUser(name, password) {
  return request({
    url: '/user/Log_inCheck',
    method: 'post',
    // 传递的参数
    data: {
      name,
      password,
    },
  })
}

export const User = {
  postRegisterUser,
  postLoginUser,
}
