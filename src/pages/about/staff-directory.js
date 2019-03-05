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

import './staff-directory.scss'


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
    let negative = this.state.firstName.order === 1
    let first_name_order;
    negative ? first_name_order = -1 : first_name_order = 1

    return (
      this.setState(prevState => ({
        staff: prevState.staff.sort((a, b) => {
          const personA = a.node.frontmatter.firstName.toUpperCase()
          const personB = b.node.frontmatter.firstName.toUpperCase()
          if(negative) {
            return this.reverseComparison(personA, personB)
          } else {
            return this.comparison(personA, personB)
          }
        }),
        firstName: {
          order: first_name_order
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

  sortByLastName = () => {
    let negative = this.state.lastName.order === 1
    let last_name_order;
    negative ? last_name_order = -1 : last_name_order = 1

    return (
      this.setState(prevState => ({
        staff: prevState.staff.sort((a, b) => {
          const personA = a.node.frontmatter.lastName.toUpperCase()
          const personB = b.node.frontmatter.lastName.toUpperCase()
          if(negative) {
            return this.reverseComparison(personA, personB)
          } else {
            return this.comparison(personA, personB)
          }
        }),
        firstName: {
          order: 0
        },
        lastName: {
          order: last_name_order
        },
        title: {
          order: 0
        }
      }))
    )
  }

  sortByTitle = () => {
    let negative = this.state.title.order === 1
    let title_order;
    negative ? title_order = -1 : title_order = 1

    return (
      this.setState(prevState => ({
        staff: prevState.staff.sort((a, b) => {
          const personA = a.node.frontmatter.title.toUpperCase()
          const personB = b.node.frontmatter.title.toUpperCase()
          if(negative) {
            return this.reverseComparison(personA, personB)
          } else {
            return this.comparison(personA, personB)
          }
        }),
        firstName: {
          order: 0
        },
        lastName: {
          order: 0
        },
        title: {
          order: title_order
        }
      }))
    )
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
                      className="no-action"
                      style={{width: '160px'}}
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
                      className="no-action"
                      style={{width: '160px'}}
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
                    <th className="no-action" onClick={() => this.sortByTitle()}>
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
                    <th className="text-align-center">Contact</th>
                    <th className="text-align-center">Profile</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.state.staff.map((person, index) => {
                      return(
                        <tr key={`person-${index}`}>
                          <td className="vertical-align-middle">{person.node.frontmatter.lastName}</td>
                          <td className="vertical-align-middle">{person.node.frontmatter.firstName}</td>
                          <td className="vertical-align-middle">{person.node.frontmatter.title}</td>
                          <td className="vertical-align-middle text-align-center">
                            <SpecificContactForm
                              sendto={person.node.frontmatter.firstName + " " + person.node.frontmatter.lastName}
                            >
                              <i className="far fa-envelope"></i>
                            </SpecificContactForm>
                          </td>
                          {
                            person.node.frontmatter.url !== ""
                            ?
                            <td className="vertical-align-middle text-align-center">
                              <a
                                href={person.node.frontmatter.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                              >
                                <i className="fas fa-external-link-alt"></i>
                              </a>
                            </td>
                            :
                            <td className="vertical-align-middle">&nbsp;</td>
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
