import axios from 'axios'

const createAndPayOrder = (cancelToken, source_id, sku, metadata) => {
  let formatted_metadata = JSON.stringify(metadata).replace(/\"([^(\")"]+)\":/g,"$1:")

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
}

export default createAndPayOrder
