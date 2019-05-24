import axios from 'axios'

const deleteCustomerCard = (cancelToken, cardId) => {
  return axios({
    url: "https://bmwapi.bscs.org", //http://127.0.0.1:4000
    method: "post",
    cancelToken: cancelToken.token,
    withCredentials: true, //Must include this to send cookies
    data: {
      query: `
        query {
          deleteStripeCustomerCard(
            cardId: "${cardId}",
          ) {
            id
            object
            deleted
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

export default deleteCustomerCard
