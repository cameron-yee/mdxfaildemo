import axios from 'axios'

const verifyCustomerBank = (cancelToken, bank_id, amount_one, amount_two) => {
  return axios({
    url: "https://bmwapi.bscs.org", //http://127.0.0.1:4000
    method: "post",
    cancelToken: cancelToken.token,
    withCredentials: true, //Must include this to send cookies
    data: {
      query: `
        query {
          verifyStripeCustomerBank(bankId: "${bank_id}", amountOne: ${amount_one}, amountTwo: ${amount_two}) {
            id
            status
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

export default verifyCustomerBank
