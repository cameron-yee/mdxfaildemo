import axios from 'axios'

const retrieveStripeCustomerDonationSubscriptions = (cancelToken) => {
  return axios({
    url: "https://bmwapi.bscs.org", //http://127.0.0.1:4000
    method: "post",
    cancelToken: cancelToken.token,
    withCredentials: true, //Must include this to send cookies
    data: {
      query: `
        query {
          retrieveStripeCustomerDonationSubscriptions {
            data {
              id
              default_source
              cancel_at_period_end
              items {
                data {
                  created
                  quantity
                  plan {
                    interval
                    nickname
                  }
                }
              }
            }
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

export default retrieveStripeCustomerDonationSubscriptions
