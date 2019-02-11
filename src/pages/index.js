import React from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Jumbotron from 'react-bootstrap/Jumbotron'

import Layout from '../components/layout'
import SEO from '../components/seo'

import './index.scss'

// import pckLogo from '../images/pck_logo.svg'


const IndexPage = props => (
  <Layout location={props.location}>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <Jumbotron
      style={{
        background: 'transparent',
        paddingBottom: '0rem'
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <div className="d-flex flex-row">
            <div className="p-2 indexJumbotronImageContainer">
              {/* <img
                src={pckLogo}
                alt="PCK Summit logo"
                className="indexJumbotronImage"
              /> */}
            </div>
            <div className="p-2 d-none d-lg-block">
              <h1 className="indexJumbotronH1">Welcome to the PCK Summit Dissemination Site</h1>
            </div>
          </div>
        </Row>
      </Container>
    </Jumbotron>
    <Container>
      <Row style={{ marginBottom: '2rem' }}>
        <Col>
          <h1 className="d-lg-none">Welcome to the PCK Summit Dissemination Site</h1>
          <p>
            <strong style={{color: '#b5b5b5'}}>From 20 to 26 October 2012 we hosted the PCK Summit in Colorado Springs, Colorado, USA. We received funding for the Summit and the subsequent dissemination efforts from the National Science Foundation and the Spencer Foundation.</strong>
          </p>
          <p>
            The principal investigators for this project, Julie Gess-Newsome, Janet Carlson, and April Gardner,designed the PCK Summit as a small, working conference. We were convinced that in order for this field of study to advance, it was time for researchers to attend to the considerable divergences in the interpretation and understanding of PCK and clarify distinctions between different, viable models of PCK. The Summit participants came from seven different countries and all had a history of studying Pedagogical Content Knowledge (PCK) within science education and a willingness to consider whether or not it was possible to agree to a consensus model for studying PCK.
          </p>
          <p style={{ marginBottom: "2rem" }}>
            Others have joined in the discussion of the Summit work by logging into this website and attending the presentations Summit participants are giving. Consider yourself invited to share in our work. To access the rest of the PCK Summit website, please register by clicking on the "create new account" link below the "login" button.
          </p>
          <h3>Within this website, you will be able to access:</h3>
          <Card className="bg-light" style={{ marginBottom: "3rem" }}>
            <Card.Body>
              <ol>
                <li>An interactive version of the Summit agenda, which will take you to the papers and PowerPoint presentations;</li>
                <li>A link to the keynote address Lee Shulman gave to start the Summit;</li>
                <li>A video of the Summit Story that summarizes the conference;</li>
                <li>Six FORUMs-- online modules of study designed to help you experience the Summit through video, discussion with a group you create, and an online community through this site;</li>
              </ol>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </Layout>
)

export default IndexPage
