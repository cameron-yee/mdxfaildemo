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
    this.people = this.props.data.allMarkdownRemark.edges
    this.bod = this.getGroup(this.people, 'Board Member')
    this.management = this.getGroup(this.people, 'Management')
  }

  //type either 'Board Member' or 'Management'
  getGroup = (people, type) => {
    //This allows both BOD and Management people to have a sortOrder of 1, 2, etc.
    const type_people = people.filter(person => person.node.frontmatter.type === type) //Screw performance.  This is so clean and beautiful.
    return this.sort(type_people)
  }

  sort = (people) => {
    let ordered = people.sort((a, b) => {
      let personAName = a.node.frontmatter.fullName.split(' ')
      let personBName = b.node.frontmatter.fullName.split(' ')

      //Sort element defaults to last element in person's name array
      let aLast = personAName[personAName.length - 1]
      let bLast = personBName[personBName.length - 1]

      //If the person's name includes a title (ex. Daniel C. Edelson, Executive Director), their last name will be the index that includes the comma
      for(let i = 0; i < personAName.length; i++) {
        if(personAName[i].includes(',')) {
          aLast = personAName[i]
          break
        }
      }
      for(let i = 0; i < personBName.length; i++) {
        if(personBName[i].includes(',')) {
          bLast = personBName[i]
          break
        }
      }

      //Sorts string alphabetically using Array.prototype.sort() return values
      if(aLast.toLowerCase() > bLast.toLowerCase()) {
        return 1
      } else if(aLast.toLowerCase() < bLast.toLowerCase()) {
        return -1
      } else {
        return 0
      }

    })

    //Copying array so doing splice operations doesn't cause infinite loop by changing length
    let ordered_copy = ordered.slice()

    for(let x = 0; x < people.length; x++) {
      if(people[x].node.frontmatter.sortOrder !== null) {
        ordered_copy.splice(x, 1) //Removes the person
        ordered_copy.splice(people[x].node.frontmatter.sortOrder - 1, 0, people[x]) //Adds the person back in the correct order 
      }
    }

    //Returns the sorted list of people to render
    return ordered_copy

  }

  render() {
    return (
      <Layout location={this.props.location}>
        <SEO title="Leadership" />
        <Container>
          <PageTitle title="Leadership" />
          <Row style={{ marginBottom: '3rem' }}>
            <Col xs={12}>
              <h2 style={{ marginBottom: '3rem' }}>Management</h2>
            </Col>
            { this.management.map((person, index) => {
              return(
                <Col
                  md={6}
                  lg={4} 
                  style={{ marginBottom: '2rem' }}
                >
                  <Card 
                    key={`mgmt-${index}`} 
                    className="h-100"
                  >
                    <Card.Img
                      variant="top" 
                      src={person.node.frontmatter.image} 
                      alt={person.node.frontmatter.alt} 
                    />
                    <Card.Body>
                      <Card.Title style={{ marginBottom: '1rem' }}>
                        {person.node.frontmatter.fullName}
                      </Card.Title>
                      <Card.Text>
                        {person.node.excerpt}
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
                            to={`/about/leadership/${person.node.frontmatter.fullName.replace(/\s/g, '-').replace(/[^a-zA-Z0-9-]/g, '').toLowerCase()}`} 
                            className="leadership-read-more"
                          >
                            <Button variant="outline-secondary">Read More</Button>
                          </Link>
                        </div>
                      </div>
                    </Card.Footer>
                  </Card>
                </Col>
              )
            })}
          </Row>
          <Row style={{ marginBottom: '3rem' }}>
            <Col xs={12}>
              <h2 style={{ marginBottom: '3rem' }}>Board of Directors</h2>
            </Col>
            { this.bod.map((person, index) => {
              return(
                <Col
                  md={6}
                  lg={4} 
                  style={{ marginBottom: '2rem' }}
                >
                  <Card 
                    key={`mgmt-${index}`} 
                    className="h-100"
                    style={{ marginBottom: '1rem' }}
                  >
                    <Card.Img
                      variant="top" 
                      src={person.node.frontmatter.image} 
                      alt={person.node.frontmatter.alt} 
                    />
                    <Card.Body>
                      <Card.Title>
                        {person.node.frontmatter.fullName}
                      </Card.Title>
                      <Card.Text className="leadership-card-text">
                        {person.node.excerpt}
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
                            to={`/about/leadership/${person.node.frontmatter.fullName.replace(/\s/g, '-').replace(/[^a-zA-Z0-9-]/g, '').toLowerCase()}`} 
                            className="leadership-read-more"
                          >
                            <Button variant="outline-secondary">Read More</Button>
                          </Link>
                        </div>
                      </div>
                    </Card.Footer>
                  </Card>
                </Col>
              )
            })}
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
            page,
            sortOrder
          }
        }
      }
    }
  }
`
