import React, { Component } from 'react'

import axios from 'axios'

import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

import deleteCustomerCard from '../../../../queries/bscsapi/stripe/delete-customer-card';

// import './charge-new-card.scss'

/* DeleteCard functions
*
* constructor(props) {...}
* componentWillUnmount() {...}
* handleDelete = async (e) => {...}
* render() {...}
*
*/

const DeleteCard = class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: false,
      loading: false,
      successfully_deleted: false
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

  handleDelete = async (e) => {
    e.preventDefault()

    this.setState({loading: true})

    deleteCustomerCard(
      this.cancelToken,
      this.props.card_id,
    )
      .then(response => {
        if(response.status === 200 && !response.data.errors) {
          this.setState({successfully_deleted: true, loading: false})
          this.props.refreshPaymentMethods()
        } else {
          this.setState({errors: true, loading: false })
        }
      }).catch(error => {
        axios.isCancel(error) ? console.log(`Request canceled: ${error}`) : console.log(error)
      })
}

  render() {
    return (
      <React.Fragment>
        {!this.state.loading && !this.state.successfully_deleted && !this.state.errors &&
          <div className="checkout">
            <p>Are you sure you want to delete this card?</p>
            <div className="d-flex justify-content-center mt-3">
              {!this.state.loading && !this.state.errors && !this.state.successfully_deleted &&
                <Button variant="danger" onClick={(e) => this.handleDelete(e)} style={{marginTop: '1rem'}}>Delete Card</Button>
              }
            </div>
          </div>
        }
        {this.state.errors && !this.state.successfully_deleted &&
          <div className="d-flex justify-content-center">
            <p>Error. Card could not be deleted.</p>
          </div>
        }
        {this.state.loading &&
          <div className="d-flex justify-content-center">
            <p>Deleting Card</p>
            <Spinner animation="grow" variant="primary" />
          </div>
        }
        {!this.state.errors && this.state.successfully_deleted &&
          <div className="d-flex justify-content-center">
            <p>Card successfully deleted.</p>
          </div>
        }
      </React.Fragment>
    )
  }
}

export default DeleteCard
