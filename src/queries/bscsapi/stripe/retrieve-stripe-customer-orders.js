import axios from 'axios'

const retrieveStripeCustomerOrders = (cancelToken) => {
  return axios({
    url: "http://127.0.0.1:4000",
    method: "post",
    cancelToken: cancelToken.token,
    withCredentials: true, //Must include this to send cookies
    data: {
      query: `
        query {
          retrieveStripeCustomerOrders {
            object
            data {
              id
              items {
                amount
                description
                parent
              }
              metadata {
                contact
                date
              }
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

export default retrieveStripeCustomerOrders
