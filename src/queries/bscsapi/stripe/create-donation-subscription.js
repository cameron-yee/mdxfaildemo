import axios from 'axios'

const createDonationSubscription = (cancelToken, amount, source_id, frequency) => {
  return axios({
    url: "http://127.0.0.1:4000",
    method: "post",
    cancelToken: cancelToken.token,
    withCredentials: true, //Must include this to send cookies
    data: {
      query: `
        query {
          createStripeDonationSubscription(amount: ${amount}, defaultSource: "${source_id}", quantity: "${frequency}") {
            id
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

export default createDonationSubscription
