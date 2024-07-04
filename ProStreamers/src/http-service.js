import axios from 'axios'
import Cookies from 'js-cookie'

// Create an instance of axios with default configuration
const http = axios.create({
  baseURL: 'https://api.chrisouboter.com/api/', // Adjust this to your API base URL
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add a request interceptor to include CSRF token
http.interceptors.request.use(
  (config) => {
    const csrfToken = Cookies.get('XSRF-TOKEN') // Fetch CSRF token from cookies
    if (csrfToken) {
      config.headers['X-CSRF-TOKEN'] = csrfToken // Add CSRF token to headers
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default http
