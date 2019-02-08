import React from 'react'
import { Link } from 'gatsby'

// import posed from "react-pose"

import Layout from '../components/layout'
import SEO from '../components/seo'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Jumbotron from 'react-bootstrap/Jumbotron'

import pckLogo from '../images/pck_logo.svg'


// const Section = posed.section({
//   enter: { staggerChildren: 50 }
// });

// const H1 = posed.h1({
//   enter: { y: 0, opacity: 1 },
//   exit: { y: 50, opacity: 0, delay: 300 }
// });

// const P = posed.p({
//   enter: { y: 0, opacity: 1 },
//   exit: { y: 50, opacity: 0, delay: 300 }
// })


export default function Keynote(props) {
  return (
    <Layout location={props.location}>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      {/* <Section> */}
        <Jumbotron
          style={{
            background: 'transparent',
            paddingBottom: '0rem'
          }}
        >
          <Container>
            <Row className="justify-content-center justify-content-lg-start">
              <div className="d-flex flex-row">
                <div className="p-2 indexJumbotronImageContainer">
                  <img
                    src={pckLogo}
                    alt="PCK Summit logo"
                    className="indexJumbotronImage"
                  />
                </div>
                <div className="p-2 d-none d-lg-block">
                  <h1 className="indexJumbotronH1">Summit Story</h1>
                </div>
              </div>
            </Row>
          </Container>
        </Jumbotron>
        <Container>
          <Row style={{ marginBottom: '2rem' }}>
            <Col>
              <h1 className="d-lg-none">Summit Story</h1>
              <p>
                Trying to convey what happened during the five days of the Summit when 32 people from seven countries convened to share their PCK research in science and math and also to find out if we could find an aspects of our work that represented consensus is a challenge. This short video documents key pieces of the process we went through during the Summit, including the struggles and triumphs, so that you can become part of this conversation in PCK research.
              </p>
            </Col>
          </Row>
          <Row className="justify-content-center" style={{ marginBottom: '3rem' }}>
            <Col xs={12} md={10} lg={7} xl={6}>
              <iframe
                style={{
                  maxWidth: '560px',
                  width: '100%',
                  height: '315px',
                }}
                src="https://www.youtube.com/embed/seU0AOxQPrM" frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                title="The PCK Summit Story"
              ></iframe>
            </Col>
          </Row>
          <p>
            After you watch the video, feel free to dig deeper into the Summit experience by forming a study group to complete one or more of the <Link to="/forums/">FORUMs</Link> (online modules that include more video from the Summit).
          </p>
        </Container>
      {/* </Section> */}
    </Layout>
  )
}
