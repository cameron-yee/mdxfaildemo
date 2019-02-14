import React from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Jumbotron from 'react-bootstrap/Jumbotron'

import Layout from '../components/layout/layout'
import SEO from '../components/seo'

const FieldTestOpportunitiesPage = (props) => {
  return (
    <Layout location={props.location}>
      <SEO title="Field Test Opportunities" />
      <Jumbotron className="ftJumbotron">
        <div className="ftJumbotron-inside">
          <div className="ftJumbotronContent">
          <Container>
            <Row>
              <Col>
                <h1 className="ftJumbotronHeading">Field Test Opportunities</h1>
              </Col>
            </Row>
          </Container>
          </div>
        </div>
      </Jumbotron>
      <Container>
        <Row style={{ marginBottom: '2rem' }}>
          <Col>
            <p>
              Are you looking for new K-12 science curriculum materials? Are you interested in newly-developed teacher professional learning programs? Would your school or district be willing to test these materials and approaches in classroom settings?
            </p>
            <p>
              BSCS Science Learning offers a wide range of field-test opportunities for teachers, principals, and district leaders to consider. An important part of our process is to elicit teacher and student feedback on the usability and feasibility of our materials and programs. See what’s currently available below. If we do not presently offer a relevant opportunity for you, please feel free to reach out about how you can work with us (hyperlink to partner page) in the future.
            </p>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default FieldTestOpportunitiesPage
