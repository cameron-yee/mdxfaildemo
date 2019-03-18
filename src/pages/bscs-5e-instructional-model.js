import React, { Component } from 'react'
import { Location } from '@reach/router'

import SEO from '../components/seo'
import GeneralContactFormButton from '../components/atoms/forms/general-contact-form/general-contact-form-button/general-contact-form-button'
import Layout from '../components/layout/layout'
import PageTitle from '../components/layout/page-title/page-title'

import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

const BSCS5eInstructionalModelPage = class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      launchGeneral: false,
    }
  }

  render() {
    return (
        <Layout location={this.props.location} launchGeneral={this.state.launchGeneral} closeGeneral={() => this.setState({launchGeneral: false})}>
          <SEO title="BSCS 5E Instructional Model" />
          <Container>
            <PageTitle title="BSCS 5E Instructional Model" />
            <Row style={{ marginBottom: '2rem' }}>
              <Col>
                <p>Did you know the BSCS 5Es were developed in 1987? Did you know they were developed during a retreat in Colorado that was part of the curriculum development of BSCS Science for Life and Living?</p>

                <p>Do you know why each phase in the instructional model begins with the letter E?</p>

                <p>Watch our brand new three-part series on the BSCS 5Es and learn how they came to be, how they've evolved over time, and in what ways they've made such a huge and lasting impact on teaching and learning.</p>

                <p>Don't miss this fascinating conversation between former BSCS Executive Director Janet Carlson and former Senior Science Educator Nancy Landes, who took part in that 5E retreat.</p>
              </Col>
              <Col>
                <img src="https://media.bscs.org/bscsmw/5es/5e_emblem_transparent.png" alt="5Es. Developed by BSCS in 1987." />
              </Col>
            </Row>
            <Row className="justify-content-md-center" style={{marginBottom: '2rem'}}>
              <Col xs={12} md={8}>
                <div className="d-flex adjust-content-center flex-wrap">
                  <iframe title="BSCS On Topic: The BSCS 5E Instructional Model (Part 1): Creating the 5E Model" className="p-2" width="622" height="350" src="https://www.youtube.com/embed/WDAtdpQhxYk" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

                  <iframe title="BSCS On Topic: The BSCS 5E Instructional Model (Part 2): How the 5Es Evolved Over Time" className="p-2" width="622" height="350" src="https://www.youtube.com/embed/c242mIDLgUE" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

                  <iframe title="BSCS On Topic: The BSCS 5E Instructional Model (Part 3): Why the 5Es Remain Relevant Today" className="p-2" width="622" height="350" src="https://www.youtube.com/embed/G4J4Am8vLrY" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
{/* width="930" height="523"  */}
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <a href="https://media.bscs.org/bscsmw/5es/bscs_5e_full_report.pdf" target="_blank" rel="noopener noreferrer">The BSCS 5E Instructional Model: Origins and Effectiveness, Full Report</a>
                <p>5E full report prepared for NIH (National Institutes of Health), June 2006</p>

                <a href="https://media.bscs.org/bscsmw/5es/bscs_5e_full_report.pdf" target="_blank" rel="noopener noreferrer">The BSCS 5E Instructional Model: Origins and Effectiveness, Executive Summary</a>
                <p>5E executive summary, July 2006</p>

                <a href="https://media.bscs.org/bscsmw/5es/measuring_efficacy_flyer.pdf" target="_blank" rel="noopener noreferrer">The BSCS Advantage</a>
                <p>Data based on the results of a 4-year research study of high school science materials, 2013</p>

                <p><a href="http://www.bioedonline.org/videos/supplemental-videos/5e-model-for-teaching-inquiry-science/" target="_blank" rel="noopener noreferrer">Watch a 7-minute presentation of the BSCS 5E Instructional Model</a> by Nancy P. Moreno, PhD, BioEd Online, Science Teacher Resources from Baylor College of Medicine.</p>
                <p></p>
              </Col>
            </Row>
            <Row style={{marginBottom: '2rem'}}>
              <Col>
                <p>The <strong>BSCS 5E Instructional Model</strong> has its origins with the work of earlier science educators, in particular the Karplus and Thier learning cycle developed for the Science Curriculum Improvement Study (SCIS). The findings reported in the National Research Council research summary How People Learn supports the design and sequence of the BSCS 5E Instructional Model. Since the late 1980s, BSCS has used the 5E Instructional Model extensively in the development of new curriculum materials and professional development experiences. The BSCS 5E Instructional Model also enjoys widespread use beyond BSCS: at least three states strongly endorse using the BSCS 5E Instructional Model, and a Google search shows ubiquitous use of the model for curriculum frameworks, assessment guidelines, or course outlines; curriculum materials; and teacher professional development.</p>

                <p><strong>Findings related to the BSCS 5E Instructional Model:</strong></p>

                <ul>
                  <li>The <strong>BSCS 5E Instructional Model</strong> is grounded in sound educational theory, has a growing base of research to support its effectiveness, and has had a significant impact on science education.</li>

                  <li>The most noticeable void in the literature is research exploring how the 5E approach helps students develop an understanding of the nature of science, and practical and teamwork skills.</li>

                  <li>These conclusions indicate the need to conduct further research comparing the effect of the 5E Instructional Model on mastery of subject matter, scientific reasoning, and interest and attitudes with other modes of instruction.</li>

                  <li>Continued work is expected to lead to refinement of the model based on research on learning.</li>
                </ul>

                <p><strong>What the BSCS 5E Instructional Model is/does:</strong></p>

                <ul>
                  <li>The five phases of the <strong>BSCS 5E Instructional Model</strong> are designed to facilitate the process of conceptual change.</li>
                  <li>The use of this model brings coherence to different teaching strategies, provides connections among educational activities, and helps science teachers make decisions about interactions with students.</li>
                  <li>Each phase of the model and a short phrase to indicate its purpose from a student perspective are:</li>
                  <ul>
                    <li>Engagement - students' prior knowledge accessed and interest engaged in the phenomenon</li>
                    <li>Exploration - students participate in an activity that facilitates conceptual change</li>
                    <li>Explanation - students generate an explanation of the phenomenon</li>
                    <li>Elaboration - students' understanding of the phenomenon challenged and deepened through new experiences</li>
                    <li>Evaluation - students assess their understanding of the phenomenon</li>
                  </ul>
                </ul>                

                <p>For more information:</p>
                <GeneralContactFormButton launch={() => this.setState({launchGeneral: true})}>Contact Us</GeneralContactFormButton>
              </Col>
            </Row>
          </Container>
        </Layout>
    )
  }
}

export default props => (
  <Location>
    {locationProps => <BSCS5eInstructionalModelPage {...locationProps} {...props} />}
  </Location>
)
