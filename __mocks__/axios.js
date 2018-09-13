let data = {}
let requestedUrl = ""
let body = {}
let config = {}

export function setMockResponse(mockData) {
  data = mockData
}

export function getRequestBody() {
  return body
}

export function getRequestConfig() {
  return config
}

export function getRequestedUrl() {
  return requestedUrl
}

export default {
  get: url => {
    requestedUrl = url
    return new Promise(resolve => resolve(data))
  },

  post: (url, postBody, postConfig) => {
    requestedUrl = url
    body = postBody
    config = postConfig
    return new Promise(resolve => resolve(data))
  },

  put: (url, _body) => {
    requestedUrl = url
    body = _body
    return new Promise(resolve => resolve(data))
  },

  delete: url => {
    requestedUrl = url
  }
}
