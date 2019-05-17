import axios from 'axios'

const updateUserInfo = (cancelToken, address, city, email, first_name, last_name, password, phone, state, zip_code) => {
  return axios({
    url: "http://127.0.0.1:4000",
    method: "post",
    cancelToken: cancelToken.token,
    withCredentials: true, //Must include this to send cookies
    data: {
      //Not doing "${...}" because of null values.  Set this in state.
      query: `
        mutation {
          updateMe(
            address1: ${address},
            city: ${city},
            email: ${email},
            firstName: ${first_name},
            lastName: ${last_name},
            password: ${password},
            phoneNumber: ${phone},
            state: ${state},
            zipCode: ${zip_code}
          ) {
            user {
              address1
              city
              email
              firstName
              id
              lastName
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
    // console.log(response)
    return response
  })
  .catch(error => {
    axios.isCancel(error) ? console.log(`Request canceled: ${error}`) : console.log(error)
  })
}

export default updateUserInfo