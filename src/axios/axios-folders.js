import Axios from 'axios'

export default Axios.create({
  baseURL: 'https://tasks-8f93f.firebaseio.com/'
})