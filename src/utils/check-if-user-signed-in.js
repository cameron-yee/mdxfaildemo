import getUserInfo from '../queries/bscsapi/get-user-info'

const checkIfUserSignedIn = async (axiosCancelToken) => {
  const userInfoResponse = getUserInfo(axiosCancelToken)

  return userInfoResponse
    .then(response => {
      console.log(response)
      if(response !== undefined && response.status === 200 && !response.data.errors) {
        console.log('User signed in')
        console.log(response.data.data.me)
        // return response.data.data.me
        return true
      } else {
        console.log('User not signed in')
        return false
      }
    })
}

export default checkIfUserSignedIn