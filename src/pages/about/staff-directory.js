import React, { Component } from 'react'
import { graphql } from 'gatsby'
import { Location } from '@reach/router'
import SEO from '../../components/seo'

import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Table from 'react-bootstrap/Table'

import Layout from '../../components/layout/layout'
import PageTitle from '../../components/layout/page-title/page-title'
import SpecificContactForm from '../../components/atoms/specific-contact-form/specific-contact-form'

import './staff-directory.scss'


const StaffDirectoryPage = class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      staff: props.data.allMarkdownRemark.edges,
      //Table columns will be sorted either alphabetically (1), reverse-alphabetically (2), or another column is being filtered (0) 
      order: {
        firstName: 0,
        lastName: 1,
        title: 0
      }
    }
  }

  comparison = (personA, personB) => {
    let comparison = 0
    if (personA.toUpperCase() > personB.toUpperCase()) {
      comparison = 1
    } else if (personA.toUpperCase() < personB.toUpperCase()) {
      comparison = -1
    }
    return comparison
  }

  reverseComparison = (personA, personB) => {
    let comparison = 0
    if (personA.toUpperCase() < personB.toUpperCase()) {
      comparison = 1
    } else if (personA.toUpperCase() > personB.toUpperCase()) {
      comparison = -1
    }
    return comparison
  }

  //type parameter must be either 'firstName', 'lastName', or 'title'
  sort = (type) => {
    const negative = this.state.order[`${type}`] === 1

    let non_zero_value;
    negative ? non_zero_value = -1 : non_zero_value = 1

    let options = {
      'firstName': 0,
      'lastName': 0,
      'title': 0
    }

    //search sort type value will be either 1 or -1, the other fields will always be 0
    options[type] = non_zero_value

    return (
      this.setState(prevState => ({
        staff: prevState.staff.sort((a, b) => {
          const personA = a.node.frontmatter[`${type}`]
          const personB = b.node.frontmatter[`${type}`]
          if(negative) {
            return this.reverseComparison(personA, personB)
          } else {
            return this.comparison(personA, personB)
          }
        }),
        order: {
          firstName: options['firstName'],
          lastName: options['lastName'],
          title: options['title']          
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
                      onClick={ () => this.sort('lastName') }
                    >
                      <div className="d-flex align-items-center">
                        <div className="mr-auto">
                          Last Name
                        </div>
                        <div className="ml-auto">
                          {
                            this.state.order.lastName === 1
                            ?
                            <i className="fas fa-sort-up"></i>
                            :
                            this.state.order.lastName === -1
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
                      onClick={ () => this.sort('firstName') }
                    >
                      <div className="d-flex align-items-center">
                        <div className="mr-auto">
                          First Name
                        </div>
                        <div className="ml-auto">
                          {
                            this.state.order.firstName === 1
                            ?
                            <i className="fas fa-sort-up"></i>
                            :
                            this.state.order.firstName === -1
                            ?
                            <i className="fas fa-sort-down"></i>
                            :
                            <i className="fas fa-sort"></i>
                          }
                        </div>
                      </div>
                    </th>
                    <th className="no-action" onClick={() => this.sort('title')}>
                      <div className="d-flex align-items-center">
                        <div className="mr-auto">
                          Title
                        </div>
                        <div className="ml-auto">
                          {
                            this.state.order.title === 1
                            ?
                            <i className="fas fa-sort-up"></i>
                            :
                            this.state.order.title === -1
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
