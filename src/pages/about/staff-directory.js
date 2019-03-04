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
    this.state = {
      staff: props.data.allMarkdownRemark.edges,
      order: 0,
      firstName: {
        order: 0
      },
      lastName: {
        order: 1
      },
      title: {
        order: 0
      }
    }
  }

  comparison = (personA, personB) => {
    let comparison = 0
    if (personA > personB) {
      comparison = 1
    } else if (personA < personB) {
      comparison = -1
    }
    return comparison
  }

  reverseComparison = (personA, personB) => {
    let comparison = 0
    if (personA < personB) {
      comparison = 1
    } else if (personA > personB) {
      comparison = -1
    }
    return comparison
  }

  sortByFirstName = () => {
    if (this.state.firstName.order === 1) {
      return (
        this.setState(prevState => ({
          staff: prevState.staff.sort((a, b) => {
            const personA = a.node.frontmatter.firstName.toUpperCase()
            const personB = b.node.frontmatter.firstName.toUpperCase()
            return this.reverseComparison(personA, personB)
          }),
          firstName: {
            order: -1
          },
          lastName: {
            order: 0
          },
          title: {
            order: 0
          }
        }))
      )
    } else if (this.state.firstName.order === -1) {
      return (
        this.setState(prevState => ({
          staff: prevState.staff.sort((a, b) => {
            const personA = a.node.frontmatter.firstName.toUpperCase()
            const personB = b.node.frontmatter.firstName.toUpperCase()
            return this.comparison(personA, personB)
          }),
          firstName: {
            order: 1
          },
          lastName: {
            order: 0
          },
          title: {
            order: 0
          }
        }))
      )
    } else if (this.state.firstName.order === 0) {
      return (
        this.setState(prevState => ({
          staff: prevState.staff.sort((a, b) => {
            const personA = a.node.frontmatter.firstName.toUpperCase()
            const personB = b.node.frontmatter.firstName.toUpperCase()
            return this.comparison(personA, personB)
          }),
          firstName: {
            order: 1
          },
          lastName: {
            order: 0
          },
          title: {
            order: 0
          }
        }))
      )
    }
  }

  sortByLastName = () => {
    if (this.state.lastName.order === 1) {
      return (
        this.setState(prevState => ({
          staff: prevState.staff.sort((a, b) => {
            const personA = a.node.frontmatter.lastName.toUpperCase()
            const personB = b.node.frontmatter.lastName.toUpperCase()
            return this.reverseComparison(personA, personB)
          }),
          firstName: {
            order: 0
          },
          lastName: {
            order: -1
          },
          title: {
            order: 0
          }
        }))
      )
    } else if (this.state.lastName.order === -1) {
      return (
        this.setState(prevState => ({
          staff: prevState.staff.sort((a, b) => {
            const personA = a.node.frontmatter.lastName.toUpperCase()
            const personB = b.node.frontmatter.lastName.toUpperCase()
            return this.comparison(personA, personB)
          }),
          firstName: {
            order: 0
          },
          lastName: {
            order: 1
          },
          title: {
            order: 0
          }
        }))
      )
    } else if (this.state.lastName.order === 0) {
      return (
        this.setState(prevState => ({
          staff: prevState.staff.sort((a, b) => {
            const personA = a.node.frontmatter.lastName.toUpperCase()
            const personB = b.node.frontmatter.lastName.toUpperCase()
            return this.comparison(personA, personB)
          }),
          firstName: {
            order: 0
          },
          lastName: {
            order: 1
          },
          title: {
            order: 0
          }
        }))
      )
    }
  }

  sortByTitle = () => {
    if (this.state.title.order === 1) {
      return (
        this.setState(prevState => ({
          staff: prevState.staff.sort((a, b) => {
            const personA = a.node.frontmatter.title.toUpperCase()
            const personB = b.node.frontmatter.title.toUpperCase()
            return this.reverseComparison(personA, personB)
          }),
          firstName: {
            order: 0
          },
          lastName: {
            order: 0
          },
          title: {
            order: -1
          }
        }))
      )
    } else if (this.state.title.order === -1) {
      return (
        this.setState(prevState => ({
          staff: prevState.staff.sort((a, b) => {
            const personA = a.node.frontmatter.title.toUpperCase()
            const personB = b.node.frontmatter.title.toUpperCase()
            return this.comparison(personA, personB)
          }),
          firstName: {
            order: 0
          },
          lastName: {
            order: 0
          },
          title: {
            order: 1
          }
        }))
      )
    } else if (this.state.title.order === 0) {
      return (
        this.setState(prevState => ({
          staff: prevState.staff.sort((a, b) => {
            const personA = a.node.frontmatter.title.toUpperCase()
            const personB = b.node.frontmatter.title.toUpperCase()
            return this.comparison(personA, personB)
          }),
          firstName: {
            order: 0
          },
          lastName: {
            order: 0
          },
          title: {
            order: 1
          }
        }))
      )
    }
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
                        cursor: 'pointer',
                        width: '160px'
                      }}
                      onClick={ () => this.sortByLastName() }
                    >
                      <div className="d-flex align-items-center">
                        <div className="mr-auto">
                          Last Name
                        </div>
                        <div className="ml-auto">
                          {
                            this.state.lastName.order === 1
                            ?
                            <i className="fas fa-sort-up"></i>
                            :
                            this.state.lastName.order === -1
                            ?
                            <i className="fas fa-sort-down"></i>
                            :
                            <i className="fas fa-sort"></i>
                          }
                        </div>
                      </div>
                    </th>
                    <th
                      style={{
                        cursor: 'pointer',
                        width: '160px'
                      }}
                      onClick={ () => this.sortByFirstName() }
                    >
                      <div className="d-flex align-items-center">
                        <div className="mr-auto">
                          First Name
                        </div>
                        <div className="ml-auto">
                          {
                            this.state.firstName.order === 1
                            ?
                            <i className="fas fa-sort-up"></i>
                            :
                            this.state.firstName.order === -1
                            ?
                            <i className="fas fa-sort-down"></i>
                            :
                            <i className="fas fa-sort"></i>
                          }
                        </div>
                      </div>
                    </th>
                    <th
                      style={{
                        cursor: 'pointer'
                      }}
                      onClick={ () => this.sortByTitle() }
                    >
                      <div className="d-flex align-items-center">
                        <div className="mr-auto">
                          Title
                        </div>
                        <div className="ml-auto">
                          {
                            this.state.title.order === 1
                            ?
                            <i className="fas fa-sort-up"></i>
                            :
                            this.state.title.order === -1
                            ?
                            <i className="fas fa-sort-down"></i>
                            :
                            <i className="fas fa-sort"></i>
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
                    this.state.staff.map((person, index) => {
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
    allMarkdownRemark(
      filter: {
        frontmatter: { 
          page: {
            eq: "staff-directory"
          }
        }
      }
      sort: {
        fields: [frontmatter___lastName]
      }
    ) {
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
