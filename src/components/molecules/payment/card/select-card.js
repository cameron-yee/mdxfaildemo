import React, { Component } from 'react'

import axios from 'axios'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'

import retrieveStripeCustomerCards from '../../../../queries/bscsapi/stripe/retrieve-stripe-customer-cards'

/* SelectCard functions
*
* constructor(props) {...}
* componentDidMount() {...}
* getUserCards = async () => {
* getCardId = () => {...}
* setCardId = (e) => {...}
* render() {...}
*
*/

const SelectCard = class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: null
    }

    this.cancelToken = axios.CancelToken.source()
  }

//Lifecycle hooks
  componentDidMount() {
    this.getUserCards()
  }

  componentWillUnmount() {
    try {
      this.cancelToken.cancel()
    } catch(error) {
      console.log(error);
    }
  }
//End lifecycle hooks

//Custom functions
  getUserCards = async () => {
    let cards

    cards = await retrieveStripeCustomerCards(this.cancelToken)
    console.log(cards)
    if(cards && cards.data.data.retrieveStripeCustomerCards !== null) {
      this.setState({cards: cards})
    } else {
      this.setState({cards: null})
    }
  }

  getCardId = () => {
    let cards

    cards = document.getElementsByName('customer-cards');
    for(let i = 0; i < cards.length; i++) {
      if(cards[i].checked) {
        return cards[i].id
      }
    }
  }

  setCardId = (e) => {
    let card_id

    e.preventDefault()

    card_id = this.getCardId()
    this.props.setCardId(card_id)
  }
//End custom functions

  render() {
    return (
      <React.Fragment>
        {!this.state.cards && this.state.cards !== null &&
          <div className="d-flex justify-content-center">
            <Spinner animation="grow" variant="primary" />
          </div>
        }
        {(this.state.cards || this.state.cards === null) &&
          <React.Fragment>
            <Form onSubmit={(e) => this.setCardId(e)}>
              <Form.Group>
                { this.state.cards !== null &&
                  this.state.cards.data.data.retrieveStripeCustomerCards.data.map((card, index) => {
                    if(card.id === this.props.default_card) {
                      return(
                        <React.Fragment key={`card-${index}`}>
                          <Form.Check
                            custom
                            inline="true"
                            type="radio"
                            id={`${card.id}`}
                            label={`•••• •••• •••• ${card.last4}`}
                            defaultChecked
                            name="customer-cards"
                          />
                          <span className="badge badge-pill badge-primary">DEFAULT</span>
                        </React.Fragment>
                      )
                    } else {
                      return(
                        <React.Fragment key={`card-${index}`}>
                          <Form.Check
                            custom
                            type="radio"
                            id={`${card.id}`}
                            label={`•••• •••• •••• ${card.last4}`}
                            name="customer-cards"
                          />
                        </React.Fragment>
                      )
                    }
                  })
                }
                {!this.props.default_card && this.props.allow_new &&
                  <Form.Check
                    custom
                    type="radio"
                    id="new-card"
                    label="New Card"
                    defaultChecked
                    name="customer-cards"
                  />
                }
                {this.props.default_card && this.props.allow_new &&
                  <Form.Check
                    custom
                    type="radio"
                    id="new-card"
                    label="New Card"
                    name="customer-cards"
                  />
                }
              </Form.Group>
              {!this.props.delete &&
                <div className="d-flex justify-content-center">
                  <Button variant="outline-primary" type="submit">Use this card</Button>
                </div>
              }
              {this.props.delete &&
                <div className="d-flex justify-content-center">
                  <Button variant="outline-primary" type="submit">Delete card</Button>
                </div>
              }
            </Form>
          </React.Fragment>
        }
      </React.Fragment>
      )
    }
}

export default SelectCard
