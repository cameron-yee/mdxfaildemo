import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'

const CreditOrBank = class extends Component {
  render() {
    return (
      <React.Fragment>
        {/* <Alert variant="warning"><i className="fas fa-exclamation-triangle"></i>&nbsp;Love the work we do? Then make your donation go further! Setting up gifts through your checking account maximizes your donation to the fullest by avoiding the transaction and processing fees often associated with credit cards. As an independent nonprofit, we appreciate your generosity and support!</Alert> */}
        {this.props.encourage_ach &&
          <p>Love the work we do? Then make your donation go further! Setting up gifts through your checking account maximizes your donation to the fullest by avoiding the transaction and processing fees often associated with credit cards. As an independent nonprofit, we appreciate your generosity and support!</p>
        }
        <div className="d-flex justify-content-center flex-wrap">
          <Button className="m-2" variant="outline-primary" onClick={() => this.props.setCreditOrBank('Credit')}>Credit</Button>
          <Button className="m-2" variant="outline-primary" onClick={() => this.props.setCreditOrBank('Bank')}>Bank</Button>
        </div>
      </React.Fragment>
    )
  }
}

export default CreditOrBank