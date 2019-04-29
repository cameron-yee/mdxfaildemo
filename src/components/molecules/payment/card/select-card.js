import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import axios from 'axios'

import retrieveStripeCustomerCards from '../../../../queries/bscsapi/stripe/retrieve-stripe-customer-cards'
import Spinner from 'react-bootstrap/Spinner'

const SelectCard = class extends Component {
  constructor(props) {
    super(props)
    this.cancelToken = axios.CancelToken.source()
    this.state = {
      cards: null
    }
  }

  componentDidMount() {
    this.getUserCards()
  }

  getUserCards = async () => {
    let cards = await retrieveStripeCustomerCards(this.cancelToken)
    console.log(cards)
    if(cards.data.data.retrieveStripeCustomerCards !== null) {
      this.setState({cards: cards})
    } else {
      this.setState({cards: null})
    }
  }

  componentWillUnmount() {
    try {
      this.cancelToken.cancel()
    } catch(error) {
      console.log(error);
    }
  }

  // getCardInfo = () => {
  getCardId = () => {
    let cards = document.getElementsByName('customer-cards')
    for(let i = 0; i < cards.length; i++) {
      if(cards[i].checked) {
        return cards[i].id
      }
    }
  }

  // setCardInfo = (e) => {
  setCardId = (e) => {
    e.preventDefault()

    let card_id = this.getCardId()
    this.props.setCardId(card_id)
  }

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
                    console.log(this.props.defaultCard)
                    console.log(index)
                    console.log('hit')
                    if(card.id === this.props.defaultCard) {
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
                {!this.props.defaultCard && this.props.allowNew &&
                  <Form.Check
                    custom
                    type="radio"
                    id="new-card"
                    label="New Card"
                    defaultChecked
                    name="customer-cards"
                  />
                }
                {this.props.defaultCard && this.props.allowNew &&
                  <Form.Check
                    custom
                    type="radio"
                    id="new-card"
                    label="New Card"
                    name="customer-cards"
                  />
                }
              </Form.Group>
              <div className="d-flex justify-content-center">
                <Button variant="outline-primary" type="submit">Use this card</Button>
              </div>
            </Form>
          </React.Fragment>
        }
      </React.Fragment>
      )
    }
}

export default SelectCard
