import React, { Component } from 'react';
import { graphql, Link } from 'gatsby';
import SEO from '../../components/seo'
import { Location } from '@reach/router'

import Layout from '../../components/layout/layout'

import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'

import PageTitle from '../../components/layout/page-title/page-title'
import SearchBy from '../../components/atoms/search-by/search-by'
import FilterByDropdown from '../../components/molecules/filter-by/filter-by-dropdown/filter-by-dropdown'
import FilterByRow from '../../components/molecules/filter-by/filter-by-row/filter-by-row'

import '../../global-scss/index.scss';
import './rd-programs.scss';

import ReactPlaceholder from 'react-placeholder'
import 'react-placeholder/lib/reactPlaceholder.css'


const NewsPage = class extends Component {
  constructor(props) {
    super(props)
    this.newsletters = props.data.allMarkdownRemark.edges
    // this.filter_items = {areas_of_work: ["Areas of Work", true, ["Instructional Materials Development", "Teacher Professional Learning","Leadership Development", "Research"]]}
    this.state = {
      // filter_hash: undefined,
      // activeFilters: [],
      // imagesLoaded: false
    }
    // this.images_loaded = 0
  }


  render() {
    return (
      <React.Fragment>
        <SEO title="News" description="" canonical="https://bmw-bscs.netlify.com/our-work/news/" />
        <Layout location={this.props.location}>
          <section className="section">
            <Container>
              <PageTitle title="News"></PageTitle>
              {/* <Row>
                <ResourceCategories navigate={false} />
              </Row> */}
              {/* <hr /> */}
            </Container>
          </section>
          {/* <section className="section" style={{ padding: '.75rem 1.5rem' }}>
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
          </section> */}
          <section className="section" style={{ marginBottom: '4rem' }}>
            <Container>
              <Row style={{ marginBottom: '1rem' }}>
                {
                  this.newsletters.map((edge, index) => {
                    // let data_filter = JSON.parse(JSON.stringify(edge.node.frontmatter))
                    // data_filter['excerpt'] = edge.node.excerpt
                    return(
                      <React.Fragment>
                          <Col
                            xs={12}
                            id="parent"
                            key={edge.node.id}
                          >
                          {index !== 0 &&
                            <hr /> 
                          }
                          <div
                            id={`resource-${index}`}
                            // data-filter={JSON.stringify(data_filter)}
                            // data-type={edge.node.frontmatter.type}
                          >
                            <h3>{edge.node.frontmatter.title}</h3>
                            <p>{edge.node.excerpt}</p>
                            <div className="d-flex align-content-center flex-wrap">
                              <p
                                className="p-2"
                                style={{
                                  fontFamily: '"Lora", "Adobe Blank"',
                                  fontWeight: '400',
                                  fontStyle: 'italic',
                                  fontSize: '1rem',
                                  color: 'rgba(41, 52, 118, 1)'
                                }}
                              >
                                {edge.node.frontmatter.date}
                              </p>
                              <div className="p-2 ml-auto button-wrapper">
                                <Link
                                  to={`/our-work/news/${edge.node.frontmatter.title.replace(/\s/g, '-').replace(/[^a-zA-Z0-9-]/g, '').toLowerCase()}`}
                                >
                                  <Button variant="outline-secondary" style={{ width: '124px' }}>Read More</Button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </Col>
                      </React.Fragment>
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
    {locationProps => <NewsPage {...locationProps} {...props} />}
  </Location>
)

export const newsQuery = graphql`
  query newsQuery {
    allMarkdownRemark(
      filter: {frontmatter: { page: {eq: "news"}}}
      sort: {
        fields: [frontmatter___date],
        order: DESC
      }
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 200)
          frontmatter {
            additionalTags,
            alt,
            date(formatString: "MMMM DD, YYYY"),
            title,
            page
          }
        }
      }
    }
  }
`