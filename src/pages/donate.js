import React, { Component } from 'react'
import SEO from '../components/seo'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Layout from '../components/layout/layout'
import PageTitle from '../components/layout/page-title/page-title'
import SpecificContactForm from '../components/atoms/forms/specific-contact-form/specific-contact-form-button/specific-contact-form-button'
import Row from 'react-bootstrap/Row'

import '../global-scss/index.scss'

// eslint-disable-next-line
import rowImage from '../queries/images/row-image'


const DonatePage = class extends Component {
  render() {
    return (
      <React.Fragment>
        <SEO
          title="Donate"
          canonical="https://bmw-bscs.org/donate"
          description="PLACEHOLDER DESC"
          lang="en-us"
        />
        <Layout location={this.props.location}>
          <Container>
            <PageTitle title="Donate" />
            <Row style={{marginBottom: '1rem'}} className="d-flex flex-wrap-reverse">
              <Col className="p-2">
                <p>A donation to BSCS Science Learning makes a difference! We appreciate any contribution, whether it is inspired by what BSCS has meant to you personally, or by what you know BSCS has the ability to accomplish for teachers and students around the country. With your support, BSCS will remain a leader in science education for the next 60 years.</p>
                <p>Choose from one of three funds to support:</p>

                <ul>
                  <li><strong>Annual Fund:</strong> supports current priorities and the mission of BSCS</li>
                  <li><strong>Endowment Fund:</strong> provides BSCS with a stable source of income to sustain key programs over the long-term</li>
                  <li><strong>Susan Loucks-Horsley Memorial Fund:</strong> supports staff development for BSCS employees as a tribute to the memory of Susan Loucks-Horsley</li>
                </ul>

                <p>If you would like to make a donation, please mail a check or money order to BSCS at the following address:</p>

                <p className="mb-0 ml-5">BSCS Science Learning</p>
                <p className="mt-0 mb-0 ml-5">5415 Mark Dabling Blvd.</p>
                <p className="mt-0 ml-5">Colorado Springs, CO 80918</p>

                <p>Online payments will be accepted soon.</p>

                <p>Other ways to support BSCS:</p>
                <ul>
                  <li><strong>AmazonSmile:</strong> <a href="https://smile.amazon.com/" target="_blank" rel="noopener noreferrer">AmazonSmile&nbsp;<sup><i style={{ fontSize: '.65rem' }} className="fas fa-external-link-alt"></i></sup></a> donates .5% of your purchase price to BSCS (at no additional cost to you) on qualifying Amazon purchases. Sign-up is simple (we're listed as BSCS Science Learning).</li>
                  <li><strong>iGive:</strong> <a href="https://www.igive.com/welcome/lp16/cr64a.cfm" target="_blank" rel="noopener noreferrer">iGive&nbsp;<sup><i style={{ fontSize: '.65rem' }} className="fas fa-external-link-alt"></i></sup></a> donates a percentage of each purchase to BSCS (at no additional cost to you) when you shop at more than 1,300 participating online stores. Register now (we're listed as BSCS Science Learning).</li>
                </ul>
              </Col>
              <Col md={4} className="p-2">
                  <Card style={{marginBottom: '1rem'}} className="mt-4 mt-md-0">
                    <Img
                      className="card-img-top"
                      fluid={this.props.data.astronautGirl.childImageSharp.fluid}
                      alt="NO ALT"
                    />
                    <Card.Body>
                        {/* <Card.Title></Card.Title> */}
                        <Card.Text style={{fontSize: '1rem'}}>
                          For more information:
                        </Card.Text>
                        <div class="d-flex justify-content-center">
                            {/* <a className="p-2" href={this.resource.sidebarURL} target="_blank" rel="noopener noreferrer">
                              <Button size="sm" variant="outline-secondary"></Button>
                            </a> */}
                            <div className="p-2">
                              <SpecificContactForm sendto="Aleigh Raffelson">
                                      <Button size="sm" variant="outline-primary">Contact Aleigh Raffelson</Button>
                              </SpecificContactForm>
                            </div>
                        </div>
                    </Card.Body>
                  </Card>
              </Col>
            </Row>
          </Container>
        </Layout>
      </React.Fragment>
    )
  }
}

export default DonatePage

export const query = graphql`
  query {
    astronautGirl: file(relativePath: { eq: "astronaut-girl.jpg" }) {
      ...rowImage
    }
  }
`
