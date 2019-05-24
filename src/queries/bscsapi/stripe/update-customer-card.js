import axios from 'axios'

const updateCustomerCard = (cancelToken, cardId, address_city, address_country, address_line1, address_state, address_zip, exp_month, exp_year, name) => {
  return axios({
    url: "https://bmwapi.bscs.org", //http://127.0.0.1:4000
    method: "post",
    cancelToken: cancelToken.token,
    withCredentials: true, //Must include this to send cookies
    data: {
      query: `
        query {
          updateStripeCustomerCard(
            cardId: "${cardId}",
            addressCity: "${address_city}",
            addressCountry: "${address_country}",
            addressLine1: "${address_line1}",
            addressState: "${address_state}",
            addressZip: "${address_zip}",
            expMonth: ${exp_month},
            expYear: ${exp_year},
            name: "${name}"
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

export default updateCustomerCard
