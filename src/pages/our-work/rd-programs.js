import React, { Component } from 'react';
import { graphql, Link } from 'gatsby';
import SEO from '../../components/seo'
import { Location } from '@reach/router'

import Layout from '../../components/layout/layout'

import Button from 'react-bootstrap/Button'
// import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'

import PageTitle from '../../components/layout/page-title/page-title'
import SearchBy from '../../components/atoms/search-by/search-by'
import FilterByDropdown from '../../components/molecules/filter-by/filter-by-dropdown/filter-by-dropdown'
import FilterByRow from '../../components/molecules/filter-by/filter-by-row/filter-by-row'
// import ResourceCategories from '../../components/molecules/resource-categories/resource-categories'

import '../../global-scss/index.scss';
import './rd-programs.scss';


const RDPrograms = class extends Component {
  constructor(props) {
    super(props)
    this.programs = props.data.allMarkdownRemark.edges
    this.filter_items = {areas_of_work: ["Areas of Work", true, ["Instructional Materials Development", "Teacher Professional Learning","Leadership Development", "Research"]]}
    this.state = {
      filter_hash: undefined,
      activeFilters: []
    }
  }

  componentDidMount() {
    if(this.props.location.hash) {
      this.setState({filter_hash: this.props.location.hash})
    }
  }

  render() {
    return (
      <React.Fragment>
        <SEO title="R&amp;D Programs" description="" canonical="https://bmw-bscs.netlify.com/rd-programs/" />
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
              {this.state.activeFilters.length > 0 &&
                <FilterByRow
                  activeFilters={this.state.activeFilters}
                  setActiveFilters={(activeFilters) => this.setState({activeFilters: activeFilters})}
                />
              }
              <hr />
            </Container>
          </section>
          <section className="section" style={{ marginBottom: '4rem' }}>
            <Container>
              {
                this.programs.map((edge, index) => {
                  let data_filter = JSON.parse(JSON.stringify(edge.node.frontmatter))
                  data_filter['excerpt'] = edge.node.excerpt
                  return(
                    <div id="parent">
                      <div key={edge.node.id} id={`resource-${index}`} data-filter={JSON.stringify(data_filter)} data-type={edge.node.frontmatter.type}>
                        <hr />
                        <Row style={{ marginBottom: '1rem' }}>
                          <Col sm={3} lg={2} className="d-none d-md-block">
                            <img
                              className="img-fluid"
                              src={edge.node.frontmatter.image}
                              alt={edge.node.frontmatter.alt}
                              style={{
                                marginBottom: '1rem'
                              }}
                            />
                          </Col>
                          <Col>
                            <h3>{edge.node.frontmatter.title}</h3>
                            <p>{edge.node.excerpt}</p>
                            <div className="d-flex">
                              <div className="ml-auto button-wrapper">
                                <Link
                                  to={`/our-work/rd-programs/${edge.node.frontmatter.title.replace(/\s/g, '-').replace(/[^a-zA-Z0-9-]/g, '').toLowerCase()}`}
                                >
                                  <Button variant="outline-secondary" style={{ width: '124px' }}>Read More</Button>
                                </Link>
                              </div>
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <div className="d-flex">
                              <div className="mr-auto">
                                { 
                                  edge.node.frontmatter.areas.map((area, index) => {
                                    const variants = ['primary','secondary','success','danger']
                                    return(
                                      <span
                                        key={index}
                                        className={`rd-pill badge badge-pill badge-${variants[index]}`}
                                        style={{ marginRight: '.5rem' }}
                                      >
                                        {area}
                                      </span>
                                    )
                                  })
                                }
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  )
                }) 
              }
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
    allMarkdownRemark(filter: {frontmatter: { page: {eq: "rd-programs"}}}) {
      edges {
        node {
          id
          excerpt(pruneLength: 200)
          frontmatter {
            additionalTags,
            alt,
            areas,
            date,
            image,
            title,
            page
          }
        }
      }
    }
  }
`
