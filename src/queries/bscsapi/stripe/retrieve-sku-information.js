import axios from 'axios'

const retrieveSkuInformation = (cancelToken, sku_id) => {
  return axios({
    url: "https://bmwapi.bscs.org", //http://127.0.0.1:4000
    method: "post",
    cancelToken: cancelToken.token,
    withCredentials: true, //Must include this to send cookies
    data: {
      query: `
        query {
          retrieveStripeSku(skuId: "${sku_id}") {
            id
            image
            inventory {
              quantity
            }
            price
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

export default retrieveSkuInformation
