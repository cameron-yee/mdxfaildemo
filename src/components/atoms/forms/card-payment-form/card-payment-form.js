import React, { Component } from 'react'

import Button from 'react-bootstrap/Button'

import {CardElement, injectStripe} from 'react-stripe-elements'

import axios from 'axios'


const CardPaymentForm = class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      complete: false
    }

    this.cancelToken = axios.CancelToken.source()
  }

  componentWillUnmount() {
    try {
      this.cancelToken.cancel()
    } catch(error) {
      console.log(error);
    }
  }

  submit = async (e) => {
    let { token } = await this.props.stripe.createToken({name: "Name"})

    axios({
      url: "http://127.0.0.1:4000",
      method: "post",
      // headers: {"Content-Type": "text/plain"},
      // body: token.id
      cancelToken: this.cancelToken.token,
      withCredentials: true, //Must include this to send cookies
      data: {
        query: `
          query {
            createStripeCustomerCard(tokenId: "${token.id}") {
              id
            }
          }
          `
      }
    })
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      axios.isCancel(error) ? console.log(`Request canceled: ${error}`) : console.log(error)
    })
  }

  render() {
    if(this.state.complete) {
      return (<p>Purchase complete</p>)
    } else {
      return (
        <div className="checkout">
          <p>Would you like to complete the purchase?</p>
          <CardElement
            style={{
              base: {
                color: "#32325D",
                fontWeight: 500,
                fontFamily: "Inter UI, Open Sans, Segoe UI, sans-serif",
                fontSize: "16px",
                fontSmoothing: "antialiased",

                "::placeholder": {
                  color: "#CFD7DF"
                }
              },
              invalid: {
                color: "#E25950"
              }
            }}
          />
          <Button onClick={this.submit} style={{marginTop: '1rem'}}>Pay Now</Button>
        </div>
      )
    }
  }
}

export default injectStripe(CardPaymentForm)