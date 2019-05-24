import axios from 'axios'

const register = (cancelToken, address, city, email, firstname, lastname, password, phone, state, zipcode) => {
  return axios({
    url: "https://bmwapi.bscs.org", //http://127.0.0.1:4000
    method: "post",
    cancelToken: cancelToken.token,
    withCredentials: true, //Must include this to send cookies
    data: {
      //Not doing "${...}" because of null values.  Set this in state.
      query: `
        mutation {
          register(
            address1: ${address}
            city: ${city}
            email: ${email}
            firstName: ${firstname}
            lastName: ${lastname}
            password: ${password}
            phoneNumber: ${phone}
            state: ${state}
            zipCode: ${zipcode}
          ) {
            user {
              address1
              city
              email
              firstName
              lastName
              password
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
