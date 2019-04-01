import React, { Component } from 'react'
import { graphql, Link } from 'gatsby'
import { Location } from '@reach/router'

import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'

import Layout from '../components/layout/layout'
import PageTitle from '../components/layout/page-title/page-title'
import SEO from '../components/seo'

import './upcoming-programs.scss'

import ReactPlaceholder from 'react-placeholder'
import 'react-placeholder/lib/reactPlaceholder.css'

import ftoLogo from '../images/educator-resource-center/classroom-instruction.svg'
import tplLogo from '../images/educator-resource-center/professional-learning.svg'
import ldLogo from '../images/educator-resource-center/district-planning.svg'

// import logo from '../../images/bscs_logo.svg'
// import SearchBy from '../../components/atoms/search-by/search-by'
// import FilterByDropdown from '../../components/molecules/filter-by/filter-by-dropdown/filter-by-dropdown'
// import FilterByRow from '../../components/molecules/filter-by/filter-by-row/filter-by-row'
// import ResourceCategories from '../../components/molecules/resource-categories/resource-categories'

const UpcomingProgramsPage = class extends Component {
  constructor(props) {
    super(props)
    if(props.data.allMdx) {
      this.programs = props.data.allMdx.edges
    } else {
      this.programs = []
    }

    this.images_loaded = 0
    this.state = {
      imagesLoaded: false,
      tplPrograms: false,
      ldPrograms: false,
      ftoPrograms: false
    }
  }

  componentDidMount() {
    setTimeout(() => {
      if(this.state.imagesLoaded !== true) {
        this.setState({imagesLoaded: true})
      }
    },
    3000)

    const tpl_images = document.getElementsByClassName('up-card-img')
    for(let i = 0; i < tpl_images.length; i++) {
      if(tpl_images[i].complete && this.images_loaded !== tpl_images.length) {
        this.loaded()
      }
    }

    this.checkIfProgramsExist()
  }

  loaded = () => {
    const tpl_images = document.getElementsByClassName('up-card-img')
    if(this.images_loaded < tpl_images.length) {
      this.images_loaded = this.images_loaded + 1
    } else {
      return
    }

    if(this.images_loaded === tpl_images.length && this.state.imagesLoaded !== true) {
      this.setState({imagesLoaded: true})
    }
  }

  checkIfProgramsExist = () => {
    let tpl = false
    let ld = false
    let fto = false
    for(let i = 0; i < this.programs.length; i++) {
      if(this.programs[i].node.frontmatter.type === 'Teacher Professional Learning') {
        tpl = true
      } else if(this.programs[i].node.frontmatter.type === 'Leadership Development') {
        ld = true
      } else if(this.programs[i].node.frontmatter.type === 'Field-Test Opportunities') {
        fto = true
      }
    }
    this.setState({tplPrograms: tpl, ldPrograms: ld, ftoPrograms: fto})
  }

  render() {
    return (
      <React.Fragment>
        <SEO
          title="BSCS’s upcoming opportunities for teachers and leaders"
          description="Science educators can register now for BSCS’s upcoming professional learning, leadership development, and field-test programs."
          canonical="https://bscs.org/upcoming-programs/"
        />
        <Layout location={this.props.location}>
          <section className="section" style={{ padding: '.75rem 1.5rem' }}>
            <Container>
              <PageTitle title="Upcoming Programs" />
              <Row className="justify-content-center" style={{marginBottom: '5rem'}}>
                <Col xs={12} style={{marginBottom: '2rem'}}>
                  <p><strong>Find upcoming programs in the following areas:</strong></p>
                </Col>
                <Col xs={6} sm={5} md={3}>
                  <div
                    className={`categoryImageParent professional-learning`}
                    onClick={(e) => document.getElementById('teacher-professional-learning').scrollIntoView({behavior: "smooth", block: "start"})}
                  >
                    <div
                      className="d-flex flex-row justify-content-center"
                    >
                        <div
                          className={`rounded-circle p-3 categoryImageChild professional-learning`}
                          // className={`p-3 categoryImageChild professional-learning`}
                        >
                          <img
                            className="categoryImageGrandChild"
                            src={tplLogo}
                            alt="TEST"
                          />
                        </div>
                    </div>
                    <div className="d-flex flex-row justify-content-center">
                      <p className="mt-3 mt-md-3 mt-lg-3 mb-md-0" style={{textAlign: 'center', fontSize: '1.5rem', lineHeight: '1.1'}}>
                        Teacher Professional Learning
                      </p>
                    </div>
                  </div>
                </Col>
                <Col xs={6} sm={5} md={3}>
                  <div
                    className={`categoryImageParent district-planning`}
                    onClick={(e) => document.getElementById('leadership-development').scrollIntoView({behavior: "smooth", block: "start"})}
                  >
                    <div
                      className="d-flex flex-row justify-content-center"
                    >
                        <div
                          className={`rounded-circle p-3 categoryImageChild district-planning`}
                        >
                          <img
                            className="categoryImageGrandChild"
                            src={ldLogo}
                            alt="TEST"
                          />
                        </div>
                    </div>
                    <div className="d-flex flex-row justify-content-center">
                      <p className="mt-3 mt-md-3 mt-lg-3 mb-md-0" style={{textAlign: 'center', fontSize: '1.5rem', lineHeight: '1.1'}}>
                        Leadership Development
                      </p>
                    </div>
                  </div>
                </Col>
                <Col xs={6} sm={5} md={3}>
                  <div
                    className={`categoryImageParent classroom-instruction`}
                    onClick={(e) => document.getElementById('field-test-opportunities').scrollIntoView({behavior: "smooth", block: "start"})}
                  >
                    <div
                      className="d-flex flex-row justify-content-center"
                    >
                        <div
                          className={`rounded-circle p-3 categoryImageChild classroom-instruction`}
                        >
                          <img
                            className="categoryImageGrandChild"
                            src={ftoLogo}
                            alt="TEST"
                          />
                        </div>
                    </div>
                    <div className="d-flex flex-row justify-content-center">
                      <p className="mt-3 mt-md-3 mt-lg-3 mb-md-0" style={{textAlign: 'center', fontSize: '1.5rem', lineHeight: '1.1'}}>
                        Field-Test Opportunities
                      </p>
                    </div>
                  </div>
                </Col>
              </Row>
              <h2 id="teacher-professional-learning">Teacher Professional Learning</h2>
              <Row style={{ marginBottom: '2rem' }}>
                <Col>
                  <p>
                    Are you a teacher who is looking to enhance your science content knowledge or instructional practices? Would you like a deeper understanding of the Next Generation Science Standards (NGSS)? Have you heard about our signature <Link to="/our-work/rd-programs/science-teachers-learning-from-lesson-analysis-stella">STeLLA</Link> approach and want to learn how to use high-leverage science teaching strategies through video-based lesson analysis?
                  </p>
                  <p>
                    BSCS Science Learning offers a wide range of professional learning opportunities for teachers. See what’s currently available below. If we do not presently offer a relevant opportunity for you, please feel free to reach out about how you can <Link to="/connect/work-with-us/">work with us</Link> in the future.
                  </p>
                </Col>
              </Row>
            </Container>
          </section>
          <section className="section">
            <Container>
              <Row style={{ marginBottom: '3rem' }}>
                { !this.state.tplPrograms &&
                  <Col>
                    <Alert variant="secondary">There are no upcoming teacher professional learning programs at this time.</Alert>
                  </Col>
                }
                { this.programs &&
                  // eslint-disable-next-line
                  this.programs.map((edge, index) => {
                    // let data_filter = JSON.parse(JSON.stringify(edge.node.frontmatter))
                    // data_filter['excerpt'] = edge.node.excerpt
                    if(edge.node.frontmatter.type === 'Teacher Professional Learning') {
                      return(
                        <Col
                          lg={4}
                          key={`up-${index}`}
                          className="up-card-col"
                        >
                          {/* <Card id={`resource-${index}`} className="up-card" data-filter={JSON.stringify(data_filter)} data-type={edge.node.frontmatter.type}> */}
                          <Card id={`program-${index}`} className="up-card h-100">
                            <Card.Img
                              className="up-card-img"
                              variant="top"
                              src={edge.node.frontmatter.image}
                              alt={edge.node.frontmatter.alt}
                              onLoad={this.loaded}
                              style={{display: 'none'}}
                            />
                            <ReactPlaceholder
                              type='rect'
                              ready={this.state.imagesLoaded}
                              // color='#E0E0E0'
                              // color='rgb(41, 52, 118)'
                              showLoadingAnimation={true}
                              // style={{width: '349.984px', height: '653.078px', borderRadius: '4px'}}
                              style={{
                                // width: '349.984px',
                                height: '350px',
                                width: '100%',
                                borderTopLeftRadius: '4px',
                                borderTopRightRadius: '4px'

                              }}
                            >
                              <Card.Img
                                className="up-card-img"
                                variant="top"
                                src={edge.node.frontmatter.image}
                                alt={edge.node.frontmatter.alt}
                                style={{
                                  minHeight: '260.98px',
                                  backgroundColor: 'rgba(205, 205, 205, .5)',
                                  borderTopLeftRadius: '4px',
                                  borderTopRightRadius: '4px'
                                }}
                              />
                            </ReactPlaceholder>
                            <Card.Body>
                              <Card.Title
                                style={{
                                  marginBottom: '1.5rem'
                                }}
                              >
                                {edge.node.frontmatter.title}
                              </Card.Title>
                              <Card.Text
                                className="up-excerpt"
                                style={{
                                  marginBottom: '2rem'
                                }}
                              >
                                {edge.node.frontmatter.cardDescription}
                                {!edge.node.frontmatter.cardDescription && edge.node.excerpt}
                              </Card.Text>
                            </Card.Body>
                              <Card.Footer
                                style={{
                                  background: 'white',
                                  borderTop: 'none',
                                  marginBottom: '.5rem'
                                }}
                              >
                                <div className="d-flex">
                                  <div className="ml-auto align-self-end">
                                    <Link
                                      to={`/upcoming-programs/teacher-professional-learning/${edge.node.frontmatter.title.replace(/\s/g, '-').replace(/[^a-zA-Z0-9-]/g, '').toLowerCase()}`}
                                    >
                                      <Button variant="outline-secondary">
                                        More Information
                                      </Button>
                                    </Link>
                                  </div>
                                </div>
                              </Card.Footer>
                          </Card>
                        </Col>
                      )
                    }
                  })
                }
              </Row>
            </Container>
          </section>
          <section className="section" style={{ padding: '.75rem 1.5rem' }}>
            <Container>
              <h2 id="leadership-development">Leadership Development</h2>
              <Row style={{ marginBottom: '2rem' }}>
                <Col>
                  <p>
                    Are you a science education leader or provider of professional learning services who is looking to support teachers’ professional growth? Would you like a deeper understanding of how to help teachers enact the Next Generation Science Standards (NGSS)? Could you benefit from tools and processes that prepare teams of educators to evaluate, select, and implement instructional materials designed for next generation science?
                  </p>
                  <p>
                    BSCS Science Learning offers a wide range of professional learning opportunities for science education leaders and professional learning providers. See what’s currently available below. If we do not presently offer a relevant opportunity for you, please feel free to reach out about how you can <Link to="/connect/work-with-us/">work with us</Link> in the future.
                  </p>
                </Col>
              </Row>
            </Container>
          </section>
          <section className="section">
            <Container>
              <Row style={{ marginBottom: '3rem' }}>
                { !this.state.ldPrograms &&
                  <Col>
                    <Alert variant="secondary">There are no upcoming leadership development programs at this time.</Alert>
                  </Col>
                }
                { this.programs &&
                  // eslint-disable-next-line
                  this.programs.map((edge, index) => {
                    // let data_filter = JSON.parse(JSON.stringify(edge.node.frontmatter))
                    // data_filter['excerpt'] = edge.node.excerpt
                    if(edge.node.frontmatter.type === "Leadership Development") {
                      return(
                        <Col
                          lg={4}
                          key={`up-${index}`}
                          className="up-card-col"
                        >
                          {/* <Card id={`resource-${index}`} className="up-card" data-filter={JSON.stringify(data_filter)} data-type={edge.node.frontmatter.type}> */}
                          <Card id={`program-${index}`} className="up-card h-100">
                            <Card.Img
                              className="up-card-img"
                              variant="top"
                              src={edge.node.frontmatter.image}
                              alt={edge.node.frontmatter.alt}
                              onLoad={this.loaded}
                              style={{display: 'none'}}
                            />
                            <ReactPlaceholder
                              type='rect'
                              ready={this.state.imagesLoaded}
                              // color='#E0E0E0'
                              color='rgb(41, 52, 118)'
                              showLoadingAnimation={true}
                              // style={{width: '349.984px', height: '653.078px', borderRadius: '4px'}}
                              style={{
                                // width: '349.984px',
                                // height: '260.98px',
                                height: '350px',
                                width: '100%',
                                borderTopLeftRadius: '4px',
                                borderTopRightRadius: '4px'

                              }}
                            >
                              <Card.Img
                                className="up-card-img"
                                variant="top"
                                src={edge.node.frontmatter.image}
                                alt={edge.node.frontmatter.alt}
                                style={{
                                  minHeight: '260.98px',
                                  backgroundColor: 'rgba(205, 205, 205, 1)',
                                  borderTopLeftRadius: '4px',
                                  borderTopRightRadius: '4px'
                                }}
                              />
                            </ReactPlaceholder>
                            <Card.Body>
                              <Card.Title
                                style={{
                                  marginBottom: '1.5rem'
                                }}
                              >
                                {edge.node.frontmatter.title}
                              </Card.Title>
                              <Card.Text
                                className="up-excerpt"
                                style={{
                                  marginBottom: '2rem'
                                }}
                              >
                                {edge.node.frontmatter.cardDescription}
                                {!edge.node.frontmatter.cardDescription && edge.node.excerpt}
                              </Card.Text>
                            </Card.Body>
                              <Card.Footer
                                style={{
                                  background: 'white',
                                  borderTop: 'none',
                                  marginBottom: '.5rem'
                                }}
                              >
                                <div className="d-flex">
                                  <div className="ml-auto align-self-end">
                                    <Link
                                      to={`/upcoming-programs/teacher-professional-learning/${edge.node.frontmatter.title.replace(/\s/g, '-').replace(/[^a-zA-Z0-9-]/g, '').toLowerCase()}`}
                                    >
                                      <Button variant="outline-secondary">
                                        More Information
                                      </Button>
                                    </Link>
                                  </div>
                                </div>
                              </Card.Footer>
                          </Card>
                        </Col>
                      )
                    }
                  })
                }
              </Row>
            </Container>
          </section>
          <section className="section" style={{ padding: '.75rem 1.5rem' }}>
            <Container>
              <h2 id="field-test-opportunities">Field-Test Opportunities</h2>
              <Row style={{ marginBottom: '2rem' }}>
                <Col>
                  <p>
                    Are you looking for new K-12 science curriculum materials? Are you interested in newly-developed teacher professional learning programs? Would your school or district be willing to test these materials and approaches in classroom settings?
                  </p>
                  <p>
                    BSCS Science Learning offers a wide range of field-test opportunities for teachers, principals, and district leaders to consider. An important part of our process is to elicit teacher and student feedback on the usability and feasibility of our materials and programs. See what’s currently available below. If we do not presently offer a relevant opportunity for you, please feel free to reach out about how you can <Link to="/connect/work-with-us/">work with us</Link> in the future.
                  </p>
                </Col>
              </Row>
            </Container>
          </section>
          <section className="section">
            <Container>
              <Row style={{ marginBottom: '3rem' }}>
                { !this.state.ftoPrograms &&
                  <Col>
                    <Alert variant="secondary">There are no upcoming field-test opportunities at this time.</Alert>
                  </Col>
                }
                { this.programs &&
                  // eslint-disable-next-line
                  this.programs.map((edge, index) => {
                    // let data_filter = JSON.parse(JSON.stringify(edge.node.frontmatter))
                    // data_filter['excerpt'] = edge.node.excerpt
                    if(edge.node.frontmatter.type === "Field-Test Opportunities") {
                      return(
                        <Col
                          lg={4}
                          key={`up-${index}`}
                          className="up-card-col"
                        >
                          {/* <Card id={`resource-${index}`} className="up-card" data-filter={JSON.stringify(data_filter)} data-type={edge.node.frontmatter.type}> */}
                          <Card id={`program-${index}`} className="up-card h-100">
                            <Card.Img
                              className="up-card-img"
                              variant="top"
                              src={edge.node.frontmatter.image}
                              alt={edge.node.frontmatter.alt}
                              onLoad={this.loaded}
                              style={{display: 'none'}}
                            />
                            <ReactPlaceholder
                              type='rect'
                              ready={this.state.imagesLoaded}
                              // color='#E0E0E0'
                              color='rgb(41, 52, 118)'
                              showLoadingAnimation={true}
                              // style={{width: '349.984px', height: '653.078px', borderRadius: '4px'}}
                              style={{
                                height: '350px',
                                width: '100%',
                                borderTopLeftRadius: '4px',
                                borderTopRightRadius: '4px'

                              }}
                            >
                              <Card.Img
                                className="up-card-img"
                                variant="top"
                                src={edge.node.frontmatter.image}
                                alt={edge.node.frontmatter.alt}
                                style={{
                                  minHeight: '260.98px',
                                  backgroundColor: 'rgba(205, 205, 205, 1)',
                                  borderTopLeftRadius: '4px',
                                  borderTopRightRadius: '4px'
                                }}
                              />
                            </ReactPlaceholder>
                            <Card.Body>
                              <Card.Title
                                style={{
                                  marginBottom: '1.5rem'
                                }}
                              >
                                {edge.node.frontmatter.title}
                              </Card.Title>
                              <Card.Text
                                className="up-excerpt"
                                style={{
                                  marginBottom: '2rem'
                                }}
                              >
                                {edge.node.frontmatter.cardDescription}
                                {!edge.node.frontmatter.cardDescription && edge.node.excerpt}
                              </Card.Text>
                            </Card.Body>
                              <Card.Footer
                                style={{
                                  background: 'white',
                                  borderTop: 'none',
                                  marginBottom: '.5rem'
                                }}
                              >
                                <div className="d-flex">
                                  <div className="ml-auto align-self-end">
                                    <Link
                                      to={`/upcoming-programs/teacher-professional-learning/${edge.node.frontmatter.title.replace(/\s/g, '-').replace(/[^a-zA-Z0-9-]/g, '').toLowerCase()}`}
                                    >
                                      <Button variant="outline-secondary">
                                        More Information
                                      </Button>
                                    </Link>
                                  </div>
                                </div>
                              </Card.Footer>
                          </Card>
                        </Col>
                      )
                    }
                  })
                }
              </Row>
            </Container>
          </section>
        </Layout>
      </React.Fragment>
    )
  }
}

export default props => (
  <Location>
    {locationProps => <UpcomingProgramsPage {...locationProps} {...props} />}
  </Location>
)

export const query = graphql`
{
  allMdx(
    filter: {frontmatter: { page: {eq: "upcoming-programs"}}}
    sort: {
      fields: [frontmatter___sortOrder, frontmatter___date]
    }
  ) {
    edges {
      node {
        excerpt(pruneLength: 200)
        frontmatter {
          alt,
          date(formatString: "MMMM DD, YYYY"),
          additionalTags,
          cardDescription,
          image,
          seoCanonicalUrl,
          seoDescription,
          seoLang,
          sortOrder,
          title,
          type,
          page
        }
      }
    }
  }
}
`
