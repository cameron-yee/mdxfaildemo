import React, { Component } from 'react'
// import { Link } from 'gatsby'
import { Location } from '@reach/router'
import SEO from '../../components/seo'

import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import Row from 'react-bootstrap/Row'

import Layout from '../../components/layout/layout'
import PageTitle from '../../components/layout/page-title/page-title'
// import Canvas from '../../../static/assets/canvas.jpg'

import './leadership.scss'

const StaffDirectoryPage = class extends Component {
  constructor(props) {
    super(props)
    this.people = props.data.allMarkdownRemark.edges
    // this.filter_items = ["Area 1", "Area 2","Area 3", "Area 4"]
    // this.state = {
    //   filter_hash: ""
    // }
  }

  render() {
    return (
      <Layout location={this.props.location}>
        <SEO title="Staff Directory" />
        <Container>
          <PageTitle title="Staff Directory" />
          <Row style={{ marginBottom: '2rem' }}>
            <Col>
              <Table responsive hover striped>
                <thead>
                  <th>Title</th>
                  <th>Name</th>
                  <th>Position</th>
                  <th>Personal Website Link</th>
                </thead>
                <tbody>
                  {
                    this.people.map((person, index) => {
                      return(
                        <tr key={`person-${index}`}>
                          <td>{person.node.frontmatter.honorific}</td>
                          <td>{person.node.frontmatter.fullName}</td>
                          <td>{person.node.frontmatter.position}</td>
                          <td><Button variant="outline-secondary" size="sm"><a href={person.node.frontmatter.personalUrl} target="_blank" rel="noopener noreferrer">View Personal Website</a></Button></td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </Layout>
    )
  }
}

export default props => (
  <Location>
    {locationProps => <StaffDirectoryPage {...locationProps} {...props} />}
  </Location>
)

export const leadershipQuery = graphql`
  query staffDirectoryQuery {
    allMarkdownRemark(filter: {frontmatter: { page: {eq: "staff-directory"}}}) {
      edges {
        node {
          id
          frontmatter {
            fullName,
            honorific,
            position,
            personalUrl,
            page
          }
        }
      }
    }
  }
`

