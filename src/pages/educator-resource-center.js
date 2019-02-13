import React from 'react';
import { graphql } from 'gatsby';
import SEO from '../components/seo'

import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'

import PageTitle from '../components/atoms/page-title'
import Layout from '../components/layout/layout'
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
              <Breadcrumb.Item href='/'>Home</Breadcrumb.Item>
              <Breadcrumb.Item active>Educator Resource Center</Breadcrumb.Item>
            </Breadcrumb>
            <Row>
              <Col>
                <PageTitle title="Educator Resource Center"></PageTitle>
                  <hr />
                  {/* <div className="columns is-multiline"> */}
                    {/* <ResourceCategories navigate={false} /> */}
                  {/* </div> */}
              </Col>
            </Row>
          </Container>
        </section>
        <section className="section" style={{ padding: '.75rem 1.5rem' }}>
          <Container>
            <Row>
              <Col md={4}>
                <div className="field has-addons">
                  <p className="control" style={{ width: '100%' }}>
                    {/* <SearchBy /> */}
                  </p>
                  <p className="control">
                    <span className="button is-static">
                      <i className="fas fa-search"></i>
                    </span>
                  </p>
                </div>
              </Col>
              <Col md={{span: 4, offset: 4}}>
                {/* <FilterBy items={filter_items}/> */}
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
                    <Col md={4} key={edge.node.id}>
                      <Card style={{height: '100%'}}>
                        <Card.Img variant="top" src={edge.node.frontmatter.image} />
                        <Card.Body>
                          <Card.Title>{edge.node.frontmatter.title}</Card.Title>
                          <Card.Text>{edge.node.frontmatter.shortDescription}</Card.Text>
                          <Button variant="primary">Go somewhere</Button>
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
