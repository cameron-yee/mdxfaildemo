import React, { Component } from 'react'
import { Location } from '@reach/router'
import SEO from '../../components/seo'
import { graphql } from 'gatsby'

import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import Row from 'react-bootstrap/Row'

import Layout from '../../components/layout/layout'
import PageTitle from '../../components/layout/page-title/page-title'
import SpecificContactForm from '../../components/atoms/specific-contact-form/specific-contact-form'

import './leadership.scss'


const StaffDirectoryPage = class extends Component {
  constructor(props) {
    super(props)
    this.people = props.data.allMarkdownRemark.edges
    this.state = {
      direction: "up"
    }
  }

  handleSorting = (direction) => {
    console.log(this.state.direction)
    this.setState(prevState => ({
      direction: prevState.direction !== direction ? direction : ""
    }))
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
                  <tr>
                    <th
                      style={{
                        width: '160px'
                      }}
                    >
                      <div className="d-flex align-items-center">
                        <div className="mr-auto">
                          Last Name
                        </div>
                        <div className="ml-auto">
                          {
                            this.props.sorted === "up"
                            ?
                            <i
                              className="fas fa-sort-up"
                              onClick={() => this.handleSorting("up").bind(this)}
                            ></i>
                            :
                            this.props.sorted === "down"
                            ?
                            <i
                              className="fas fa-sort-up"
                              onClick={() => this.handleSorting("down").bind(this)}
                            ></i>
                            :
                            <i
                              className="fas fa-sort"
                              onClick={() => this.handleSorting("")}
                            ></i>
                          }
                        </div>
                      </div>
                    </th>
                    <th
                      style={{
                        width: '160px'
                      }}
                    >
                      <div className="d-flex align-items-center">
                        <div className="mr-auto">
                          First Name
                        </div>
                        <div className="ml-auto">
                          {
                            this.props.sorted === "up"
                            ?
                            <i
                              className="fas fa-sort-up"
                              onClick={() => this.handleSorting("up").bind(this)}
                            ></i>
                            :
                            this.props.sorted === "down"
                            ?
                            <i
                              className="fas fa-sort-up"
                              onClick={() => this.handleSorting("down").bind(this)}
                            ></i>
                            :
                            <i
                              className="fas fa-sort"
                              onClick={() => this.handleSorting("")}
                            ></i>
                          }
                        </div>
                      </div>
                    </th>
                    <th>
                      <div className="d-flex align-items-center">
                        <div className="mr-auto">
                          Title
                        </div>
                        <div className="ml-auto">
                          {
                            this.props.sorted === "up"
                            ?
                            <i
                              className="fas fa-sort-up"
                              onClick={() => this.handleSorting("up").bind(this)}
                            ></i>
                            :
                            this.props.sorted === "down"
                            ?
                            <i
                              className="fas fa-sort-up"
                              onClick={() => this.handleSorting("down").bind(this)}
                            ></i>
                            :
                            <i
                              className="fas fa-sort"
                              onClick={() => this.handleSorting("")}
                            ></i>
                          }
                        </div>
                      </div>
                    </th>
                    <th
                      style={{
                        textAlign: 'center'
                      }}
                    >
                      Contact
                    </th>
                    <th
                      style={{
                        textAlign: 'center'
                      }}
                    >
                      Profile
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.people.map((person, index) => {
                      return(
                        <tr key={`person-${index}`}>
                          <td
                            style={{
                              verticalAlign: 'middle'
                            }}
                          >
                            {person.node.frontmatter.lastName}
                          </td>
                          <td
                            style={{
                              verticalAlign: 'middle'
                            }}
                          >
                            {person.node.frontmatter.firstName}
                          </td>
                          <td
                            style={{
                              verticalAlign: 'middle'
                            }}
                          >
                            {person.node.frontmatter.title}
                          </td>
                          <td
                            style={{
                              textAlign: 'center',
                              verticalAlign: 'middle'
                            }}
                          >
                            <SpecificContactForm
                              sendto={person.node.frontmatter.firstName + " " + person.node.frontmatter.lastName}
                            >
                              <i className="far fa-envelope"></i>
                            </SpecificContactForm>
                          </td>
                          {
                            person.node.frontmatter.url !== ""
                            ?
                            <td
                              style={{
                                textAlign: 'center',
                                verticalAlign: 'middle'
                              }}
                            >
                              <a
                                href={person.node.frontmatter.url} 
                                target="_blank" 
                                rel="noopener noreferrer"

                              >
                                <i className="fas fa-external-link-alt"></i>
                              </a>
                            </td>
                            :
                            <td
                              style={{
                                verticalAlign: 'middle'
                              }}
                            >
                              &nbsp;
                            </td>
                          }
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
            firstName,
            lastName,
            title,
            url,
            page
          }
        }
      }
    }
  }
`
