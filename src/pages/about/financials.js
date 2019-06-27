import React, { Component } from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { Location } from '@reach/router'

import Layout from '../../components/layout/layout'
import PageTitle from '../../components/layout/page-title/page-title'
import SEO from '../../components/seo'

import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Dropdown from 'react-bootstrap/Dropdown'
import Table from 'react-bootstrap/Table'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button';

// eslint-disable-next-line
import rowImage from '../../queries/images/row-image'

const FinancialsPage = class extends Component {
  constructor(props) {
    super(props)
    this.annual_report_prefix = 'https://media.bscs.org/bscsmw/financials/annual-reports/'
    this.years = ['2016', '2015', '2014', '2013', '2012', '2011', '2010', '2009', '2008']
    this.state = {
      year: '2016',
      url: `${this.annual_report_prefix}bscs_2016_annual_report.pdf`
    }
  }

  setUrl = (year) => {
    document.getElementById(`pdf-${year}`).blur()
    document.getElementById('download-pdf').focus()
    this.setState({
      year: year,
      url: `${this.annual_report_prefix}bscs_${year}_annual_report.pdf`
    })
  }

  openPDF = () => {
    try {
      window.open(this.state.url, '_blank')
    } catch(e) {
      console.log(e)
    };
  }

  render() {
    return (
      <Layout location={this.props.location}>
        <SEO
          title="BSCS Science Learning financial documents"
          description="Browse BSCS’s annual reports, audit reports, and other financial statements."
          canonical="https://bscs.org/about/financials/"
        />
        <Container>
          <PageTitle title="Financials" />
          <Row class="d-flex" style={{ marginBottom: '2rem' }}>
            <Col className="p-2" xs={12} lg={6}>
              {/* <img src="/assets/ar-2017.jpg" alt="BSCS Science Learning Annual Report 2017" style={{width:"100%", marginBottom: '1rem'}} /> */}
              <Img
                className="h-100"
                fluid={this.props.data.ar2017.childImageSharp.fluid}
                alt="Young girl in an astronaut suit pointing at the moon."
                // backgroundColor='rgb(41, 52, 118)'
              />
            </Col>
            <Col xs={12} lg={6}>
              <p>
                In 2017, we continued advancing our research, teacher professional learning, leadership development, and instructional materials work. Included in this annual report, you will find a small sample of the 40+ projects BSCS started, furthered, or completed in 2017.
              </p>
              <a
                href="https://media.bscs.org/bscsmw/financials/annual-reports/bscs_2017_annual_report.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline-secondary">Download 2017 Annual Report PDF&nbsp;<sup><i style={{fontSize: '.65rem'}} className="fas fa-external-link-alt"></i></sup></Button>
              </a>
            </Col>
          </Row>
          <Row>
            <Col>
              <Table responsive striped hover>
                <tbody>
                  <tr>
                    <td><a href="https://media.bscs.org/bscsmw/financials/audits/bscs_science_learning_2018_133_audit_report.pdf" target="_blank" rel="noopener noreferrer">BSCS Science Learning 2018 133 Audit Report&nbsp;<sup><i style={{fontSize: '.65rem'}} className="fas fa-external-link-alt"></i></sup></a></td>
                  </tr>
                  <tr>
                    <td><a href="https://media.bscs.org/bscsmw/financials/audits/bscs_science_learning_2018_financial_statements.pdf" target="_blank" rel="noopener noreferrer">BSCS Science Learning 2018 Financial Statements&nbsp;<sup><i style={{fontSize: '.65rem'}} className="fas fa-external-link-alt"></i></sup></a></td>
                  </tr>
                  <tr>
                    <td><a href="https://media.bscs.org/bscsmw/financials/audits/bscs_2017_133_audit_report.pdf" target="_blank" rel="noopener noreferrer">BSCS 2017 133 Audit Report&nbsp;<sup><i style={{fontSize: '.65rem'}} className="fas fa-external-link-alt"></i></sup></a></td>
                  </tr>
                  <tr>
                    <td><a href="https://media.bscs.org/bscsmw/financials/audits/bscs_2017_financial_statements.pdf" target="_blank" rel="noopener noreferrer">BSCS 2017 Financial Statements&nbsp;<sup><i style={{fontSize: '.65rem'}} className="fas fa-external-link-alt"></i></sup></a></td>
                  </tr>
                  <tr>
                    <td><a href="https://media.bscs.org/bscsmw/financials/audits/bscs_bod_conflict_of_interest_and_confidentiality_statement.pdf" target="_blank" rel="noopener noreferrer">BSCS BoD Conflict of Interest and Confidentiality Statement&nbsp;<sup><i style={{fontSize: '.65rem'}} className="fas fa-external-link-alt"></i></sup></a></td>
                  </tr>
                  <tr>
                    <td><a href="https://media.bscs.org/bscsmw/financials/audits/bscs_employee_conflict_of_interest_policy.pdf" target="_blank" rel="noopener noreferrer">BSCS Employee Conflict of Interest Policy&nbsp;<sup><i style={{fontSize: '.65rem'}} className="fas fa-external-link-alt"></i></sup></a></td>
                  </tr>
                  <tr>
                    <td><a href="https://media.bscs.org/bscsmw/financials/audits/bscs_indirect_cost_rate_agreement_2017.pdf" target="_blank" rel="noopener noreferrer">BSCS 2017 Indirect Cost Rate&nbsp;<sup><i style={{fontSize: '.65rem'}} className="fas fa-external-link-alt"></i></sup></a></td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
          <Row style={{marginBottom: '2rem'}}>
            <Col>
              <hr />

              <h3>Download Additional Annual Reports</h3>

              <div className="d-flex">
                <Dropdown id="dropdown" className="p-2">
                  <Dropdown.Toggle variant="outline-primary" drop={'down'}>{this.state.year}</Dropdown.Toggle>
                  <Dropdown.Menu flip={false}>
                  {
                    this.years.map(year => {
                      return (
                        <Dropdown.Item id={`pdf-${year}`} key={year} onClick={() => this.setUrl(year)}>{year}</Dropdown.Item>
                      )
                    })
                  }
                  </Dropdown.Menu>
                </Dropdown>

                <div
                  id="download-pdf"
                  className="p-2"
                  onClick={this.openPDF}
                >
                  <Button variant="outline-secondary">Download PDF&nbsp;<sup><i style={{fontSize: '.65rem'}} className="fas fa-external-link-alt"></i></sup></Button>
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
    {locationProps => <FinancialsPage {...locationProps} {...props} />}
  </Location>
)

// export const rowImage = graphql`
//   fragment rowImage on File {
//     childImageSharp {
//       fluid(maxWidth: 600) {
//         ...GatsbyImageSharpFluid_noBase64
//       }
//     }
//   }
// `

export const query = graphql`
  query {
    ar2017: file(relativePath: { eq: "financials/ar-2017.jpg" }) {
      ...rowImage
    }
  }
`
