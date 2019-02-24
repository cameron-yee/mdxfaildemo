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

import './work-with-us.scss'


const WorkWithUsPage = class extends Component {
  constructor(props) {
    super(props)

    this.state = {
      accordionPanels: {
        collapseOne: {
          expanded: true
        },
        collapseTwo: {
          expanded: false
        },
        collapseThree: {
          expanded: false
        },
        collapseFour: {
          expanded: false
        }
      }
    }

    // this.handleChangeExpandedState = this.handleChangeExpandedState.bind(this)
  }

  handleChangeExpandedState = (event) => {
    const key = event.target.id
    this.setState(prevState => ({
      accordionPanels: {
        ...prevState.accordionPanels,
        [key]: {
          expanded: !prevState.accordionPanels[key].expanded
        },
      },
    }), 
    function () {
      console.log(key)
      console.log(this.state.accordionPanels[key].expanded)
      console.log(this.state.accordionPanels)
    })
  }

  componentDidMount() {
    if(this.props.location.hash) {
      this.setState({filter_hash: this.props.location.hash})
    }
  }

  render() {
    return (
      <Layout location={this.props.location}>
        <SEO title="Work With Us" />
        <Container>
          <PageTitle title="Work With Us" />
          <Row style={{ marginBottom: '2rem' }}>
            <Col>
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
                    id="collapseOne"
                    onClick={this.handleChangeExpandedState}
                  >
                    Instructional Materials Division
                  </button>
                  <div
                    id="collapseOne"
                    className={
                      this.state.accordionPanels.collapseOne.expanded ? 'collapse show' : 'collapse'
                    }
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
                    id="collapseTwo"
                    onClick={this.handleChangeExpandedState}
                  >
                    Division of Professional Learning
                  </button>
                  <div
                    id="collapseTwo"
                    className={
                      this.state.accordionPanels.collapseTwo.expanded ? 'collapse show' : 'collapse'
                    }
                    aria-labelledby="headingTwo"
                    data-parent="#accordion"
                  >
                    <div className="card-body">
                      <h3>Our Capabilities</h3>
                      <ul>
                        <li>
                          <ul>Deliver proven-effective STeLLA (hyperlink) teacher professional learning program
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
                    id="collapseThree"
                    onClick={this.handleChangeExpandedState}
                  >
                    Division of Research
                  </button>
                  <div
                    id="collapseThree"
                    className={
                      this.state.accordionPanels.collapseThree.expanded ? 'collapse show' : 'collapse'
                    }
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
                    id="collapseFour"
                    onClick={this.handleChangeExpandedState}
                  >
                    Our Partners &amp; Collaborators
                  </button>
                  <div
                    id="collapseFour"
                    className={
                      this.state.accordionPanels.collapseFour.expanded ? 'collapse show' : 'collapse'
                    }
                    aria-labelledby="headingFour"
                    data-parent="#accordion"
                  >
                    <div className="card-body">

                    </div>
                  </div>
                </div>
              </div>

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
