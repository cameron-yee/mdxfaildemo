import React from 'react'

import posed from "react-pose"

import Layout from '../components/layout'
import SEO from '../components/seo'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Jumbotron from 'react-bootstrap/Jumbotron'

// import pckLogo from '../images/pck_logo.svg'


const Section = posed.section({
  enter: { staggerChildren: 50 }
});

const H1 = posed.h1({
  enter: { y: 0, opacity: 1 },
  exit: { y: 50, opacity: 0, delay: 300 }
});

const P = posed.p({
  enter: { y: 0, opacity: 1 },
  exit: { y: 50, opacity: 0, delay: 300 }
})

// const IMG = posed.img({
//   enter: { y: 0, opacity: 1 },
//   exit: { y: 50, opacity: 0, delay: 300 }
// })

const IFRAME = posed.iframe({
  enter: { y: 0, opacity: 1 },
  exit: { y: 50, opacity: 0, delay: 300 }
})

export default function Keynote(props) {
  return (
    <Layout location={props.location}>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <Section>
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
                  {/* <IMG
                    src={pckLogo}
                    alt="PCK Summit logo"
                    className="indexJumbotronImage"
                  /> */}
                </div>
                <div className="p-2 d-none d-lg-block">
                  <H1 className="indexJumbotronH1">Keynote: Dr. Lee Shulman</H1>
                </div>
              </div>
            </Row>
          </Container>
        </Jumbotron>
        <Container>
          <Row style={{ marginBottom: '2rem' }}>
            <Col>
              <H1 className="d-lg-none">Keynote: Dr. Lee Shulman</H1>
              <P>
                When Lee Shulman delivered his AERA presidential address in 1986 and introduced a generation of researchers to the concept of Pedagogical Content Knowledge, or PCK. More than a quarter century later, researchers are still studying PCK. A group of such researchers with a focus on science education gathered for the PCK Summit and on 20 October 2012 Dr. Shulman, Professor Emeritus, Stanford University, gave the keynote address for that meeting. He presented via Skype to the Summit participants in Colorado Springs. This video is his address about what he sees as the pitfalls in the concept of PCK. The address is followed by a short question and answer session.
              </P>
            </Col>
          </Row>
          <Row className="justify-content-center" style={{ marginBottom: '3rem' }}>
            <Col xs={12} md={10} lg={7} xl={6}>
              <IFRAME
                style={{
                  maxWidth: '560px',
                  width: '100%',
                  height: '315px',
                }}
                src="https://www.youtube.com/embed/NZjmYvfrYSE" frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                title="PCK Summit Keynote: Dr. Lee Shulman"
              ></IFRAME>
            </Col>
          </Row>
        </Container>
      </Section>
    </Layout>
  )
}
