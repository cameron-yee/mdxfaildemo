import axios from 'axios'

const updateCustomerDonationSubscription = (cancelToken, amount, plan_id, source_id, subscription_id) => {
  return axios({
    url: "http://127.0.0.1:4000",
    method: "post",
    cancelToken: cancelToken.token,
    withCredentials: true, //Must include this to send cookies
    data: {
      query: `
        query {
          updateStripeCustomerDonationSubscription(
            amount: "${amount}",
            planId: "${plan_id}",
            sourceId: "${source_id}",
            subscriptionId: "${subscription_id}"
          ) {
            id
            customer
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

export default updateCustomerDonationSubscription
