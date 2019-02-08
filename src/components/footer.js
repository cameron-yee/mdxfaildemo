import React from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import nsfLogo from '../images/nsf_logo.svg'
import osuLogo from '../images/osu_logo.svg' 
import spencerLogo from '../images/spencer_logo.png' 


export default function Footer() {
  return (
    <footer className="bg-light" style={{ paddingTop: "3rem" }}>
      <Container fluid>
        <Row>
          <Container>
            <Row>
              <Col>
                <p style={{ fontSize: '1.8rem', marginBottom: '3rem' }}>In partnership with</p>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col xs={12} md={4}>
                <a href="https://osucascades.edu" target="_blank" rel="noopener noreferrer">
                  <img
                    src={osuLogo}
                    alt="Eucation Development Center logo"
                    style={{
                      display: 'block',
                      height: '75px',
                      margin: '0 auto'
                    }}
                  />
                </a>
              </Col>
              {/* <Col xs={12} md={4}>
                <a href="https://knowlesteachers.org" target="_blank" rel="noopener noreferrer">
                  <img
                    src={kstfLogo}
                    alt="Knowles Teacher Initiative logo"
                    style={{
                      display: 'block',
                      height: '65px',
                      margin: '.15rem auto 0 auto'
                    }}
                  />
                </a>
              </Col> */}
            </Row>
          </Container>
        </Row>
      </Container>
      <Container fluid>
        <Row>
          <Container>
            <Row>
              <Col>
                <hr style={{ margin: '2.5rem 0 4.5rem' }} />
              </Col>
            </Row>
          </Container>
        </Row>
      </Container>
      <Container fluid>
        <Row style={{
          marginBottom: "2rem"
        }}>
          <Container>
            <Row className="justify-content-center">
              <Col xs={12} md={4}>
                <div style={{ backgroundColor: '#433F40', padding: '1rem', width: '160px', margin: '0 auto', marginBottom: '2rem' }}>
                  <a href="https://www.spencer.org" target="_blank" rel="noopener noreferrer">
                    <img
                      src={spencerLogo}
                      alt="Eucation Development Center logo"
                      style={{
                        display: 'block',
                        height: '80px',
                        margin: '0 auto',
                      }}
                    />
                  </a>
                </div>
              </Col>
              <Col xs={12} md={4}>
                <div style={{ padding: '1rem' }}>
                  <a href="https://www.nsf.gov" target="_blank" rel="noopener noreferrer">
                    <img
                      src={nsfLogo}
                      alt="National Science Foundation logo"
                      style={{
                        display: 'block',
                        height: '85px',
                        margin: '0 auto'
                      }}
                    />
                  </a>
                </div>
              </Col>
            </Row>
          </Container>
        </Row>
      </Container>
      <Container fluid>
        <Row>
          <Container>
            <Row>
              <div className="p-2 bd-highlight">
                <p style={{ padding: '0 4rem' }}>
                  This material is based upon work supported by the <a href="https://www.nsf.gov" target="_blank" rel="noopener noreferrer" className="text-secondary">National Science Foundation</a> under Grant No. DRL-1108899, a transfer of funds from an NSF grant housed at the University of Missouri, and by the Spencer Foundation. Any opinions, findings, and conclusions or recommendations expressed in this material are those of the author(s) and do not necessarily reflect the views of the National Science Foundation or the Spencer Foundation.
                </p>
              </div>
            </Row>
          </Container>
        </Row>
      </Container>
      <Container fluid>
        <Row>
          <Container>
            <Row>
              <Col>
                <hr style={{ margin: '3.5rem 0 2.5rem' }} />
              </Col>
            </Row>
          </Container>
        </Row>
      </Container>
      <Container fluid>
        <Row>
          <Container>
            <Row>
              <Col>
                <p style={{ textAlign: "center" }}>
                  Copyright © BSCS Science Learning, {new Date().getFullYear()}. All rights reserved.
                </p>
              </Col>
            </Row>
          </Container>
        </Row>
      </Container>
    </footer>
  )
}
