import React from 'react'
import { Link } from 'gatsby'
import { Location } from '@reach/router'
import SEO from '../../components/seo'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Layout from '../../components/layout/layout'
import Row from 'react-bootstrap/Row'

import '../../global-scss/index.scss'
import './reports.scss'
import PageTitle from '../../components/layout/page-title/page-title'

const Reports = (props) => {
  return (
    <>
      <SEO title="Reports" keywords={[`gatsby`, `application`, `react`]} />
      <Layout location={props.location}>
        <section className="section" style={{ padding: '.75rem 1.5rem' }}>
          <Container>
            <PageTitle title="Reports" />
            <Row style={{ marginBottom: '2rem' }}>
              <Col>
                <p>Lorem ipsum dolor amet edison bulb portland thundercats cloud bread, snackwave literally live-edge synth selvage wolf hammock street art. Tofu semiotics normcore, polaroid DIY banh mi ugh keytar microdosing plaid roof party disrupt food truck hoodie. Edison bulb hella stumptown, taxidermy sustainable kitsch direct trade. Biodiesel beard art party, irony pabst lo-fi pitchfork plaid adaptogen yuccie tumblr live-edge. Taxidermy chambray cronut, narwhal brunch occupy austin glossier gluten-free prism iPhone ennui. Vegan keffiyeh tilde wolf.</p>

                <p>Kickstarter sustainable cray small batch put a bird on it brunch narwhal YOLO cronut photo booth hell of blue bottle. Lomo venmo flannel, master cleanse wayfarers chicharrones everyday carry narwhal 8-bit portland austin banjo vinyl. Pour-over freegan +1, craft beer wayfarers pop-up blog keffiyeh bicycle rights tofu waistcoat. Plaid fixie vape heirloom gastropub man bun jianbing. Pitchfork yuccie forage, dreamcatcher venmo godard pabst bicycle rights tofu quinoa pinterest polaroid affogato ugh. Asymmetrical copper mug readymade wayfarers.</p>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="section">
          <Container>
            <Row>
              <Col 
                md={4}
                className="rrc-card-col"
              >
                <Card 
                  className="rrc-card"
                >
                  <Card.Body>
                    <Card.Title>Math/Science Teacher Leadership Synthesis Project</Card.Title>
                    <Card.Text className="rrc-excerpt">
                      The <strong>Developing math/science teacher leadership: A consensus approach to evaluating program quality</strong> project is funded by the National Science Foundation (ECR 1534698). The purpose of this synthesis project is to build consensus on the key attributes of high-quality math/science teacher leadership development programs.
                    </Card.Text>
                    <Link 
                      to={`/resources/reports/math-science-teacher-leadership-synthesis-project`} 
                      className="rrc-read-more"
                    >
                      <Button variant="outline-secondary">Read More</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      </Layout>
    </>
  )
}

export default props => (
  <Location>
    {locationProps => <Reports {...locationProps} {...props} />}
  </Location>
)
