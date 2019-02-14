import React from 'react'
import { Location } from '@reach/router'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Jumbotron from 'react-bootstrap/Jumbotron'

import Layout from '../../components/layout/layout'
import SEO from '../../components/seo'

const WorkWithUsPage = (props) => {
  return (
    <Layout location={props.location}>
      <SEO title="Home" />
      <Jumbotron className="tplJumbotron">
        <div className="tplJumbotron-inside">
          <div className="tplJumbotronContent">
          <Container>
            <Row>
              <Col>
                <h1 className="tplJumbotronHeading">Work with Us</h1>
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
              BSCS Science Learning is an independent nonprofit dedicated to transforming science education through research-driven innovation. We create instructional materials, provide professional learning programs for teachers, spearhead leadership development programs for schools and districts, and conduct research on how to improve science teaching and learning.
            </p>
            <p>
              What we do (hyperlink) falls within three BSCS divisions: Instructional Materials, Professional Learning, and Research.
            </p>
            <p>
              See below to learn more about our capabilities. We invite you to connect with our division directors to explore opportunities to work together!
            </p>
            <h2>Instructional Materials Division</h2>
            <h3>Our Capabilities</h3>
            <ul>
              <li>Develop research-based science materials for broad dissemination
                <ul>
                  <li>Produce K-12 curricula across all science disciplines</li>
                  <li>Create digital, highly interactive curriculum units</li>
                  <li>Update materials for Next Generation Science Standards (NGSS) alignment</li>
                </ul>
              </li>
              <li>Collaborate with curriculum development partners
                <ul>
                  <li>Produce new, NGSS-based curricula</li>
                  <li>Field-test curriculum units with science teachers</li>
                  <li>Review science instructional materials for coherence and NGSS alignment</li>
                  <li>Customize science content material for specific locations and contexts</li>
                  <li>Design and contribute content for open-source science instructional materials</li>
                </ul>
              </li>
            </ul>
            <p>Please contact BSCS Instructional Materials Division Director, Dr. Lindsey Mohan (hyperlink to email), to discuss opportunities to work together.</p>

            <h2>Division of Professional Learning</h2>
            <h3>Our Capabilities</h3>
            <ul>
              <li>
                <ul>Deliver proven-effective STeLLA (hyperlink) teacher professional learning program
                  <li>Support teachers in using high-leverage science teaching strategies through video-based lesson analysis</li>
                  <li>Work closely with teachers over the course of one school year</li>
                </ul>
              </li>
              <li>
                <ul>
                  <li>inservice teachers, preservice teachers, and education leaders;</li>
                  <li>lower elementary, upper elementary, middle school, high school, and postsecondary grade levels;</li>
                  <li>schools and districts in urban and rural locations; and</li>
                  <li>face-to-face and/or facilitated online learning settings.</li>
                </ul>
              </li>
              <li>
                <ul>
                  <li>Support educators and leaders in navigating the standards and effectively implementing 3-D, phenomena/problem-driven teaching and learning</li>
                  <li>Prepare educators and leaders to evaluate, select, and implement instructional materials designed for next generation science</li>
                </ul>
              </li>
            </ul>
            <p>Interested in teacher professional learning or leadership development? Register now for upcoming programs (hyperlink) or check out our Educator Resource Center (hyperlink).</p>
            <p>Please contact BSCS Associate Director for Strategic Partnerships &amp; Professional Learning, Jody Bintz (hyperlink to email), to discuss opportunities to work together.</p>

            <h2>Division of Research</h2>
            <h3>Our Capabilities</h3>
            <ul>
              <li>
                <ul>Rigorous intervention research
                  <li>Randomized controlled trials at the district, school, and classroom levels</li>
                  <li>Quasi-experiments at district, school, and classroom levels</li>
                  <li>All science disciplines</li>
                  <li>K-12, postsecondary, and inservice teacher participants</li>
                  <li>Multiple outcome domains: content knowledge for teachers and students, three-dimensional assessments, teacher classroom practice, and pedagogical content knowledge</li>
                </ul>
              </li>
              <li>
                <ul>Synthesis and quantitative meta-analysis
                  <li>Small- or large-scale reviews</li>
                  <li>Traditional quantitative methods</li>
                  <li>Meta-regression, including robust variance estimation</li>
                  <li>Creation of online applications to share findings with a wide audience</li>
                </ul>
              </li>
              <li>
                <ul>Design-based research and field trials
                  <li>Rapid design/test/revise iterations</li>
                  <li>Data collection from multiple stakeholders to inform development and revision efforts</li>
                </ul>
              </li>
              <li>
                <ul>External evaluations
                  <li>Comprehensive process evaluations</li>
                  <li>Complete reports to funding agencies</li>
                </ul>
              </li>
            </ul>
            <p>Please contact BSCS Research Division Directors, Dr. Susan Kowalski and Dr. Chris Wilson (hyperlink to emails), to discuss opportunities to work together.</p>

            <h2>Our Partners &amp; Collaborators</h2>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default props => (
  <Location>
    {locationProps => <WorkWithUsPage {...locationProps} {...props} />}
  </Location>
)