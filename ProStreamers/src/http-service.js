import axios from 'axios'
import Cookies from 'js-cookie'

// Create an instance of axios with default configuration
const http = axios.create({
  baseURL: 'http://api.chrisouboter.com/api/', // Adjust this to your API base URL
  headers: {
    'Content-Type': 'application/json'
  }
})

http.interceptors.request.use(
  (config) => {
    const csrfToken = axios.get('http://api.chrisouboter.com/csrf')
    if (csrfToken) {
      console.log(JSON.stringify(csrfToken))
      console.log('csrftoken: ' + csrfToken.csrfToken)
      config.headers['X-CSRF-TOKEN'] = csrfToken.csrfToken // Add CSRF token to headers
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default http
