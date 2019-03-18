import React, { Component } from 'react'
import { graphql, Link } from 'gatsby'
import { Location } from '@reach/router'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'

import Layout from '../../components/layout/layout'
import PageTitle from '../../components/layout/page-title/page-title'
import SEO from '../../components/seo'

import './teacher-professional-learning.scss'

import ReactPlaceholder from 'react-placeholder'
import 'react-placeholder/lib/reactPlaceholder.css'

import logo from '../../images/bscs_logo.svg'
// import SearchBy from '../../components/atoms/search-by/search-by'
// import FilterByDropdown from '../../components/molecules/filter-by/filter-by-dropdown/filter-by-dropdown'
// import FilterByRow from '../../components/molecules/filter-by/filter-by-row/filter-by-row'
// import ResourceCategories from '../../components/molecules/resource-categories/resource-categories'

const TeacherProfessionalLearningPage = class extends Component {
  constructor(props) {
    super(props)
    if(props.data.allMarkdownRemark) {
      this.programs = props.data.allMarkdownRemark.edges
    } else {
      this.programs = []
    }

    this.images_loaded = 0
    this.state = {
      imagesLoaded: false
    }
  }

  componentDidMount() {
    setTimeout(() => {
      if(this.state.imagesLoaded !== true) {
        this.setState({imagesLoaded: true})
      }
    },
    3000)

    const tpl_images = document.getElementsByClassName('tpl-card-img') 
    for(let i = 0; i < tpl_images.length; i++) {
      if(tpl_images[i].complete && this.images_loaded !== tpl_images.length) {
        this.loaded()
      }
    }
  }

  loaded = () => {
    const tpl_images = document.getElementsByClassName('tpl-card-img')
    if(this.images_loaded < tpl_images.length) {
      this.images_loaded = this.images_loaded + 1
    } else {
      return
    }

    if(this.images_loaded === tpl_images.length && this.state.imagesLoaded !== true) {
      this.setState({imagesLoaded: true})
    }
  }

  render() {
    return (
      <React.Fragment>
        <SEO title="Teacher Professional Learning" />
        <Layout location={this.props.location}>
          <section className="section" style={{ padding: '.75rem 1.5rem' }}>
            <Container>
              <PageTitle title="Teacher Professional Learning" />
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
                { this.programs &&
                  this.programs.map((edge, index) => {
                    // let data_filter = JSON.parse(JSON.stringify(edge.node.frontmatter))
                    // data_filter['excerpt'] = edge.node.excerpt
                    return(
                      <Col
                        lg={4}
                        key={`tpl-${index}`}
                        className="tpl-card-col"
                      >
                        {/* <Card id={`resource-${index}`} className="tpl-card" data-filter={JSON.stringify(data_filter)} data-type={edge.node.frontmatter.type}> */}
                        <Card id={`program-${index}`} className="tpl-card h-100">
                          <Card.Img
                            className="tpl-card-img"
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
                              width: '349.984px',
                              height: '260.98px',
                              borderTopLeftRadius: '4px',
                              borderTopRightRadius: '4px'

                            }}
                          >
                            <Card.Img
                              className="tpl-card-img"
                              variant="top"
                              style={{
                                minHeight: '260.98px',
                                backgroundColor: 'rgba(41, 52, 118, 1)',
                                borderTopLeftRadius: '4px',
                                borderTopRightRadius: '4px'
                                // background: 'linear-gradient(180deg, rgba(205,205,205,1) 0%, rgba(130,135,165,1) 0%, rgba(41,52,118,1) 74%)'
                                // backgroundImage: `url(../../../bscs_logo.svg)`,
                                // backgroundSize: 'contain',
                                // backgroundPosition: 'center',
                                // backgroundRepeat: 'no-repeat'
                              }}
                              src={edge.node.frontmatter.image}
                              alt={edge.node.frontmatter.alt}
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
                              className="tpl-excerpt"
                              style={{
                                marginBottom: '2rem'
                              }}
                            >
                              {edge.node.excerpt}
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
    {locationProps => <TeacherProfessionalLearningPage {...locationProps} {...props} />}
  </Location>
)

export const query = graphql`
{
  allMarkdownRemark(filter: {frontmatter: { page: {eq: "upcoming-programs-teacher-professional-learning"}}}) {
    edges {
      node {
        html
        excerpt(pruneLength: 200)
        frontmatter {
          alt,
          date(formatString: "MMMM DD, YYYY"),
          additionalTags,
          image,
          seoCanonicalUrl,
          seoDescription,
          seoLang,
          sidebarContacts,
          sidebarContactsText,
          sidebarContactsTitle,
          sidebarRegisterURL,
          sidebarRegisterText,
          sidebarRegisterTitle,
          title
          page
        }
      }
    }
  }
}
`
