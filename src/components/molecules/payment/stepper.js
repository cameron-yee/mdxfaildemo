import React, { Component } from 'react'

import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import './stepper.scss'

const Stepper = class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      steps: ["Select Payment", "Payment Info", "Pay"]
    }
  }

  componentDidUpdate(prevProps) {
    if(prevProps.creditOrBank !== this.props.creditOrBank) {
      if(this.props.creditOrBank === 'Credit') {
        this.setState({steps:  ["Select Payment", "Select Card", "Pay"]})
      } else if(this.props.creditOrBank === 'Bank') {
        this.setState({steps:  ["Select Payment", "Enter Bank Info", "Pay"]})
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
                  <Col key={`step-${i}`} xs={4} data-stepper={i} onClick={(e) => this.setStage(e)} className={`d-flex justify-content-center step active step-${i}`}>
                    <div>{words}</div>
                  </Col>
                )
              } else if(i < this.props.maxStage) {
                return (
                  <Col key={`step-${i}`} xs={4} data-stepper={i} onClick={(e) => this.setStage(e)} className={`d-flex justify-content-center step done step-${i}`}>
                    <div><i className="far fa-check-square"></i>&nbsp;{words}</div>
                  </Col>
                )
              } else {
                return (
                  <Col key={`step-${i}`} xs={4} data-stepper={i} onClick={(e) => this.setStage(e)} className={`d-flex justify-content-center step step-${i}`}>
                    <div>{words}</div>
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