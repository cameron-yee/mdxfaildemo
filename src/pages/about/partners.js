import React, { Component } from 'react'
import { Location } from '@reach/router'

import SEO from '../../components/seo'
import Layout from '../../components/layout/layout'
import PageTitle from '../../components/layout/page-title/page-title'

import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import Accordion from '../../components/atoms/accordion/accordion'


const Partners = class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      launchGeneral: false,
    }
  }

  render() {
    return (
        <Layout location={this.props.location} launchGeneral={this.state.launchGeneral} closeGeneral={() => this.setState({launchGeneral: false})}>
          <SEO title="Partners &amp; Collaborators" />
          <Container>
            <PageTitle title="Partners &amp; Collaborators" />
            <Row className="justify-content-md-center" style={{marginBottom: '1rem'}}>
              <Col>
                <p>
                  BSCS Science Learning works with a range of businesses, organizations, universities, schools, and districts. See below for a sample of our partners and collaborators over the years.
                </p>
              </Col>
            </Row>
            <Row className="d-flex flex-wrap-reverse" style={{ marginBottom: '2rem' }}>
              <Col className="p-2">
                <Accordion
                  panels={panels}
                />
              </Col>
            </Row>
          </Container>
        </Layout>
    )
  }
}

export default props => (
  <Location>
    {locationProps => <Partners {...locationProps} {...props} />}
  </Location>
)

const panels = [
	{
		heading: `Businesses and Organizations`,
		content:
      <>
        <ul>
          <li>Achieve</li>
          <li>Agile Mind</li>
          <li>American Association for the Advancement of Science (AAAS)</li>
          <li>American Chemical Society</li>
          <li>American Institute of Biological Sciences (AIBS)</li>
          <li>American Museum of Natural History (AMNH)</li>
          <li>Arizona Department of Education</li>
          <li>Arizona Science Teachers Association</li>
          <li>Association for Science Teacher Education (ASTE)</li>
          <li>Association of Zoos & Aquariums</li>
          <li>BEACON Center for the Study of Evolution in Action</li>
          <li>Blackdove Studios</li>
          <li>Botanical Society of America</li>
          <li>Center to Support Excellence in Teaching, Stanford University (CSET)</li>
          <li>Charles A. Dana Center at The University of Texas at Austin</li>
          <li>Children's Hospital Colorado</li>
          <li>Colorado Science Education Network</li>
          <li>Concord Consortium</li>
          <li>CREATE for STEM (at MSU)</li>
          <li>Digital Promise</li>
          <li>GLOBE Implementation Office</li>
          <li>Gordon and Betty Moore Foundation</li>
          <li>Gulf of Maine Research Institute</li>
          <li>Horizon Research, Inc.</li>
          <li>Howard Hughes Medical Institute (HHMI) BioInteractive</li>
          <li>Kendall Hunt Publishing Company</li>
          <li>McREL</li>
          <li>Minnesota Department of Education</li>
          <li>Monterey Bay Aquarium</li>
          <li>National Association for Research in Science Teaching (NARST)</li>
          <li>National Association of Biology Teachers (NABT)</li>
          <li>National Council for Geographic Education</li>
          <li>National Institutes of Health</li>
          <li>National Science Education Leadership Association (NSELA)</li>
          <li>National Science Foundation (NSF)</li>
          <li>National Science Teachers Association (NSTA)</li>
          <li>Nebraska Department of Education</li>
          <li>New Mexico Public Education Department</li>
          <li>North American Association for Environmental Education (NAAEE)</li>
          <li>Oregon Public Broadcasting (OPB)</li>
          <li>Pisces Foundation</li>
          <li>SeaPerch at RoboNation</li>
          <li>Society for Research on Educational Effectiveness (SREE)</li>
          <li>TERC</li>
          <li>UCAR Center for Science Education</li>
          <li>US Department of Education</li>
          <li>WestEd</li>
          <li>WGBH</li>
          <li>Wyoming Department of Education</li>
        </ul>
      </>
    ,
	},
	{
		heading: `Universities`,
		content:
      <>
        <ul>
          <li>Boston College</li>
          <li>California State Polytechnic University– Pomona</li>
          <li>Colorado College</li>
          <li>Colorado State University</li>
          <li>DePaul University</li>
          <li>Florida Agricultural and Mechanical University</li>
          <li>Georgia Tech Research Institute</li>
          <li>Loyola University</li>
          <li>Miami University</li>
          <li>Michigan State University</li>
          <li>Montana State University</li>
          <li>Northwestern University</li>
          <li>Rice University</li>
          <li>Stanford University</li>
          <li>University of California, Berkeley</li>
          <li>University of California, Davis</li>
          <li>University of Chicago</li>
          <li>University of Colorado, Boulder</li>
          <li>University of Colorado, Colorado Springs</li>
          <li>University of Georgia</li>
          <li>University of Houston – Victoria</li>
          <li>University of Louisville (Kentucky)</li>
          <li>University of Minnesota Twin Cities</li>
          <li>University of Missouri</li>
          <li>University of Nebraska Medical Center</li>
          <li>University of New Mexico</li>
          <li>University of Northern Colorado</li>
          <li>University of North Texas</li>
        </ul>
      </>
    ,
	},
	{
		heading: `Schools and Districts`,
		content:
      <>
        <ul>
          <li>Achievement First (Connecticut, New York, and Rhode Island)</li>
          <li>Alpine School District (Utah)</li>
          <li>Arvada West High School (Colorado)</li>
          <li>Boulder Valley School District (Colorado)</li>
          <li>Chicago Public Schools (Illinois)</li>
          <li>Colorado Springs School District 11 (Colorado)</li>
          <li>The Dalton School (New York)</li>
          <li>Denver Public Schools (Colorado)</li>
          <li>Fairfax County Public Schools (Virginia)</li>
          <li>Friends Academy (New York)</li>
          <li>Gunnison Watershed School District (Colorado)</li>
          <li>Harrison School District 2 (Colorado)</li>
          <li>Jefferson County Public Schools (Colorado)</li>
          <li>Jefferson County Public Schools (Kentucky)</li>
          <li>Mesa County Valley School District 51 (Colorado)</li>
          <li>Minneapolis Public Schools (Minnesota)</li>
          <li>Newberg School District (Oregon)</li>
          <li>Oʻahu Leilehua-Mililani-Waialua Complex (Hawaii)</li>
          <li>Owatonna Public Schools (Minnesota)</li>
          <li>Pomona Unified School District (California)</li>
          <li>Riverdale Country School (New York)</li>
          <li>Saint Paul Public Schools (Minnesota)</li>
          <li>Salt Lake City School District (Utah)</li>
          <li>San Francisco Unified School District (California)</li>
          <li>School District of Hartford Joint No. 1 (Wisconsin)</li>
          <li>Seattle Public Schools (Washington)</li>
          <li>Tumwater School District (Washington)</li>
          <li>Winona Area Public Schools (Minnesota)</li>
        </ul>
      </>
    ,
	},
]
