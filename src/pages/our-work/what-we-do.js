import React, { Component } from 'react'
import { Link } from 'gatsby'
import { Location } from '@reach/router'
import SEO from '../../components/seo'

import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import Layout from '../../components/layout/layout'
import PageTitle from '../../components/layout/page-title/page-title'
import SpecificContactForm from '../../components/atoms/specific-contact-form/specific-contact-form'

import './what-we-do.scss'
import Button from 'react-bootstrap/Button';


const WhatWeDoPage = class extends Component {
  // constructor(props) {
  //   super(props)

  //   this.state = {
  //     accordionPanels: {
  //       collapseOne: {
  //         expanded: true
  //       },
  //       collapseTwo: {
  //         expanded: false
  //       },
  //       collapseThree: {
  //         expanded: false
  //       },
  //       collapseFour: {
  //         expanded: false
  //       }
  //     }
  //   }

  //   // this.handleChangeExpandedState = this.handleChangeExpandedState.bind(this)
  // }

  // handleChangeExpandedState = (event) => {
  //   const key = event.target.id
  //   this.setState(prevState => ({
  //     accordionPanels: {
  //       ...prevState.accordionPanels,
  //       [key]: {
  //         expanded: !prevState.accordionPanels[key].expanded
  //       },
  //     },
  //   }), 
  //   function () {
  //     console.log(key)
  //     console.log(this.state.accordionPanels[key].expanded)
  //     console.log(this.state.accordionPanels)
  //   })
  // }

  state={
    collapseID: "",
    collapseOneHeight: "",
    collapseTwoHeight: "",
    collapseThreeHeight: "",
    collapseFourHeight: ""
  }

  toggleCollapse = (collapseID) => {
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ""
    }))
  }

  componentDidMount() {
    if(this.props.location.hash) {
      this.setState({filter_hash: this.props.location.hash})
    }

    window.setTimeout(() => {
      const el1 = document.getElementById("collapseOne")
      const collapseOneHeight = el1.scrollHeight
      
      const el2 = document.getElementById("collapseTwo")
      const collapseTwoHeight = el2.scrollHeight
      
      const el3 = document.getElementById("collapseThree")
      const collapseThreeHeight = el3.scrollHeight

      const el4 = document.getElementById("collapseFour")
      const collapseFourHeight = el4.scrollHeight
      
      // console.log(collapseOneHeight)
      // console.log(collapseTwoHeight)
      // console.log(collapseThreeHeight)
      // console.log(collapseFourHeight)

      this.setState({
				collapseOneHeight,
				collapseTwoHeight,
				collapseThreeHeight,
				collapseFourHeight
			})
    }, 333)
  }

  render() {
    const {
      collapseID,
      collapseOneHeight,
      collapseTwoHeight,
      collapseThreeHeight,
      collapseFourHeight
    } = this.state
    const collapseOneHeightStyle = {
      maxHeight: collapseID === "collapseOne" ? `${collapseOneHeight}px` : '0px'
    }
    const collapseTwoHeightStyle = {
      maxHeight: collapseID === "collapseTwo" ? `${collapseTwoHeight}px` : '0px'
    }
    const collapseThreeHeightStyle = {
      maxHeight: collapseID === "collapseThree" ? `${collapseThreeHeight}px` : '0px'
    }
    const collapseFourHeightStyle = {
      maxHeight: collapseID === "collapseFour" ? `${collapseFourHeight}px` : '0px'
    }
    return (
      <Layout location={this.props.location}>
        <SEO title="Work With Us" />
        <Container>
          <PageTitle title="Work With Us" />
          <Row style={{ marginBottom: '2rem' }}>
            <Col>
              <p>
              At BSCS Science Learning, we are on a mission to transform science education nationwide. This means creating impact that is both systemic and sustainable. And we accomplish this goal through <strong>four areas</strong> of work.
              </p>
            </Col>
          </Row>
          <Row style={{ marginBottom: '2rem' }}>
            <Col>
              <div className="accordion" id="accordion">

                <div className="card accordion-card">
                  <button
                    className="btn btn-link accordion-button"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                    onClick={() => this.toggleCollapse("collapseOne")}
                  >
                    <div className="d-flex">
                      <div className="mr-auto">
                        <h2
                          style={{
                            marginBottom: '0',
                            lineHeight: '1.5'
                          }}
                        >
                          Instructional Materials Development
                        </h2>
                      </div>
                      <div className="ml-auto">
                        <i
                          className={
                            collapseID === "collapseOne"
                            ?
                            "fa fa-angle-down counterclockwise-180"
                            :
                            "fa fa-angle-down clockwise-to-zero"
                          }
                        />
                      </div>
                    </div>
                  </button>
                  <div
                    id="collapseOne"
                    className={
                      collapseID === "collapseOne"
                      ? 
                      'collapse accordionCollapse show' 
                      : 
                      'collapse accordionCollapse'
                    }
                    style={ collapseOneHeightStyle }
                    aria-labelledby="headingOne"
                    data-parent="#accordion"
                  >
                    <div className="card-body">
                      <p>For teachers to be successful in the classroom, they must have access to high quality instructional materials. We leverage research insights and current industry standards to produce reliable curricula, as we’ve done since our earliest days.</p>

                      <p>Our process begins with experimentation across small-scale settings. And based on our learnings from initial market tests and evaluations, we develop materials for broad dissemination.</p>

                      <p>In today’s world, we primarily focus on developing NGSS-based, online, and highly interactive materials that meet the needs of increasingly diverse student populations.</p>
                    </div>
                  </div>
                </div>

                <div className="card accordion-card">
                  <button
                    className="btn btn-link collapsed accordion-button"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                    onClick={() => this.toggleCollapse("collapseTwo")}
                  >
                    <div className="d-flex">
                      <div className="mr-auto">
                        <h2
                          style={{
                            marginBottom: '0',
                            lineHeight: '1.5'
                          }}
                        >
                          Teacher Professional Learning
                        </h2>
                      </div>
                      <div className="ml-auto">
                        <i
                          className={
                            collapseID === "collapseTwo"
                            ?
                            "fa fa-angle-down counterclockwise-180"
                            :
                            "fa fa-angle-down clockwise-to-zero"
                          }
                        />
                      </div>
                    </div>
                  </button>
                  <div
                    id="collapseTwo"
                    className={
                      collapseID === "collapseTwo" 
                      ? 
                      'collapse accordionCollapse show' 
                      : 
                      'collapse accordionCollapse'
                    }
                    style={ collapseTwoHeightStyle }
                    aria-labelledby="headingTwo"
                    data-parent="#accordion"
                  >
                    <div className="card-body">
                      <p>A thriving science education system depends on high quality professional learning opportunities for teachers. We are recognized for our signature approach to professional development, resulting from our 15-year line of research on how teachers and students learn science.</p>

                      <p>Our approach to professional learning is proving to be powerful in both teacher preparation and continuing education programs; in district-wide programs and in programs enrolling individual teachers; in programs for elementary, middle, and high school teachers; and in programs facilitated in person and online.</p>
                    </div>
                  </div>
                </div>

                <div className="card accordion-card">
                  <button
                    className="btn btn-link collapsed accordion-button"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                    onClick={() => this.toggleCollapse("collapseThree")}
                  >
                    <div className="d-flex">
                      <div className="mr-auto">
                        <h2
                          style={{
                            marginBottom: '0',
                            lineHeight: '1.5'
                          }}
                        >
                          Leadership Development
                        </h2>
                      </div>
                      <div className="ml-auto">
                        <i
                          className={
                            collapseID === "collapseThree"
                            ?
                            "fa fa-angle-down counterclockwise-180"
                            :
                            "fa fa-angle-down clockwise-to-zero"
                          }
                        />
                      </div>
                    </div>
                  </button>
                  <div
                    id="collapseThree"
                    className={
                      collapseID === "collapseThree" 
                      ? 
                      'collapse accordionCollapse show' 
                      : 
                      'collapse accordionCollapse'
                    }
                    style={ collapseThreeHeightStyle }
                    aria-labelledby="headingThree"
                    data-parent="#accordion"
                  >
                    <div className="card-body">
                      <p>Support from the state level to the classroom level is needed to transform science education. That’s why we are committed to system-wide leadership development. We create and deliver research-driven programs that prepare schools, districts, and states to implement stronger systems and policies for science teaching and learning.</p>

                      <p>Our programs provide education leaders with <strong>high quality professional learning</strong> opportunities and support in selecting and implementing <strong>high quality instructional materials</strong>. As industry research indicates, both components are essential for effective science instruction</p>
                    </div>
                  </div>
                </div>

                <div className="card accordion-card">
                  <button
                    className="btn btn-link collapsed accordion-button"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseFour"
                    aria-expanded="false"
                    aria-controls="collapseFour"
                    onClick={() => this.toggleCollapse("collapseFour")}
                  >
                    <div className="d-flex">
                      <div className="mr-auto">
                        <h2
                          style={{
                            marginBottom: '0',
                            lineHeight: '1.5'
                          }}
                        >
                          Research
                        </h2>
                      </div>
                      <div className="ml-auto">
                        <i
                          className={
                            collapseID === "collapseFour"
                            ?
                            "fa fa-angle-down counterclockwise-180"
                            :
                            "fa fa-angle-down clockwise-to-zero" 
                          }
                        />
                      </div>
                    </div>
                  </button>
                  <div
                    id="collapseFour"
                    className={
                      collapseID === "collapseFour" 
                      ? 
                      'collapse accordionCollapse show' 
                      : 
                      'collapse accordionCollapse'
                    }
                    style={ collapseFourHeightStyle }
                    aria-labelledby="headingFour"
                    data-parent="#accordion"
                  >
                    <div className="card-body">
                      <p>Our work begins and ends with research. We conduct a variety of studies for a deeper understanding of how teachers and students learn science. Our evaluations span from studies of our own interventions across schools and districts to big-picture analyses across the greater science education landscape.</p>

                      <p>This ongoing research allows us to explore the effectiveness of our instructional materials, professional learning, and leadership programs while informing our future innovation. Ultimately, we deliver enhanced products and services in more robust, research-informed settings.</p>
                    </div>
                  </div>
                </div>
              </div>

            </Col>
          </Row>
          <Row style={{ marginBottom: '2rem' }}>
            <Col xs={12} className="d-flex justify-content-center">
              <h3 className="p-2">Our Model for Transforming Science Education</h3>
            </Col>
            <Col xs={12} className="d-flex justify-content-center">
              <img src="BLA" alt="BSCS’s four areas of work: Leadership Development, Teacher Professional Learning, Instructional Materials, and Research. Leadership Development is important for the state, district, and school levels, while Teacher Professional Learning and Instructional Materials are important for the classroom level. Research and innovation are involved in each area of work." />
            </Col>
          </Row>
          <Row style={{ marginBottom: '2rem' }}>
            <Col xs={12} className="d-flex justify-content-center">
              <h3 className="p-2">Our Work in Action</h3>
            </Col>
            {/* <Col className="d-flex">
              <Link to="/resources/educator-resource-center" style={{width: '100%'}}><Button variant="outline-secondary" style={{width: '100%', minHeight: '100%', margin: '1rem'}}><h3>Educator Resource Center</h3></Button></Link>
              <Link to="/our-work/rd-programs" style={{width: '100%'}}><Button variant="outline-secondary" style={{width: '100%', minHeight: '100%', margin: '1rem'}}><h3>R&amp;D Programs</h3></Button></Link>
            </Col> */}
            <Col style={{padding: '0.5rem'}}><Link to="/resources/educator-resource-center" style={{width: '100%'}}><Button variant="outline-secondary" style={{width: '100%', minHeight: '6rem', height: '100%'}}><h3>Educator Resource Center</h3></Button></Link></Col>
            <Col style={{padding: '0.5rem'}}><Link to="/our-work/rd-programs" style={{width: '100%'}}><Button variant="outline-secondary" style={{width: '100%', minHeight: '6rem', height: '100%'}}><h3>R&amp;D Programs</h3></Button></Link></Col>
          </Row>
          <Row>
            <Col>
              <p><strong>Interested in partnering with us or hiring us to support your science education advancement efforts? Let’s explore how we can <Link to="/connect/work-with-us">work together</Link>.</strong></p>
              {/* <p style={{color: 'black', fontWeight: '500'}}>Interested in partnering with us or hiring us to support your science education advancement efforts? Let’s explore how we can <Link to="/connect/work-with-us">work together</Link>.</p> */}
            </Col>
          </Row>
        </Container>
      </Layout>

    )
  }
}

export default props => (
  <Location>
    {locationProps => <WhatWeDoPage {...locationProps} {...props} />}
  </Location>
)
