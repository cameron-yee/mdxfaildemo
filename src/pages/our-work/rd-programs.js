import React, { Component } from 'react';
import { graphql, Link } from 'gatsby';
import SEO from '../../components/seo'
import { Location } from '@reach/router'

import Layout from '../../components/layout/layout'

import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'

import PageTitle from '../../components/layout/page-title/page-title'
import SearchBy from '../../components/atoms/search-by/search-by'
import FilterByDropdown from '../../components/molecules/filter-by/filter-by-dropdown/filter-by-dropdown'
import FilterByRow from '../../components/molecules/filter-by/filter-by-row/filter-by-row'

import '../../global-scss/index.scss'
import './rd-programs.scss'

const RDPrograms = class extends Component {
  constructor(props) {
    super(props)
    this.programs = props.data.allMdx.edges
    this.filter_items = {areas_of_work: ["Areas of Work", true, ["Instructional Materials Development", "Teacher Professional Learning","Leadership Development", "Research"]]} //{object_name: [category_name, multiple, list_of_filters]}
    this.state = {
      activeFilters: [],
    }
  }

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
              <p>Browse BSCS Science Learning's robust R&amp;D Programs and active projects below.</p>
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
          <section className="section" style={{ marginBottom: '4rem' }}>
            <Container>
              <Row style={{ marginBottom: '2rem', marginTop: '2rem' }}>
                <Col>
                  <h2>Featured Programs</h2>
                  <hr />
                </Col>
              </Row>
              <Row className="justify-content-center justify-content-md-start" style={{ marginBottom: '4rem' }}>
                {
                  this.programs.map((edge, index) => {
                    let data_filter = JSON.parse(JSON.stringify(edge.node.frontmatter))
                    data_filter['excerpt'] = edge.node.excerpt
                    if(edge.node.frontmatter.sortOrder < 5) {
                      return(
                        <Col
                          xs={10}
                          md={6}
                          // xl={3}
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
                            <Card.Body className="mt-3 mt-md-3 mt-lg-3 mb-md-0 pt-0">
                              <div className="d-flex align-items-center">
                                <Card.Title>
                                  <h3 className="rd-h3">{edge.node.frontmatter.title}</h3>
                                </Card.Title>
                              </div>
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
                                        <React.Fragment key={`${edge.node.id}-area-${index}`}>
                                          <span
                                            className={`rd-pill badge badge-pill badge-${variants[area]}`}
                                            style={{
                                              marginRight: '.5rem',
                                              fontSize: '.75rem',
                                              fontWeight: '600'
                                            }}
                                          >
                                            {area}
                                          </span>
                                        </React.Fragment>
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
                    } else {
                      return <React.Fragment></React.Fragment>
                    }
                  })
                }
              </Row>
              <Row style={{ marginBottom: '2rem' }}>
                <Col>
                  <h2>Active Projects</h2>
                  <hr />
                </Col>
              </Row>
              <Row className="justify-content-center">
                {
                  this.programs.map((edge, index) => {
                  let data_filter = JSON.parse(JSON.stringify(edge.node.frontmatter))
                  data_filter['excerpt'] = edge.node.excerpt
                    if(edge.node.frontmatter.sortOrder >= 5) {
                      return(
                        <React.Fragment key={edge.node.id}>
                          <Col
                            xs={12}
                            id="parent"
                          >
                                <div
                                  id={`resource-${index}`}
                                  data-filter={JSON.stringify(data_filter)}
                                  data-type={edge.node.frontmatter.type}
                                >
                                  <h3 className="rd-h3">{edge.node.frontmatter.title}</h3>
                                  <div style={{ marginBottom: '.75rem' }}>
                                    {
                                      edge.node.frontmatter.areas.map((area, index) => {
                                        const variants = {
                                          "Teacher Professional Learning": "primary",
                                          "Instructional Materials Development": "secondary",
                                          "Research": "success",
                                          "Leadership Development": "danger"
                                        }
                                        return(
                                          <React.Fragment key={`${edge.node.id}-area-${index}`}>
                                            <span
                                              className={`rd-pill badge badge-pill badge-${variants[area]}`}
                                              style={{
                                                marginRight: '.5rem',
                                                fontSize: '.75rem',
                                                fontWeight: '600'
                                              }}
                                            >
                                              {area}
                                            </span>
                                          </React.Fragment>
                                        )
                                      })
                                    }
                                  </div>
                                  <p className="mb-lg-0">{!edge.node.frontmatter.cardDescription && edge.node.excerpt}</p>
                                  <div className="d-flex">
                                    <div className="p-2 ml-auto button-wrapper">
                                      <Link
                                        to={`/our-work/rd-programs/${edge.node.frontmatter.title.replace(/\s/g, '-').replace(/[^a-zA-Z0-9-]/g, '').toLowerCase()}`}
                                      >
                                        <Button variant="outline-secondary" style={{ width: '124px' }}>Read More</Button>
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                                <hr style={{ marginBottom: '3rem' }} />
                          </Col>
                        </React.Fragment>
                      )
                    } else {
                      return (
                        <React.Fragment></React.Fragment>
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
          excerpt(pruneLength: 150)
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
