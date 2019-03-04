import React, { Component } from 'react'
import { graphql } from 'gatsby'
import { Location } from '@reach/router'
import SEO from '../../components/seo'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import Layout from '../../components/layout/layout'
import PageTitle from '../../components/layout/page-title/page-title'

import './leadership.scss'
import { Link } from 'gatsby';

const LeadershipPage = class extends Component {
  constructor(props) {
    super(props)
    this.people = props.data.allMarkdownRemark.edges
  }

  render() {
    return (
      <Layout location={this.props.location}>
        <SEO title="Leadership" />
        <Container>
          <PageTitle title="Leadership" />
          <Row style={{ marginBottom: '2rem' }}>
            <Col xs={12}>
              <h2>Management</h2>
              <div className="leadership-scrollable-wrapper">
                <div className="leadership-scrollable">
                  { this.people.map((person, index) => {
                      if(person.node.frontmatter.type === 'Management') {
                        return(
                          <Card key={`mgmt-${index}`} className="leadership-card">
                            <div className="leadership-card-image-wrapper">
                              <Card.Img className="leadership-card-image" variant="top" src={person.node.frontmatter.image} alt={person.node.frontmatter.alt} />
                            </div>
                            <Card.Body>
                              <Card.Title>{person.node.frontmatter.fullName}</Card.Title>
                              <Card.Text className="leadership-card-text">{person.node.excerpt}</Card.Text>
                              <div className="button-wrapper">
                                <Link
                                  to={`/about/leadership/${person.node.frontmatter.fullName.replace(/\s/g, '-').replace(/[^a-zA-Z0-9-]/g, '').toLowerCase()}`} 
                                  className="leadership-read-more"
                                >
                                  <Button variant="primary">Read More</Button>
                                </Link>
                              </div>
                            </Card.Body>
                          </Card>
                        )
                      }
                    })
                  }
                </div>
              </div>
            </Col>
            <Col xs={12}>
              <h2>Board of Directors</h2>
              <div className="leadership-scrollable-wrapper">
                <div className="leadership-scrollable">
                  { this.people.map((person, index) => {
                      if(person.node.frontmatter.type === 'Board Member') {
                        return(
                          <Card key={`mgmt-${index}`} className="leadership-card">
                            <div className="leadership-card-image-wrapper">
                              <Card.Img className="leadership-card-image" variant="top" src={person.node.frontmatter.image} alt={person.node.frontmatter.alt} />
                            </div>
                            <Card.Body>
                              <Card.Title>{person.node.frontmatter.fullName}</Card.Title>
                              <Card.Text className="leadership-card-text">{person.node.excerpt}</Card.Text>
                              <div className="button-wrapper">
                                <Link
                                  to={`/about/leadership/${person.node.frontmatter.fullName.replace(/\s/g, '-').replace(/[^a-zA-Z0-9-]/g, '').toLowerCase()}`} 
                                  className="leadership-read-more"
                                >
                                  <Button variant="primary">Read More</Button>
                                </Link>
                              </div>
                            </Card.Body>
                          </Card>
                        )
                      }
                    })
                  }
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Layout>
    )
  }
}

export default props => (
  <Location>
    {locationProps => <LeadershipPage {...locationProps} {...props} />}
  </Location>
)

export const leadershipQuery = graphql`
  query leadershipQuery {
    allMarkdownRemark(filter: {frontmatter: { page: {eq: "leadership"}}}) {
      edges {
        node {
          id
          excerpt(pruneLength: 200)
          frontmatter {
            additionalTags,
            fullName
            type,
            alt,
            image,
            title,
            page
          }
        }
      }
    }
  }
`
