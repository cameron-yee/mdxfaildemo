import axios from 'axios'

const createAndPayOrder = (cancelToken, source_id, sku, metadata, shipping=null) => {
  // eslint-disable-next-line
  let formatted_metadata = JSON.stringify(metadata).replace(/\"([^(\")"]+)\":/g,"$1:")

  if(!shipping) {
    return axios({
      url: "http://127.0.0.1:4000",
      method: "post",
      cancelToken: cancelToken.token,
      withCredentials: true, //Must include this to send cookies
      data: {
        query: `
          query {
            createAndPayStripeCustomerOrder(
              sourceId: "${source_id}",
              sku: "${sku}",
              metadata: ${formatted_metadata},
            ) {
              id
              charge
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
  } else {
    return axios({
      url: "http://127.0.0.1:4000",
      method: "post",
      cancelToken: cancelToken.token,
      withCredentials: true, //Must include this to send cookies
      data: {
        query: `
          query {
            createAndPayStripeCustomerOrder(
              city: ${shipping.city},
              country: "US",
              line1: ${shipping.line1},
              metadata: ${formatted_metadata},
              name: ${shipping.name},
              postalCode: ${shipping.postalCode},
              sku: "${sku}",
              sourceId: "${source_id}",
              state: ${shipping.state}
            ) {
              id
              charge
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
}

export default createAndPayOrder
