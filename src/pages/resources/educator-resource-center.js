import React, { Component } from 'react';
import { graphql, Link } from 'gatsby';
import SEO from '../../components/seo'
import { Location } from '@reach/router'

import Layout from '../../components/layout/layout'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'

import PageTitle from '../../components/layout/page-title/page-title'
import SearchBy from '../../components/atoms/search-by/search-by'
import FilterByDropdown from '../../components/molecules/filter-by/filter-by-dropdown/filter-by-dropdown'
import FilterByRow from '../../components/molecules/filter-by/filter-by-row/filter-by-row'
import ResourceCategories from '../../components/molecules/resource-categories/resource-categories'

import './educator-resource-center.scss';
import '../../global-scss/index.scss';


const EducatorResourceCenter = class extends Component {
  constructor(props) {
    super(props)
    this.resources = props.data.allMarkdownRemark.edges
    // this.filter_items = ["Classroom", "Professional Learning","District Planning", "Citizen Science"]
    this.filter_items = {
      //Index 0 for if multiple values are allowed to be selected
      gradeLevel: ['Grade Level', true, ['Elementary', 'Middle', 'High', 'Postsecondary']],
      discipline: ['Discipline', true, ['Life Sciences', 'Physical Sciences', 'Earth Sciences', 'Multidisciplinary Sciences']],
      programLength: ['Program Length', false, ['Full Year', 'Modules']]
    }
    this.state = {
      filterHash: undefined,
      activeFilters: []
    }
  }

  componentDidMount() {
    if(this.props.location.hash) {
      this.setState({filterHash: this.props.location.hash})
    }
  }

  render() {
    return (
      <React.Fragment>
        <SEO title="Educator Resource Center" />
        <Layout location={this.props.location}>
          <section className="section">
            <Container>
              <PageTitle title="Educator Resource Center"></PageTitle>
              <Row>
                <Col xs={12}>
                  <p>Welcome to the Educator Resource Center — where you will discover resources to support classroom instruction, professional learning, district planning, and citizen science efforts.</p>
                </Col>
                <ResourceCategories
                  navigate={false}
                  filterHash={this.state.filterHash}
                  setFilterHash={(filter_hash) => {this.setState({filterHash: filter_hash})}}
                />
              </Row>
              <hr />
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
              {this.state.activeFilters.length > 0 &&
                <FilterByRow
                  activeFilters={this.state.activeFilters}
                  setActiveFilters={(activeFilters) => this.setState({activeFilters: activeFilters})}
                />
              }
              <hr />
            </Container>
          </section>
          <section className="section">
            <Container>
              <Row>
                {
                  this.resources.map((edge, index) => {
                    let data_filter = JSON.parse(JSON.stringify(edge.node.frontmatter))
                    data_filter['excerpt'] = edge.node.excerpt
                    return(
                      <Col
                        md={6}
                        lg={4}
                        className="rrc-card-col"
                      >
                        <Card 
                          id={`resource-${index}`}
                          data-filter={JSON.stringify(data_filter)} 
                          data-type={edge.node.frontmatter.type}
                          className="h-100"
                        >
                          <Card.Img
                            variant="top"
                            src={edge.node.frontmatter.image}
                            alt={edge.node.frontmatter.alt}
                          />
                          <Card.Body>
                            <Card.Title
                              style={{
                                marginBottom: '1.5rem'
                              }}
                            >
                              {edge.node.frontmatter.title}
                            </Card.Title>
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
                                  to={`/resources/educator-resource-center/${edge.node.frontmatter.title.replace(/\s/g, '-').replace(/[^a-zA-Z0-9-]/g, '').toLowerCase()}`}
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
        </Layout>
      </React.Fragment>
    )
  }
}

export default props => (
  <Location>
    {locationProps => <EducatorResourceCenter {...locationProps} {...props} />}
  </Location>
)

export const educatorResourceQuery = graphql`
  query educatorResourceQuery {
    allMarkdownRemark(filter: {frontmatter: { page: {eq: "educator-resource-center"}}}) {
      edges {
        node {
          id
          excerpt(pruneLength: 200)
          frontmatter {
            additionalTags,
            alt,
            courseId,
            date,
            discipline,
            gradeLevel,
            image,
            slug,
            price,
            programLength,
            title,
            type,
            page
          }
        }
      }
    }
  }
`
