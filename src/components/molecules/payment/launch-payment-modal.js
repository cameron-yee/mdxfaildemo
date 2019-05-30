import React, { Component } from 'react'

const LaunchPaymentModal = class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      donate: false
    }
  }

  componentDidMount() {
    this.checkDonate()
  }

  checkDonate = () => {
    if(this.props.donate) {
      this.setState({donate: true})
    }
  }

  render() {
    return (
      <React.Fragment>
        <span
          variant="outline-primary"
          onClick={() => this.props.launchPayment(this.state.donate)}
          className={this.props.childrenclass}
        >
          {this.props.children}
        </span>
      </React.Fragment>
    )
  }
}

export default LaunchPaymentModal

