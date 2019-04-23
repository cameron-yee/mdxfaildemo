import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import axios from 'axios'

import getCustomerCards from '../../../queries/bscsapi/stripe/get-customer-cards'
import { async } from 'q';

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
    let cards = await getCustomerCards(this.cancelToken)
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

  getCardInfo = () => {
    let cards = document.getElementsByName('customer-cards')
    for(let i = 0; i < cards.length; i++) {
      if(cards[i].checked) {
        return cards[i].id
      }
    }
  }

  setCardInfo = (e) => {
    e.preventDefault()

    let card_info = this.getCardInfo()
    console.log(card_info)
    if(card_info !== 'new-card') {
      let card_info_list = card_info.split(',')
      console.log(card_info_list)
      this.props.setCardInfo(card_info_list[0], card_info_list[1])
    } else {
      this.props.setCardInfo(card_info, card_info)
    }
  }

  render() {
    return (
      <React.Fragment>
        {!this.state.cards &&
          <p>Loading</p>
        }
        {this.state.cards &&
          <React.Fragment>
            <Form onSubmit={(e) => this.setCardInfo(e)}>
              <Form.Group>
                {
                  this.state.cards.data.data.retrieveStripeCustomerCards.data.map((card, index) => {
                    return(
                      <React.Fragment key={`card-${index}`}>
                        <Form.Check
                          custom
                          type="radio"
                          id={`${card.id},${card.last4}`}
                          label={`**** **** **** ${card.last4}`}
                          // defaultChecked
                          name="customer-cards"
                        />
                      </React.Fragment>
                    )
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
              <Button variant="outline-primary" type="submit">Use this card.</Button>
            </Form>
          </React.Fragment>
        }
      </React.Fragment>
      )
    }
}

export default SelectCard
