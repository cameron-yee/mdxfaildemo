import axios from 'axios'

const signout = (cancelToken) => {
  return axios({
    url: "http://127.0.0.1:4000",
    method: "post",
    cancelToken: cancelToken.token,
    withCredentials: true, //Must include this to send cookies
    data: {
      query: `
        mutation {
          logout
        }
        `
    }
  })
  .then(response => {
    console.log(response.data.data)
    return response.data.data
  })
  .catch(error => {
    axios.isCancel(error) ? console.log(`Request canceled: ${error}`) : console.log(error)
  })
}

export default signout
