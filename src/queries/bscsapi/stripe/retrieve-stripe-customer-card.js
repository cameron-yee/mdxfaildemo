import axios from 'axios'

const retrieveStripeCustomerCard = (cancelToken, card_id) => {
  return axios({
    url: "https://bmwapi.bscs.org", //http://127.0.0.1:4000
    method: "post",
    cancelToken: cancelToken.token,
    withCredentials: true, //Must include this to send cookies
    data: {
      query: `
        query {
          retrieveStripeCustomerCard(cardId: "${card_id}") {
            id
            brand
            last4
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

export default retrieveStripeCustomerCard
