const ONE_DAY = 24 * 60 * 60 * 1000

export default {
  get(name) {
    const cookieName = `${name}=`
    const cookies = document.cookie.split(';')

    for (let i = 0, l = cookies.length; i < l; i++) {
      let cookie = cookies[i]

      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1)
      }

      if (cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length)
      }
    }

    return null
  },

  delete(name) {
    this.set(name, "", -1)
  },

  set(name, value, expiration) {
    const date = new Date()

    date.setTime(date.getTime() + ((expiration || 365) * ONE_DAY))

    document.cookie = `${name}=${value}; expires=${date.toGMTString()}; path=/`
  }
}
