import React, { Component } from 'react'

import axios from 'axios'

import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

import './charge-new-card.scss'

import deleteCustomerCard from '../../../../queries/bscsapi/stripe/delete-customer-card';


const DeleteCard = class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      errors: false,
      successfullyDeleted: false
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
      this.props.cardId,
    )
      .then(response => {
        if(response.status === 200 && !response.data.errors) {
          this.setState({successfullyDeleted: true, loading: false})
          console.log(response)
        } else {
          this.setState({errors: true, loading: false })
          console.log(response)
        }
      }).catch(error => {
        axios.isCancel(error) ? console.log(`Request canceled: ${error}`) : console.log(error)
      })
  }

  render() {
    return (
      <React.Fragment>
        {!this.state.loading && !this.state.successfullyDeleted && !this.state.errors &&
          <div className="checkout">
            <p>Are you sure you want to delete this card?</p>
            <div className="d-flex justify-content-center mt-3">
              {!this.state.loading && !this.state.errors && !this.state.successfullyDeleted &&
                <Button variant="danger" onClick={(e) => this.handleDelete(e)} style={{marginTop: '1rem'}}>Delete Card</Button>
              }
            </div>
          </div>
        }
        {this.state.errors && !this.state.successfullyDeleted &&
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
        {!this.state.errors && this.state.successfullyDeleted &&
          <div className="d-flex justify-content-center">
            <p>Card successfully deleted.</p>
          </div>
        }
      </React.Fragment>
    )
  }
}

export default DeleteCard
