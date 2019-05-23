import axios from 'axios'

const cancelCustomerDonationSubscriptionAtEndOfPeriod = (cancelToken, subscription_id) => {
  return axios({
    url: "http://127.0.0.1:4000",
    method: "post",
    cancelToken: cancelToken.token,
    withCredentials: true, //Must include this to send cookies
    data: {
      query: `
        query {
          cancelStripeCustomerDonationSubscriptionAtEndOfPeriod(
            subscriptionId: "${subscription_id}"
          ) {
            id
            cancel_at_period_end
          }
        }
      `
    }
  })
  .then(response => {
    console.log(response)
    return response
  })
  .catch(error => {
    axios.isCancel(error) ? console.log(`Request canceled: ${error}`) : console.log(error)
  })
}

export default cancelCustomerDonationSubscriptionAtEndOfPeriod
