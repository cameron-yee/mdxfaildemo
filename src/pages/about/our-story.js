import React, { Component } from 'react'
import { Location } from '@reach/router'

import SEO from '../../components/seo'
import Layout from '../../components/layout/layout'
import PageTitle from '../../components/layout/page-title/page-title'

import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

const OurStoryPage = class extends Component {
  render() {
    return (
        <Layout location={this.props.location}>
          <SEO
            title="BSCS Science Learning -- celebrating 60 years"
            description="BSCS has a rich history of transforming science teaching and learning over the last 60 years. Read our story."
            canonical="https://bscs.org/about/our-story/"
          />
          <Container>
            <PageTitle title="Our Story" />
            <Row style={{ marginBottom: '2rem' }}>
              <Col>
                <p><strong>Our Story</strong></p>

                <p>It was 1957. The Soviets launched the world’s first satellite, called Sputnik. And just like that—the United States was trailing the space race. We attempted to catch up by launching our own satellite two months later. We failed. This was a pivotal moment, representing a major shortcoming in our nation’s scientific progress. And this is where our story—BSCS Science Learning’s story—began.</p>

                <p>As the Cold War heated up, the US recognized the need for science education reform. A whirlwind of action followed in 1958. The National Aeronautics and Space Administration (NASA) was created. Congress passed the National Defense Education Act (NDEA). And the National Science Foundation (NSF) established BSCS to develop state-of-the-art biology textbooks for students across the country.</p>

                <p>Even in our earliest days, working within the University of Colorado Boulder, we were invested in the big picture: to transform science education. Our goal was not just to create effective biology curriculum. Our goal was to enhance biology teaching and learning. By embracing students’ inquisitive spirits and making them active participants in the scientific process, we believed students would create stronger connections between science and the world around them.</p>

                <p>This was only the starting point for what we would contribute to science education. Today, as an independent 501(c)(3) nonprofit organization headquartered in Colorado Springs, we are proud of what we have accomplished over the last 60 years.</p>

                <p>BSCS has filled classrooms around the country with research-driven biology textbooks, pioneered effective teaching approaches, developed new education leaders, and conducted studies that will continue to alter the course of our science education system. Most importantly, we have championed the cause for meaningful, inquiry-based science learning.</p>

                <p>There is no doubt we have made a lasting impact. But our world has changed dramatically. Science and technology have advanced. Our students are more diverse. Our teachers are being asked to do more with less. And as much as BSCS has accomplished, it feels like our work is just beginning.</p>

                <p>We celebrated the 60th anniversary of our storied organization in 2018, and are optimistic about our future. Our work remains driven by a vision of our society providing all young people with a science education that effectively prepares them for life in our complex, interdependent world.</p>

                <p><strong>History of Our Name</strong></p>

                <p>Did you know BSCS Science Learning was originally founded as Biological Sciences Curriculum Study (BSCS)? Like our organization, our name has a rich history.</p>

                <p>From our origin as a single curriculum development project created by the National Science Foundation, we have grown into an independent nonprofit organization—recognized as a national leader in research, teacher professional learning, leadership development, and of course, instructional materials.</p>

                <p>Our impact has expanded considerably over 60 years. And thus in 2018, we announced a new name for our organization that reflects our present and our future: BSCS Science Learning.</p>

                <p>We put science learning at the heart of our name because science learning is at the heart of our work.</p>

                <p>As researchers, we pursue deeper understandings of how teachers and students learn science through ongoing studies. As educators, we prepare teachers to improve their practice by enhancing their own science learning and by offering powerful curriculum materials. As capacity builders, we develop leaders to create a stronger system for science learning. And as an organization, we remain committed to transforming science education so that all students have an opportunity to learn science for their lives and careers.</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <div class="timeline">
                  <div class="timeline-container timeline-left">
                    <div class="timeline-content">
                      <h2>1958</h2>
                      <p>Biological Sciences Curriculum Study (BSCS) is founded in Boulder, CO.</p>
                    </div>
                  </div>
                  <div class="timeline-container timeline-right">
                    <div class="timeline-content">
                      <h2>1963</h2>
                      <p>First versions of BSCS's high school biology program (Yellow, Blue, and Green) are published after three years of field-testing.</p>
                    </div>
                  </div>
                  <div class="timeline-container timeline-left">
                    <div class="timeline-content">
                      <h2>1968</h2>
                      <p>From 1968 to 1970, the percentage of students who take the College Board exam in biology and a BSCS biology course increase from 35% to 47%.</p>
                    </div>
                  </div>
                  <div class="timeline-container timeline-right">
                    <div class="timeline-content">
                      <h2>1972</h2>
                      <p>BSCS becomes an independent 501(c)(3) nonprofit.</p>
                    </div>
                  </div>
                  <div class="timeline-container timeline-left">
                    <div class="timeline-content">
                      <h2>1975</h2>
                      <p>Throughout the mid 1970's, 50% of all high schools use some BSCS program.</p>
                    </div>
                  </div>
                  <div class="timeline-container timeline-right">
                    <div class="timeline-content">
                      <h2>1979</h2>
                      <p>2 millionth copy of BSCS Green Version is sold.</p>
                    </div>
                  </div>
                  <div class="timeline-container timeline-left">
                    <div class="timeline-content">
                      <h2>1982</h2>
                      <p>BSCS moves to Colorado College campus in Colorado Springs.</p>
                    </div>
                  </div>
                  <div class="timeline-container timeline-right">
                    <div class="timeline-content">
                      <h2>1987</h2>
                      <p>BSCS develops 5E Instructional Model, which becomes the global standard for science curriculum development.</p>
                    </div>
                  </div>
                  <div class="timeline-container timeline-left">
                    <div class="timeline-content">
                      <h2>1994</h2>
                      <p>BSCS purchases a building in Colorado Springs and moves its headquarters to Mark Dabling Blvd.</p>
                    </div>
                  </div>
                  <div class="timeline-container timeline-right">
                    <div class="timeline-content">
                      <h2>2002</h2>
                      <p>BSCS creates three Centers: Curriculum Development, Professional Development, and Research & Evaluation (which today are three similarly-structured BSCS Divisions).</p>
                    </div>
                  </div>
                  <div class="timeline-container timeline-left">
                    <div class="timeline-content">
                      <h2>2010</h2>
                      <p>Colorado educators participate in BSCS's first research study on STeLLA, which becomes the organization's nationally-recognized approach to teacher professional learning.</p>
                    </div>
                  </div>
                  <div class="timeline-container timeline-right">
                    <div class="timeline-content">
                      <h2>2016</h2>
                      <p>BSCS launches a strategic planning process that results in three long-term, strategic initiatives: 21st Century High School Biology, "VIP" Professional Learning for 21st Century Teaching, and Equity & Social Justice.</p>
                    </div>
                  </div>
                  <div class="timeline-container timeline-left">
                    <div class="timeline-content">
                      <h2>2018</h2>
                      <p>BSCS celebrates its 60th anniversary and rebrands from Biological Sciences Curriculum Study to BSCS Science Learning.</p>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </Layout>
    )
  }
}

export default props => (
  <Location>
    {locationProps => <OurStoryPage {...locationProps} {...props} />}
  </Location>
)
