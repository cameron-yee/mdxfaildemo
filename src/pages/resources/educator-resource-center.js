import React, { Component } from 'react';
import { graphql, Link } from 'gatsby';
import SEO from '../../components/seo'
import { Location } from '@reach/router'

import Layout from '../../components/layout/layout'

import BSCSBreadcrumb from '../../components/layout/breadcrumb/breadcrumb';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'

import PageTitle from '../../components/atoms/page-title'
import SearchBy from '../../components/atoms/search-by/search-by'
import FilterBy from '../../components/atoms/filter-by/filter-by'
// import ResourceCard from '../components/molecules/resource-card/resource-card'
import ResourceCategories from '../../components/molecules/resource-categories/resource-categories'

import './educator-resource-center.scss';
// import '../global-scss/bulma-divider.scss';
import '../../global-scss/index.scss';
// import '../global-scss/helpers.scss';


// const EducatorResourceCenter = (props, {data: { allMarkdownRemark: { edges },},}) => {
// const EducatorResourceCenter = (props) => {
const EducatorResourceCenter = class extends Component {
  constructor(props) {
    super(props)
    this.courses = props.data.allMarkdownRemark.edges
    this.filter_items = ["Classroom", "Professional Learning","District Planning", "Citizen Science"]
    this.state = {
      filter_hash: ""
    }
  }

  componentDidMount() {
    console.log(this.props.location)
    if(this.props.location.hash) {
      console.log(this.props.location.hash)
      this.setState({filter_hash: this.props.location.hash})
    }
  }

  render() {
    return (
      <React.Fragment>
        <SEO title="Educator Resource Center" keywords={[`gatsby`, `application`, `react`]} />
        <Layout location={this.props.location}>
          <section className="section">
            {/* <Container fluid="true" className="gradient"> */}
            <Container>
              <BSCSBreadcrumb pathname={this.props.location.pathname} />
              <Row>
                <Col>
                  <PageTitle title="Educator Resource Center"></PageTitle>
                    <hr />
                    <Row>
                      <ResourceCategories navigate={false} />
                    </Row>
                    <hr />
                </Col>
              </Row>
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
              <hr />
            </Container>
          </section>
          <section className="section">
            <Container>
              <Row>
                {
                  this.courses.map((edge, index) => {
                    return(
                      <Col md={4} key={edge.node.id} className="card-col">
                        <Card id={`resource-${index}`} className="card" data-filter={JSON.stringify(edge.node.frontmatter)} data-type={edge.node.frontmatter.type}>
                          <div className="card-img-wrapper">
                            <Card.Img variant="top" className="card-img" src={edge.node.frontmatter.image}/>
                          </div>
                          <Card.Body>
                            <Card.Title>{edge.node.frontmatter.title}</Card.Title>
                            <Card.Text className="excerpt">{edge.node.excerpt}</Card.Text>
                            <Link to={`/resources/educator-resource-center/${edge.node.frontmatter.title.replace(/\s/g, '-').replace(/[^a-zA-Z-]/g, '').toLowerCase()}`} className="read-more"><Button variant="primary">Read More</Button></Link>
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
