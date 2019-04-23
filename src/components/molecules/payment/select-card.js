import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import axios from 'axios'

import retrieveStripeCustomerCards from '../../../queries/bscsapi/stripe/retrieve-stripe-customer-cards'
import { async } from 'q';
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
    this.setState({cards: cards})
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
    // if(card_id !== 'new-card') {
      // let card_info_list = card_info.split(',')
      // console.log(card_info_list)
      // this.props.setCardInfo(card_info_list[0], card_info_list[1])
    this.props.setCardId(card_id)
    // } else {
    //   this.props.setCardInfo(card_info, card_info)
    // }
  }

  render() {
    return (
      <React.Fragment>
        {!this.state.cards &&
          <Spinner animation="grow" variant="primary" />
        }
        {this.state.cards &&
          <React.Fragment>
            <Form onSubmit={(e) => this.setCardId(e)}>
              <Form.Group>
                {
                  this.state.cards.data.data.retrieveStripeCustomerCards.data.map((card, index) => {
                    if(card.id === this.props.defaultCard) {
                      return(
                        <React.Fragment key={`card-${index}`}>
                          <Form.Check
                            custom
                            inline="true"
                            type="radio"
                            id={`${card.id}`}
                            label={`**** **** **** ${card.last4}`}
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
                            label={`**** **** **** ${card.last4}`}
                            name="customer-cards"
                          />
                        </React.Fragment>
                      )
                    }
                  })
                }
                <Form.Check
                  custom
                  type="radio"
                  id="new-card"
                  label="New Card"
                  // defaultChecked
                  name="customer-cards"
                />
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
