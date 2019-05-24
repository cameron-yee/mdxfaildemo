import axios from 'axios'

const signin = (cancelToken, email, password) => {
  return axios({
    url: "https://bmwapi.bscs.org", //http://127.0.0.1:4000
    method: "post",
    cancelToken: cancelToken.token,
    withCredentials: true, //Must include this to send cookies
    data: {
      query: `
        mutation {
          login(email: "${email}", password: "${password}") {
            user {
              id,
              email
            }
          }
        }
      `
    }
  })
  .then(response => {
    return response
  })
  .catch(error => {
    axios.isCancel(error) ? console.log(`Request canceled: ${error}`) : console.log(error)
  })
}

export default signin
