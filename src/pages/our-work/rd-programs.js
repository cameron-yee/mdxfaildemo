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
import FilterBy from '../../components/atoms/filter-by/filter-by'
// import ResourceCategories from '../../components/molecules/resource-categories/resource-categories'

import '../../global-scss/index.scss';
import './rd-programs.scss';


const RDPrograms = class extends Component {
  constructor(props) {
    super(props)
    this.programs = props.data.allMarkdownRemark.edges
    this.filter_items = ["Area1", "Area2","Area3", "Area4"]
    this.state = {
      filter_hash: ""
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
              <Row>
                <Col md={4}>
                  <SearchBy />
                </Col>
                <Col md={{span: 3, offset: 5}}>
                  <FilterBy items={this.filter_items} filterHash={this.state.filter_hash} />
                </Col>
              </Row>
            </Container>
          </section>
          <section className="section">
            <Container>
              {/* <Row> */}
                {
                  this.programs.map((edge, index) => {
                    return(
                      <React.Fragment>
                        <hr style={{borderColor: '#3087b4'}} />
                        <Row className="feed-item">
                          <Col xs={3}>
                          {/* <hr style={{borderColor: '#3087b4'}} /> */}
                            <div className="image-wrapper">
                              <img className="image" src={edge.node.frontmatter.image} alt={edge.node.frontmatter.alt} />
                            </div>
                          </Col>
                          <Col xs={9} key={edge.node.id}>
                              <div id={`resource-${index}`} data-filter={JSON.stringify(edge.node.frontmatter)} data-type={edge.node.frontmatter.type}>
                                <h3>{edge.node.frontmatter.title}</h3>
                                <p>{edge.node.excerpt}</p>
                                { edge.node.frontmatter.areas.map((area, index) => {
                                    return(<Button className="pill" size="sm" variant="primary">{area}</Button>)
                                  })
                                }
                                <div className="button-wrapper">
                                  {/* <Button className="pill" size="sm" variant="danger">Area1</Button>
                                  <Button className="pill" size="sm" variant="primary">Area2</Button>
                                  <Button className="pill" size="sm" variant="dark">Area3</Button>
                                  <Button className="pill" size="sm" variant="success">Area4</Button> */}
                                  <Link to={`/our-work/rd-programs/${edge.node.frontmatter.title.replace(/\s/g, '-').replace(/[^a-zA-Z-]/g, '').toLowerCase()}`} className="rd-read-more"><Button variant="secondary">Read More</Button></Link>
                                </div>
                              </div>
                          </Col>
                        </Row>
                      </React.Fragment>
                    )
                  }) 
                }
                {/* <hr style={{borderColor: '#3087b4'}} /> */}
              {/* </Row> */}
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
    # allMarkdownRemark(filter: {frontmatter: { page: {eq: "educator-resource-center"}}}) {
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

