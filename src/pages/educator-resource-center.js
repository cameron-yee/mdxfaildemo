import React from 'react';
import { graphql, Link } from 'gatsby';
import SEO from '../components/seo'

import Layout from '../components/layout/layout'

import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'

import PageTitle from '../components/atoms/page-title'
import SearchBy from '../components/atoms/search-by/search-by'
import FilterBy from '../components/atoms/filter-by/filter-by'
// import ResourceCard from '../components/molecules/resource-card/resource-card'
import ResourceCategories from '../components/molecules/resource-categories/resource-categories'

import './educator-resource-center.scss';
// import '../global-scss/bulma-divider.scss';
import '../global-scss/index.scss';
// import '../global-scss/helpers.scss';


// const EducatorResourceCenter = (props, {data: { allMarkdownRemark: { edges },},}) => {
const EducatorResourceCenter = (props) => {
  const courses = props.data.allMarkdownRemark.edges;

  // const paths = [["/educator-resource-center", "Educator Resource Center", "is-active"]];

  const filter_items = ["Classroom", "Professional Learning","District Planning", "Citizen Science"];

  return (
    <>
      {/* {/* <MatchHeight /> */}
      <SEO title="Educator Resource Center" keywords={[`gatsby`, `application`, `react`]} />
      <Layout location={props.location}>
        <section className="section" style={{ paddingTop: '.75rem' }}>
          <Container>
            <Breadcrumb>
              <Link to='/' className="breadcrumb-item">Home</Link>
              <div className="breadcrumb-item active">Educator Resource Center</div>
            </Breadcrumb>
            <Row>
              <Col>
                <PageTitle title="Educator Resource Center"></PageTitle>
                  <hr />
                  <Row>
                    <ResourceCategories navigate={false} />
                  </Row>
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
              <Col md={{span: 4, offset: 4}}>
                <FilterBy items={filter_items}/>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="section">
          <Container>
            <Row>
              {
                courses.map((edge, index) => {
                  return(
                    <Col md={4} key={edge.node.id} style={{marginBottom: '1.5rem'}}>
                      <Card id={`resource-${index}`} className="card match" style={{height: '100%', position: 'relative', paddingBottom: '10%'}} data-filter={JSON.stringify(edge.node.frontmatter)} data-type={ edge.node.frontmatter.type}>
                        <div style={{height: '40%', overflow: 'hidden'}}>
                          <Card.Img variant="top" src={edge.node.frontmatter.image} style={{display: 'block', margin: 'auto 0', minWidth: '100%', minHeight: '100%'}} />
                        </div>
                        <Card.Body>
                          <Card.Title>{edge.node.frontmatter.title}</Card.Title>
                          <Card.Text>{edge.node.frontmatter.shortDescription}</Card.Text>
                          <Link to={`/educator-resource-center/${edge.node.frontmatter.slug}`} style={{position: 'absolute', bottom: '5%'}}><Button variant="primary">Read More</Button></Link>
                        </Card.Body>
                      </Card>
                    </Col>

                    // <Col md={4}><a href={`educator-resource-center/${edge.node.frontmatter.slug}`}>{edge.node.frontmatter.title}</a></Col>
                  )
                }) 
              }
            </Row>
          </Container>
        </section>
      </Layout>
    </>
  )
}

export default EducatorResourceCenter

export const educatorResourceQuery = graphql`
  query educatorResourceQuery {
    allMarkdownRemark(filter: {frontmatter: { page: {eq: "educator-resource-center"}}}) {
      edges {
        node {
          id
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
            shortDescription,
            facilitator,
            title,
            type,
            page
          }
        }
      }
    }
  }
`
