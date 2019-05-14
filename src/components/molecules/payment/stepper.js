import React, { Component } from 'react'

import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import './stepper.scss'

/* Stepper functions
*
* setStage = (e) => {...}
* render() {...}
*
*/

const Stepper = class extends Component {
  setStage = (e) => {
    let step
    e.preventDefault()

    step =
      e.target.getAttribute('data-stepper') ||
      e.target.parentNode.getAttribute('data-stepper') ||
      e.target.parentNode.parentNode.getAttribute('data-stepper')

    if(step <= this.props.max_stage) {
      console.log(step)
      this.props.setStage(parseInt(step))
    }
    // } else {
    //   console.log('h')
    //   if(index <= this.props.max_stage) {
    //     console.log(index)
    //     this.props.setStage(index)
    //   }
    // }
  }

  render() {
    return (
      <Container>
        <Row>
          {
            this.props.steps.map((words, i) => {
              if(i === this.props.stage) {
                return (
                  <Col
                    key={`step-${i}`}
                    xs={12/this.props.number_of_steps}
                    data-stepper={i}
                    onClick={(e) => this.setStage(e)}
                    className={`d-flex justify-content-center step active step-${i} steps-${this.props.number_of_steps}`}
                  >
                    <div className="d-flex align-items-center">{words}</div>
                  </Col>
                )
              } else if(i < this.props.max_stage) {
                return (
                  <Col
                    key={`step-${i}`}
                    xs={12/this.props.number_of_steps}
                    data-stepper={i}
                    onClick={(e) => this.setStage(e)}
                    className={`d-flex justify-content-center step done step-${i} steps-${this.props.number_of_steps}`}
                  >
                    {!this.props.no_checks &&
                      <div
                        className="d-flex align-items-center"
                      >
                        <i
                          onClick={(e) => {this.setStage(e)}}
                          className="far fa-check-square"
                          style={{padding: '10px'}}
                        ></i>
                        {words}
                      </div>
                    }
                    {this.props.no_checks &&
                      <div className="d-flex align-items-center">{words}</div>
                    }
                  </Col>
                )
              } else {
                return (
                  <Col
                    key={`step-${i}`}
                    xs={12/this.props.number_of_steps}
                    data-stepper={i}
                    onClick={(e) => this.setStage(e)}
                    className={`d-flex justify-content-center step step-${i} steps-${this.props.number_of_steps}`}
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