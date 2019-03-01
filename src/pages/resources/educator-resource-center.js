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
        <SEO title="Educator Resource Center" keywords={[`gatsby`, `application`, `react`]} />
        <Layout location={this.props.location}>
          <section className="section">
            <Container>
              <PageTitle title="Educator Resource Center"></PageTitle>
              <Row>
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
                    return(
                      <Col md={4} key={edge.node.id} className="erc-card-col">
                        <Card id={`resource-${index}`} className="erc-card" data-filter={JSON.stringify(edge.node.frontmatter)} data-type={edge.node.frontmatter.type}>
                          <div className="erc-card-img-wrapper">
                            <Card.Img variant="top" className="erc-card-img" src={edge.node.frontmatter.image}/>
                          </div>
                          <Card.Body>
                            <Card.Title>{edge.node.frontmatter.title}</Card.Title>
                            <Card.Text className="erc-excerpt">{edge.node.excerpt}</Card.Text>
                            <Link to={`/resources/educator-resource-center/${edge.node.frontmatter.title.replace(/\s/g, '-').replace(/[^a-zA-Z0-9-]/g, '').toLowerCase()}`} className="p-2 erc-read-more"><Button variant="outline-secondary">Read More</Button></Link>
                          </Card.Body>
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
