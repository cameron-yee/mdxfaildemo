import axios from 'axios'

const createDonationSubscription = (cancelToken, amount, frequency, fund_code, source_id) => {
  return axios({
    url: "https://bmwapi.bscs.org", //http://127.0.0.1:4000
    method: "post",
    cancelToken: cancelToken.token,
    withCredentials: true, //Must include this to send cookies
    data: {
      query: `
        query {
          createStripeCustomerDonationSubscription(
            amount: ${amount},
            frequency: "${frequency}",
            fundCode: "${fund_code}",
            sourceId: "${source_id}"
          ) {
            id
            status
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
