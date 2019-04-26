import axios from 'axios'

const register = (cancelToken, address, city, email, firstname, lastname, password, phone, state, zipcode) => {
  return axios({
    url: "http://127.0.0.1:4000",
    method: "post",
    cancelToken: cancelToken.token,
    withCredentials: true, //Must include this to send cookies
    data: {
      query: `
        mutation {
          register(
            email: ${email}
            password: ${password}
            address1: ${address}
            phoneNumber: ${phone}
            firstName: ${firstname}
            lastName: ${lastname}
            city: ${city}
            state: ${state}
            zipCode: ${zipcode}
          ) {
            user {
              email
              firstName
              lastName
              password
              address1
              city
              state
              stripeId
              zipCode
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

export default register
