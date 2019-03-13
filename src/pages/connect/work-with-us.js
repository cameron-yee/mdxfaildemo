import React, { Component } from 'react'
import { Link } from 'gatsby'
import { Location } from '@reach/router'
import SEO from '../../components/seo'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import Layout from '../../components/layout/layout'
import PageTitle from '../../components/layout/page-title/page-title'
import SpecificContactForm from '../../components/atoms/specific-contact-form/specific-contact-form'

import './work-with-us.scss'


const WorkWithUsPage = class extends Component {
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

  state = {
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
      const collapseOneHeight = document.getElementById("collapseOne").scrollHeight
      const collapseTwoHeight = document.getElementById("collapseTwo").scrollHeight
      const collapseThreeHeight = document.getElementById("collapseThree").scrollHeight
      const collapseFourHeight = document.getElementById("collapseFour").scrollHeight

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
          <Row>
            <Col style={{marginBottom: '1rem'}}>
              <p>
                BSCS Science Learning is an independent nonprofit dedicated to transforming science education through research-driven innovation. We create instructional materials, provide professional learning programs for teachers, spearhead leadership development programs for schools and districts, and conduct research on how to improve science teaching and learning.
              </p>
              <p>
                <Link to="/what-we-do">What we do</Link> falls within three BSCS divisions: Instructional Materials, Professional Learning, and Research.
              </p>
              <p>
                See below to learn more about our capabilities. We invite you to connect with our division directors to explore opportunities to work together!
              </p>
            </Col>
          </Row>
          <Row className="d-flex flex-wrap-reverse" style={{ marginBottom: '2rem' }}>
            <Col className="p-2" lg={9}>
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
                          Instructional Materials Division
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
                      <h3>Our Capabilities</h3>
                      <ul>
                        <li>Develop research-based science materials for broad dissemination
                          <ul>
                            <li>Produce K-12 curricula across all science disciplines</li>
                            <li>Create digital, highly interactive curriculum units</li>
                            <li>Update materials for Next Generation Science Standards (NGSS) alignment</li>
                          </ul>
                        </li>
                        <li>Collaborate with curriculum development partners
                          <ul>
                            <li>Produce new, NGSS-based curricula</li>
                            <li>Field-test curriculum units with science teachers</li>
                            <li>Review science instructional materials for coherence and NGSS alignment</li>
                            <li>Customize science content material for specific locations and contexts</li>
                            <li>Design and contribute content for open-source science instructional materials</li>
                          </ul>
                        </li>
                      </ul>
                      <p>Please contact BSCS Instructional Materials Division Director, <SpecificContactForm sendto="Lindsey Mohan">Dr. Lindsey Mohan</SpecificContactForm>, to discuss opportunities to work together.</p>
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
                          Division of Professional Learning
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
                      <h3>Our Capabilities</h3>
                      <ul>
                        <li>Deliver proven-effective STeLLA (hyperlink) teacher professional learning program
                          <ul>
                            <li>Support teachers in using high-leverage science teaching strategies through video-based lesson analysis</li>
                            <li>Work closely with teachers over the course of one school year</li>
                          </ul>
                        </li>
                        <li>
                          <ul>
                            <li>inservice teachers, preservice teachers, and education leaders;</li>
                            <li>lower elementary, upper elementary, middle school, high school, and postsecondary grade levels;</li>
                            <li>schools and districts in urban and rural locations; and</li>
                            <li>face-to-face and/or facilitated online learning settings.</li>
                          </ul>
                        </li>
                        <li>
                          <ul>
                            <li>Support educators and leaders in navigating the standards and effectively implementing 3-D, phenomena/problem-driven teaching and learning</li>
                            <li>Prepare educators and leaders to evaluate, select, and implement instructional materials designed for next generation science</li>
                          </ul>
                        </li>
                      </ul>
                      <p>Interested in <Link to="/upcoming-programs/teacher-professional-learning">teacher professional learning</Link> or <Link to="/upcoming-programs/leadership-development">leadership development</Link>? Register now for upcoming programs or check out our <Link to="/educator-resource-center">Educator Resource Center</Link>.</p>
                      <p>Please contact BSCS Associate Director for Strategic Partnerships &amp; Professional Learning, <SpecificContactForm sendto="Jody Bintz">Jody Bintz</SpecificContactForm>, to discuss opportunities to work together.</p>
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
                          Division of Research
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
                      <h3>Our Capabilities</h3>
                      <ul>
                        <li>
                          <ul>Rigorous intervention research
                            <li>Randomized controlled trials at the district, school, and classroom levels</li>
                            <li>Quasi-experiments at district, school, and classroom levels</li>
                            <li>All science disciplines</li>
                            <li>K-12, postsecondary, and inservice teacher participants</li>
                            <li>Multiple outcome domains: content knowledge for teachers and students, three-dimensional assessments, teacher classroom practice, and pedagogical content knowledge</li>
                          </ul>
                        </li>
                        <li>
                          <ul>Synthesis and quantitative meta-analysis
                            <li>Small- or large-scale reviews</li>
                            <li>Traditional quantitative methods</li>
                            <li>Meta-regression, including robust variance estimation</li>
                            <li>Creation of online applications to share findings with a wide audience</li>
                          </ul>
                        </li>
                        <li>
                          <ul>Design-based research and field trials
                            <li>Rapid design/test/revise iterations</li>
                            <li>Data collection from multiple stakeholders to inform development and revision efforts</li>
                          </ul>
                        </li>
                        <li>
                          <ul>External evaluations
                            <li>Comprehensive process evaluations</li>
                            <li>Complete reports to funding agencies</li>
                          </ul>
                        </li>
                      </ul>
                      <p>Please contact BSCS Research Division Directors, <SpecificContactForm sendto="Susan Kowalski">Dr. Susan Kowalski</SpecificContactForm> and <SpecificContactForm sendto="Chris Wilson">Dr. Chris Wilson</SpecificContactForm>, to discuss opportunities to work together.</p>
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
                          Our Partners &amp; Collaborators
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

                    </div>
                  </div>
                </div>
              </div>

            </Col>
            <Col className="p-2" lg={3}>
              <Card>
                <Card.Body>
                  <Card.Title>Contact Division Director</Card.Title>
                  <Card.Text style={{fontSize: '1rem'}}>
                    Please contact the appropriate division director to discuss opportunities to work together:
                    <strong>BSCS Instructional Materials Division Director</strong>
                  </Card.Text>
                  <div className="d-flex justify-content-center">
                    <div className="p-2">
                      <SpecificContactForm sendto="Lindsey Mohan">
                        <Button size="sm" variant="outline-primary" style={{minHeight: '60px'}}>Contact Dr. Lindsey Mohan</Button>
                      </SpecificContactForm>
                    </div>
                  </div>
                  <Card.Text style={{fontSize: '1rem', marginTop: '1rem'}}>
                    <strong>BSCS Associate Director for Strategic Partnerships &amp; Professional Learning</strong>
                  </Card.Text>
                  <div className="d-flex justify-content-center">
                    <div className="p-2">
                      <SpecificContactForm sendto="Jody Bintz">
                        <Button size="sm" variant="outline-primary" style={{minHeight: '60px'}}>Contact Jody Bintz</Button>
                      </SpecificContactForm>
                    </div>
                  </div>
                  <Card.Text style={{fontSize: '1rem', marginTop: '1rem'}}>
                    <strong>BSCS Research Division Directors</strong>
                  </Card.Text>
                  <div className="d-flex justify-content-center flex-wrap">
                    <div className="p-2">
                      <SpecificContactForm sendto="Susan Kowalski">
                        <Button size="sm" variant="outline-primary" style={{minHeight: '60px'}}>Contact Dr. Susan Kowalski</Button>
                      </SpecificContactForm>
                    </div>
                    <div className="p-2">
                      <SpecificContactForm sendto="Chris Wilson">
                        <Button size="sm" variant="outline-primary" style={{minHeight: '60px'}}>Contact Dr. Chris Wilson</Button>
                      </SpecificContactForm>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Layout>

    )
  }
}

export default props => (
  <Location>
    {locationProps => <WorkWithUsPage {...locationProps} {...props} />}
  </Location>
)
