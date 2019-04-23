import axios from 'axios'

const createCharge = (cancelToken, amount, card_id, description) => {
  return axios({
    url: "http://127.0.0.1:4000",
    method: "post",
    cancelToken: cancelToken.token,
    withCredentials: true, //Must include this to send cookies
    data: {
      query: `
        query {
          createStripeCharge(amount: ${amount}, cardId: "${card_id}", description: "${description}") {
            id
            amount
            description
            customer
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

export default createCharge
