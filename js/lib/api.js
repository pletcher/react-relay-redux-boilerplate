export default {
  get(url) {
    return this.req(url, { method: 'GET' })
  },

  post(url, data) {
    return this.req(url, {
      body: JSON.stringify(data),
      method: 'POST'
    })
  },

  put(url, data) {
    return this.req(url, {
      body: JSON.stringify(data),
      method: 'PUT'
    })
  },

  req(url, options) {
    return fetch(url, {
      ...options,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      }
    }).then(handleError).then(resp => {
      if (resp.status === 204) {
        return resp
      }

      return resp.json()
    })
  }
}

const status = {
  400: (resp) => {
    return resp.json().then(json => {
      throw json
    })
  },

  401: (resp) => {
    return resp.json().then(json => {
      throw json
    })
  },

  404: () => {
    throw new Error('404')
  },

  500: (resp) => {
    resp.json().then(json => {
      throw new Error('API Error: ' + json.error)
    })
  }
}

function handleError(resp) {
  return (status[resp.status] && status[resp.status](resp)) || resp
}
