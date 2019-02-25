import React from 'react'
import { graphql, Link } from 'gatsby'
import { Location } from '@reach/router'
import SEO from '../../components/seo'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Layout from '../../components/layout/layout'
import Row from 'react-bootstrap/Row'

import '../../global-scss/index.scss';
import './reports.scss';
import PageTitle from '../../components/layout/page-title/page-title';

const ResearchResourceCenter = (props) => {
  const courses = props.data.allMarkdownRemark.edges;

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
              {
                courses.map((edge, index) => {
                  return(
                    <Col md={4} key={edge.node.id} className="rrc-card-col">
                      <Card id={`resource-${index}`} className="rrc-card" data-filter={JSON.stringify(edge.node.frontmatter)} data-type={edge.node.frontmatter.type}>
                        <div className="rrc-card-img-wrapper">
                          <Card.Img variant="top" className="rrc-card-img" src={edge.node.frontmatter.image}/>
                        </div>
                        <Card.Body>
                          <Card.Title>{edge.node.frontmatter.title}</Card.Title>
                          <Card.Text className="rrc-excerpt">{edge.node.excerpt}</Card.Text>
                          {/* <Link to={`/resources/research-resource-center/${edge.node.frontmatter.title.replace(/\s/g, '-').replace(/[^a-zA-Z-]/g, '').toLowerCase()}`} className="read-more"><Button variant="primary">Read More</Button></Link> */}
                          <Link to={`/resources/reports/${edge.node.frontmatter.title.replace(/\s/g, '-').replace(/[^a-zA-Z0-9-]/g, '').toLowerCase()}`} className="rrc-read-more"><Button variant="primary">Read More</Button></Link>
                        </Card.Body>
                      </Card>
                    </Col>
                  )
                }) 
              }
            </Row>
          </Container>
        </section>
      </Layout>
    </>
  )
}

export default props => (
  <Location>
    {locationProps => <ResearchResourceCenter {...locationProps} {...props} />}
  </Location>
)

export const educatorResourceQuery = graphql`
  query researchResourceQuery {
    allMarkdownRemark(filter: {frontmatter: { page: {eq: "research-resource-center"}}}) {
      edges {
        node {
          id
          excerpt(pruneLength: 200)
          frontmatter {
            additionalTags,
            alt,
            date,
            discipline,
            image,
            title,
            page
          }
        }
      }
    }
  }
`
