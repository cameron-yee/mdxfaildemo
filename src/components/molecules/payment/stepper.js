import React, { Component } from 'react'

import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import './stepper.scss'

const Stepper = class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      number_of_steps: 3,
      steps: ["Select Payment", "Payment Info", "Pay"]
    }
  }

  componentDidUpdate(prevProps) {
    if(prevProps.creditOrBank !== this.props.creditOrBank || prevProps.bankStatus !== this.props.bankStatus) {
      if(this.props.creditOrBank === 'Credit') {
        this.setState({steps: ["Select Payment", "Select Card", "Pay"], number_of_steps: 3})
      } else if(this.props.creditOrBank === 'Bank') {
        if(this.props.bankStatus === null) {
          this.setState({steps: ["Select Payment", "Select Bank", "Enter Bank Info", "Verify Bank Micro Transactions", "Pay"], number_of_steps: 5})
        } else if(this.props.bankStatus === 'SavedBankNotVerified') {
          this.setState({steps: ["Select Payment", "Select Bank", "Verify Bank Micro Transactions", "Pay"], number_of_steps: 4})
        } else if(this.props.bankStatus === 'SavedBankVerified') {
          this.setState({steps: ["Select Payment", "Select Bank", "Pay"], number_of_steps: 3})
        }
      }
    }
  }

  setStage = (e) => {
    e.preventDefault()

    let step = e.target.getAttribute('data-stepper') || e.target.parentNode.getAttribute('data-stepper')
    console.log(step)
    console.log(this.props.maxStage)
    if(step <= this.props.maxStage) {
      this.props.setStage(parseInt(step))
    }
  }

  render() {
    return (
      <Container>
        <Row>
          {
            this.state.steps.map((words, i) => {
              if(i === this.props.stage) {
                return (
                  <Col
                    key={`step-${i}`}
                    xs={12/this.state.number_of_steps}
                    data-stepper={i}
                    onClick={(e) => this.setStage(e)}
                    className={`d-flex justify-content-center step active step-${i} steps-${this.state.number_of_steps}`}
                  >
                    <div className="d-flex align-items-center">{words}</div>
                  </Col>
                )
              } else if(i < this.props.maxStage) {
                return (
                  <Col
                    key={`step-${i}`}
                    xs={12/this.state.number_of_steps}
                    data-stepper={i}
                    onClick={(e) => this.setStage(e)}
                    className={`d-flex justify-content-center step done step-${i} steps-${this.state.number_of_steps}`}
                  >
                    <div className="d-flex align-items-center"><i className="far fa-check-square"></i>&nbsp;{words}</div>
                  </Col>
                )
              } else {
                return (
                  <Col
                    key={`step-${i}`}
                    xs={12/this.state.number_of_steps}
                    data-stepper={i}
                    onClick={(e) => this.setStage(e)}
                    className={`d-flex justify-content-center step step-${i} steps-${this.state.number_of_steps}`}
                  >
                    <div className="d-flex align-items-center">{words}</div>
                  </Col>
                )
              }
            })
          }
        </Row>
      </Container>
    )
  }
}

export default Stepper