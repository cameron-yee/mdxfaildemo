import axios from 'axios'

const getUserInfo = (cancelToken) => {
  return axios({
    url: "http://127.0.0.1:4000",
    method: "post",
    cancelToken: cancelToken.token,
    withCredentials: true, //Must include this to send cookies
    data: {
      query: `
        query {
          me {
            id,
            firstName,
            lastName,
            email,
            stripeId,
            address1,
            city,
            state,
            zipCode
          }
        }
        `
    }
  })
  .then(response => {
    // console.log(response)
    return response
  })
  .catch(error => {
    axios.isCancel(error) ? console.log(`Request canceled: ${error}`) : console.log(error)
  })
}

export default getUserInfo