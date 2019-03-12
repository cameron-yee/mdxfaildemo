import React, { Component } from 'react'
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

// import Container from '../components/layout/container/container'
// import Divider from '../components/ui/divider/divider'
// import Dropdown from '../components/ui/dropdown/dropdown'
// // import HeroImage from '../components/ui/images/hero-image'
// import ImageSection from '../components/layout/columns/image-section/image-section'
// import Layout from '../components/layout/layout'
// import PageTitle from '../components/ui/typography/page-title/page-title'
// import SectionHeader from '../components/ui/typography/section-header/section-header'
// import Table from '../components/ui/table/table'


// const annual_report_prefix = 'https://media.bscs.org/bscsmw/financials/annual-reports/'
// var url = `${annual_report_prefix}bscs_2016_annual_report.pdf`  


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
      <>
        <Layout location={this.props.location}>
          <SEO title="Financials" />
          <Container>
            <PageTitle title="Financials" />
            <Row style={{ marginBottom: '2rem' }}>
              <Col xs={12} lg={6}>
                <img src="/assets/ar-2017.jpg" alt="BSCS Science Learning Annual Report 2017" style={{width:"100%", marginBottom: '1rem'}} />
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
                  <Button variant="outline-secondary">Download 2017 Annual Report PDF</Button>
                </a>
              </Col>
            </Row>
            <Row>
              <Col>
                <Table responsive striped hover>
                  <tbody>
                    <tr>
                      <td><a href="https://media.bscs.org/bscsmw/financials/audits/bscs_2017_133_audit_report.pdf" target="_blank" rel="noopener noreferrer">BSCS 2017 133 Audit Report</a></td>
                    </tr>
                    <tr>
                      <td><a href="https://media.bscs.org/bscsmw/financials/audits/audit_report_and_financial_statements.pdf" target="_blank" rel="noopener noreferrer">BSCS 2017 Financial Statements</a></td>
                    </tr>
                    <tr>
                      <td><a href="https://media.bscs.org/bscsmw/financials/audits/bscs_bod_conflict_of_interest_and_confidentiality_statement.pdf" target="_blank" rel="noopener noreferrer">BSCS BoD Conflict of Interest and Confidentiality Statement</a></td>
                    </tr>
                    <tr>
                      <td><a href="https://media.bscs.org/bscsmw/financials/audits/bscs_employee_conflict_of_interest_policy.pdf" target="_blank" rel="noopener noreferrer">BSCS Employee Conflict of Interest Policy</a></td>
                    </tr>
                    <tr>
                      <td><a href="https://media.bscs.org/bscsmw/financials/audits/bscs_indirect_cost_rate_agreement_2017.pdf" target="_blank" rel="noopener noreferrer">BSCS 2017 Indirect Cost Rate</a></td>
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
                    <Button variant="outline-secondary">Download PDF</Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </Layout>
      </>
    )
  }
}

export default props => (
  <Location>
    {locationProps => <FinancialsPage {...locationProps} {...props} />}
  </Location>
)
