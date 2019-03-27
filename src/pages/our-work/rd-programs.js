import React, { Component } from 'react';
import { graphql, Link } from 'gatsby';
import SEO from '../../components/seo'
import { Location } from '@reach/router'

import Layout from '../../components/layout/layout'

import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
// import CardColumns from 'react-bootstrap/CardColumns'
import Row from 'react-bootstrap/Row'

import PageTitle from '../../components/layout/page-title/page-title'
import SearchBy from '../../components/atoms/search-by/search-by'
import FilterByDropdown from '../../components/molecules/filter-by/filter-by-dropdown/filter-by-dropdown'
import FilterByRow from '../../components/molecules/filter-by/filter-by-row/filter-by-row'

import '../../global-scss/index.scss'
import './rd-programs.scss'

// import ReactPlaceholder from 'react-placeholder'
// import 'react-placeholder/lib/reactPlaceholder.css'


const RDPrograms = class extends Component {
  constructor(props) {
    super(props)
    this.programs = props.data.allMdx.edges
    this.filter_items = {areas_of_work: ["Areas of Work", true, ["Instructional Materials Development", "Teacher Professional Learning","Leadership Development", "Research"]]}
    this.state = {
      // filter_hash: undefined,
      activeFilters: [],
      // imagesLoaded: false
    }
    // this.images_loaded = 0
  }

  // componentDidMount() {
  //   const rd_images = document.getElementsByClassName('rd-image')

  //   for(let i = 0; i < rd_images.length; i++) {
  //     if(rd_images[i].complete && this.images_loaded !== rd_images.length) {
  //       this.loaded()
  //     }
  //   }

  //   setTimeout(() => {
  //     if(this.state.imagesLoaded !== true) {
  //       this.setState({imagesLoaded: true})
  //     }
  //   },
  //   3000)
  // }

  // loaded = () => {
  //   const rd_images = document.getElementsByClassName('rd-image')
  //   if(this.images_loaded < rd_images.length) {
  //     this.images_loaded = this.images_loaded + 1
  //   } else {
  //     return
  //   }

  //   if(this.images_loaded === rd_images.length && this.state.imagesLoaded !== true) {
  //     this.setState({imagesLoaded: true})
  //   }
  // }

  render() {
    return (
      <React.Fragment>
        <SEO
          title="BSCS conducts innovative R&amp;D Programs"
          description="Browse a sample of BSCS’s current research and development programs designed to improve science education."
          canonical="https://bscs.org/our-work/rd-programs/"
        />
        <Layout location={this.props.location}>
          <section className="section">
            <Container>
              <PageTitle title="R&amp;D Programs"></PageTitle>
              {/* <Row>
                <ResourceCategories navigate={false} />
              </Row> */}
              {/* <hr /> */}
            </Container>
          </section>
          <section className="section" style={{ padding: '.75rem 1.5rem' }}>
            <Container>
              <div className="d-sm-flex">
                <div className="p-2">
                  <SearchBy />
                </div>
                <div className="p-2 ml-auto">
                  <FilterByDropdown
                    items={this.filter_items}
                    filterHash={this.state.filterHash}
                    activeFilters={this.state.activeFilters}
                    setActiveFilters={(activeFilters) => this.setState({activeFilters: activeFilters})}
                  />
                </div>
              </div>
              <FilterByRow
                activeFilters={this.state.activeFilters}
                setActiveFilters={(activeFilters) => this.setState({activeFilters: activeFilters})}
              />
              <hr />
            </Container>
          </section>
          {/* <section className="section d-md-none" style={{ marginBottom: '4rem' }}> */}
          <section className="section" style={{ marginBottom: '4rem' }}>
            <Container>
              <Row className="justify-content-center justify-content-md-start">
                {
                  this.programs.map((edge, index) => {
                    let data_filter = JSON.parse(JSON.stringify(edge.node.frontmatter))
                    data_filter['excerpt'] = edge.node.excerpt
                    return(
                      <Col
                        xs={10}
                        md={6}
                        lg={4}
                        className="rrc-card-col"
                        key={edge.node.id}
                      >
                        <Card
                          id={`resource-${index}`}
                          data-filter={JSON.stringify(data_filter)}
                          data-type={edge.node.frontmatter.type}
                          className="h-100"
                          style={{
                            borderColor: 'rgb(41, 52, 118)'
                          }}
                        >
                          <Card.Img
                            variant="top"
                            src={edge.node.frontmatter.image}
                            alt={edge.node.frontmatter.alt}
                            // onLoad={this.loaded}
                            style={{ padding: '1rem 7rem 0' }}
                            className="mb-3 mb-sm-3 mb-md-2 mb-lg-0 mb-xl-3 mt-lg-2"
                          />
                          {/* <div className="d-flex flex-row justify-content-center">
                            <div className="dot d-inline-flex mr-2"></div>
                            <div className="dot d-inline-flex mr-2"></div>
                            <div className="dot d-inline-flex"></div>
                          </div> */}
                          <Card.Body className="mt-3 mt-md-3 mt-lg-3 mb-md-0 pt-0">
                            <Card.Title
                              style={{
                                marginBottom: '1rem'
                              }}
                            >
                              {edge.node.frontmatter.title}
                            </Card.Title>
                            <div className="d-flex">
                              <div className="mr-auto mb-3">
                                {
                                  edge.node.frontmatter.areas.map((area, index) => {
                                    const variants = {
                                      "Teacher Professional Learning": "primary",
                                      "Instructional Materials Development": "secondary",
                                      "Research": "success",
                                      "Leadership Development": "danger"
                                    }
                                    return(
                                      <>
                                        <span
                                          key={`${edge.node.id}-area-${index}`}
                                          className={`rd-pill badge badge-pill badge-${variants[area]}`}
                                          style={{
                                            marginRight: '.5rem',
                                            fontSize: '.75rem',
                                            fontWeight: '600'
                                          }}
                                        >
                                          {area}
                                        </span>
                                        {/* <br /> */}
                                      </>
                                    )
                                  })
                                }
                              </div>
                            </div>
                            <Card.Text>
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
                                  to={`/our-work/rd-programs/${edge.node.frontmatter.title.replace(/\s/g, '-').replace(/[^a-zA-Z0-9-]/g, '').toLowerCase()}`}
                                >
                                  <Button variant="outline-secondary">
                                    Read More
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
          {/* <section className="section d-none d-md-block" style={{ marginBottom: '4rem' }}>
            <Container>
              <Row>
                <CardColumns>
                  {
                    this.programs.map((edge, index) => {
                      let data_filter = JSON.parse(JSON.stringify(edge.node.frontmatter))
                      data_filter['excerpt'] = edge.node.excerpt
                      return(
                        <div key={`desktop-${edge.node.id}`}>
                          <Card
                            id={`mobile-resource-${index}`}
                            data-filter={JSON.stringify(data_filter)}
                            data-type={edge.node.frontmatter.type}
                            style={{
                              borderColor: 'rgb(41, 52, 118)',
                              marginBottom: '1.25rem'
                            }}
                          >
                            <Card.Img
                              variant="top"
                              src={edge.node.frontmatter.image}
                              alt={edge.node.frontmatter.alt}
                              // onLoad={this.loaded}
                              style={{ padding: '1rem 4.5rem 0' }}
                              className="mb-3 mb-sm-3 mb-md-2 mb-lg-0 mb-xl-3 mt-lg-2"
                            />
                            <div className="d-flex flex-row justify-content-center">
                              <div className="dot d-inline-flex mr-2"></div>
                              <div className="dot d-inline-flex mr-2"></div>
                              <div className="dot d-inline-flex"></div>
                            </div>
                            <Card.Body className="mt-3 mt-md-3 mt-lg-3 mb-md-0 pt-0">
                              <Card.Title
                                style={{
                                  marginBottom: '1rem'
                                }}
                              >
                                {edge.node.frontmatter.title}
                              </Card.Title>
                              <div className="d-flex">
                                <div className="mr-auto mb-3">
                                  {
                                    edge.node.frontmatter.areas.map((area, index) => {
                                      const variants = {
                                        "Teacher Professional Learning": "primary",
                                        "Instructional Materials Development": "secondary",
                                        "Research": "success",
                                        "Leadership Development": "danger"
                                      }
                                      return(
                                        <>
                                          <span
                                            key={`desktop-${edge.node.id}-area-${index}`}
                                            className={`rd-pill badge badge-pill badge-${variants[area]}`}
                                            style={{
                                              marginRight: '.5rem',
                                              fontSize: '.75rem',
                                              fontWeight: '600'
                                            }}
                                          >
                                            {area}
                                          </span>
                                        </>
                                      )
                                    })
                                  }
                                </div>
                              </div>
                              <Card.Text>
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
                                    to={`/our-work/rd-programs/${edge.node.frontmatter.title.replace(/\s/g, '-').replace(/[^a-zA-Z0-9-]/g, '').toLowerCase()}`}
                                  >
                                    <Button variant="outline-secondary">
                                      Read More
                                    </Button>
                                  </Link>
                                </div>
                              </div>
                            </Card.Footer>
                          </Card>
                        </div>
                      )
                    })
                  }
                </CardColumns>
              </Row>
            </Container>
          </section> */}
        </Layout>
      </React.Fragment>
    )
  }
}

export default props => (
  <Location>
    {locationProps => <RDPrograms {...locationProps} {...props} />}
  </Location>
)

export const rdProgramsQuery = graphql`
  query rdProgramsQuery {
    allMdx(
      filter: {frontmatter: { page: {eq: "rd-programs"}}}
      sort: {
        fields: [frontmatter___sortOrder, frontmatter___title],
        order: ASC
      }
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 200)
          frontmatter {
            additionalTags,
            cardDescription,
            alt,
            areas,
            date,
            image,
            sortOrder,
            title,
            page
          }
        }
      }
    }
  }
`
