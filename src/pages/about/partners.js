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
        <ul style={{ listStyleType: 'none' }}>
          <li>
            <a
              href="https://www.achieve.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Achieve
            </a>
          </li>
          <li>
            <a
              href="https://www.agilemind.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Agile Mind
            </a>
          </li>
          <li>
            <a
              href="https://www.aaas.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              American Association for the Advancement of Science (AAAS)
            </a>
          </li>
          <li>
            <a
              href="https://www.acs.org/content/acs/en.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              American Chemical Society
            </a>
          </li>
          <li>
            <a
              href="https://www.aibs.org/home/index.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              American Institute of Biological Sciences (AIBS)
            </a>
          </li>
          <li>
            <a
              href="https://www.amnh.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              American Museum of Natural History (AMNH)
            </a>
          </li>
          <li>
            <a
              href="https://www.azed.gov"
              target="_blank"
              rel="noopener noreferrer"
            >
              Arizona Department of Education
            </a>
          </li>
          <li>
            <a
              href="https://azsta.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Arizona Science Teachers Association
            </a>
          </li>
          <li>
            <a
              href="https://theaste.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Association for Science Teacher Education (ASTE)
            </a>
          </li>
          <li>
            <a
              href="https://www.aza.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Association of Zoos &amp; Aquariums
            </a>
          </li>
          <li>
            <a
              href="https://www3.beacon-center.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              BEACON Center for the Study of Evolution in Action
            </a>
          </li>
          <li>
            <a
              href="https://www.smartshoot.com/blackdovestudios"
              target="_blank"
              rel="noopener noreferrer"
            >
              Blackdove Studios
            </a>
          </li>
          <li>
            <a
              href="https://www.botany.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Botanical Society of America
            </a>
          </li>
          <li>
            <a
              href="https://cset.stanford.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              Center to Support Excellence in Teaching, Stanford University (CSET)
            </a>
          </li>
          <li>
            <a
              href="https://www.utdanacenter.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Charles A. Dana Center at The University of Texas at Austin
            </a>
          </li>
          <li>
            <a
              href="https://www.childrenscolorado.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Children's Hospital Colorado
            </a>
          </li>
          <li>
            <a
              href="https://lists.colorado.edu/sympa/info/csen-all"
              target="_blank"
              rel="noopener noreferrer"
            >
              Colorado Science Education Network
            </a>
          </li>
          <li>
            <a
              href="https://concord.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Concord Consortium
            </a>
          </li>
          <li>
            <a
              href="https://create4stem.msu.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              CREATE for STEM (at MSU)
            </a>
          </li>
          <li>
            <a
              href="https://digitalpromise.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Digital Promise
            </a>
          </li>
          <li>
            <a
              href="https://www.globe.gov/about/gio"
              target="_blank"
              rel="noopener noreferrer"
            >
              GLOBE Implementation Office
            </a>
          </li>
          <li>
            <a
              href="https://www.moore.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Gordon and Betty Moore Foundation
            </a>
          </li>
          <li>
            <a
              href="https://www.gmri.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Gulf of Maine Research Institute
            </a>
          </li>
          <li>
            {/* <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
            > */}
              Horizon Research, Inc.
            {/* </a> */}
          </li>
          <li>
            <a
              href="https://www.hhmi.org/biointeractive"
              target="_blank"
              rel="noopener noreferrer"
            >
              Howard Hughes Medical Institute (HHMI) BioInteractive
            </a>
          </li>
          <li>
            <a
              href="https://www.kendallhunt.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Kendall Hunt Publishing Company
            </a>
          </li>
          <li>
            <a
              href="https://www.mcrel.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              McREL
            </a>
          </li>
          <li>
            <a
              href="https://education.mn.gov/mde/index.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              Minnesota Department of Education
            </a>
          </li>
          <li>
            <a
              href="https://www.montereybayaquarium.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Monterey Bay Aquarium
            </a>
          </li>
          <li>
            <a
              href="https://www.narst.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              National Association for Research in Science Teaching (NARST)
            </a>
          </li>
          <li>
            <a
              href="https://nabt.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              National Association of Biology Teachers (NABT)
            </a>
          </li>
          <li>
            {/* <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
            > */}
              National Council for Geographic Education
            {/* </a> */}
          </li>
          <li>
            <a
              href="https://www.nih.gov"
              target="_blank"
              rel="noopener noreferrer"
            >
              National Institutes of Health
            </a>
          </li>
          <li>
            <a
              href="https://www.nsela.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              National Science Education Leadership Association (NSELA)
            </a>
          </li>
          <li>
            <a
              href="https://www.nsf.gov"
              target="_blank"
              rel="noopener noreferrer"
            >
              National Science Foundation (NSF)
            </a>
          </li>
          <li>
            <a
              href="https://www.nsta.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              National Science Teachers Association (NSTA)
            </a>
          </li>
          <li>
            <a
              href="https://www.education.ne.gov"
              target="_blank"
              rel="noopener noreferrer"
            >
              Nebraska Department of Education
            </a>
          </li>
          <li>
            <a
              href="https://webnew.ped.state.nm.us"
              target="_blank"
              rel="noopener noreferrer"
            >
              New Mexico Public Education Department
            </a>
          </li>
          <li>
            <a
              href="https://naaee.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              North American Association for Environmental Education (NAAEE)
            </a>
          </li>
          <li>
            <a
              href="https://www.opb.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Oregon Public Broadcasting (OPB)
            </a>
          </li>
          <li>
            <a
              href="https://piscesfoundation.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pisces Foundation
            </a>
          </li>
          <li>
            <a
              href="https://www.seaperch.org/index"
              target="_blank"
              rel="noopener noreferrer"
            >
              SeaPerch at RoboNation
            </a>
          </li>
          <li>
            <a
              href="https://www.sree.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Society for Research on Educational Effectiveness (SREE)
            </a>
          </li>
          <li>
            <a
              href="https://www.terc.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              TERC
            </a>
          </li>
          <li>
            <a
              href="https://scied.ucar.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              UCAR Center for Science Education
            </a>
          </li>
          <li>
            <a
              href="https://www.ed.gov"
              target="_blank"
              rel="noopener noreferrer"
            >
              US Department of Education
            </a>
          </li>
          <li>
            <a
              href="https://www.wested.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              WestEd
            </a>
          </li>
          <li>
            <a
              href="https://www.wgbh.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              WGBH
            </a>
          </li>
          <li>
            <a
              href="https://edu.wyoming.gov"
              target="_blank"
              rel="noopener noreferrer"
            >
              Wyoming Department of Education
            </a>
          </li>
        </ul>
      </>
    ,
	},
	{
		heading: `Universities`,
		content:
      <>
        <ul style={{ listStyleType: 'none' }}>
          <li>
            <a
              href="https://www.bc.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              Boston College
            </a>
          </li>
          <li>
            <a
              href="https://www.cpp.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              California State Polytechnic University– Pomona
            </a>
          </li>
          <li>
            <a
              href="https://www.coloradocollege.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              Colorado College
            </a>
          </li>
          <li>
            <a
              href="https://www.colostate.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              Colorado State University
            </a>
          </li>
          <li>
            <a
              href="https://www.depaul.edu/Pages/default.aspx"
              target="_blank"
              rel="noopener noreferrer"
            >
              DePaul University
            </a>
          </li>
          <li>
            <a
              href="https://www.famu.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              Florida Agricultural and Mechanical University
            </a>
          </li>
          <li>
            <a
              href="https://www.gtri.gatech.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              Georgia Tech Research Institute
            </a>
          </li>
          <li>
            <a
              href="https://www.luc.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              Loyola University
            </a>
          </li>
          <li>
            <a
              href="https://www.miami.miamioh.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              Miami University
            </a>
          </li>
          <li>
            <a
              href="https://msu.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              Michigan State University
            </a>
          </li>
          <li>
            {/* <a
              href="http://www.montana.edu/"
              target="_blank"
              rel="noopener noreferrer"
            > */}
              Montana State University
            {/* </a> */}
          </li>
          <li>
            <a
              href="https://www.northwestern.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              Northwestern University
            </a>
          </li>
          <li>
            <a
              href="https://www.rice.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              Rice University
            </a>
          </li>
          <li>
            <a
              href="https://www.stanford.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              Stanford University
            </a>
          </li>
          <li>
            <a
              href="https://www.berkeley.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              University of California, Berkeley
            </a>
          </li>
          <li>
            <a
              href="https://www.ucdavis.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              University of California, Davis
            </a>
          </li>
          <li>
            <a
              href="https://www.uchicago.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              University of Chicago
            </a>
          </li>
          <li>
            <a
              href="https://www.colorado.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              University of Colorado, Boulder
            </a>
          </li>
          <li>
            <a
              href="https://www.uccs.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              University of Colorado, Colorado Springs
            </a>
          </li>
          <li>
            <a
              href="https://www.uga.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              University of Georgia
            </a>
          </li>
          <li>
            <a
              href="https://www.uhv.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              University of Houston – Victoria
            </a>
          </li>
          <li>
            <a
              href="https://louisville.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              University of Louisville (Kentucky)
            </a>
          </li>
          <li>
            <a
              href="https://twin-cities.umn.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              University of Minnesota Twin Cities
            </a>
          </li>
          <li>
            <a
              href="https://missouri.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              University of Missouri
            </a>
          </li>
          <li>
            <a
              href="https://www.unmc.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              University of Nebraska Medical Center
            </a>
          </li>
          <li>
            <a
              href="https://www.unm.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              University of New Mexico
            </a>
          </li>
          <li>
            <a
              href="https://www.unco.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              University of Northern Colorado
            </a>
          </li>
          <li>
            <a
              href="https://www.unt.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              University of North Texas
            </a>
          </li>
        </ul>
      </>
    ,
	},
	{
		heading: `Schools and Districts`,
		content:
      <>
        <ul style={{ listStyleType: 'none' }}>
          <li>
            <a
              href="https://www.achievementfirst.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Achievement First (Connecticut, New York, and Rhode Island)
            </a>
          </li>
          <li>
            <a
              href="https://alpineschools.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Alpine School District (Utah)
            </a>
          </li>
          <li>
            {/* <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
            > */}
              Arvada West High School (Colorado)
            {/* </a> */}
          </li>
          <li>
            <a
              href="https://www.bvsd.org/Pages/default.aspx"
              target="_blank"
              rel="noopener noreferrer"
            >
              Boulder Valley School District (Colorado)
            </a>
          </li>
          <li>
            <a
              href="https://cps.edu/Pages/home.aspx"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chicago Public Schools (Illinois)
            </a>
          </li>
          <li>
            <a
              href="https://www.d11.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Colorado Springs School District 11 (Colorado)
            </a>
          </li>
          <li>
            <a
              href="https://www.dalton.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              The Dalton School (New York)
            </a>
          </li>
          <li>
            <a
              href="https://www.dpsk12.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Denver Public Schools (Colorado)
            </a>
          </li>
          <li>
            <a
              href="https://www.fcps.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              Fairfax County Public Schools (Virginia)
            </a>
          </li>
          <li>
            <a
              href="https://www.fa.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Friends Academy (New York)
            </a>
          </li>
          <li>
            <a
              href="https://www.gunnisonschools.net"
              target="_blank"
              rel="noopener noreferrer"
            >
              Gunnison Watershed School District (Colorado)
            </a>
          </li>
          <li>
            <a
              href="https://www.hsd2.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Harrison School District 2 (Colorado)
            </a>
          </li>
          <li>
            <a
              href="https://www.jeffcopublicschools.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Jefferson County Public Schools (Colorado)
            </a>
          </li>
          <li>
            <a
              href="https://www.jefferson.kyschools.us"
              target="_blank"
              rel="noopener noreferrer"
            >
              Jefferson County Public Schools (Kentucky)
            </a>
          </li>
          <li>
            <a
              href="https://d51schools.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mesa County Valley School District 51 (Colorado)
            </a>
          </li>
          <li>
            {/* <a
              href="http://mpls.k12.mn.us"
              target="_blank"
              rel="noopener noreferrer"
            > */}
              Minneapolis Public Schools (Minnesota)
            {/* </a> */}
          </li>
          <li>
            <a
              href="https://www.newberg.k12.or.us"
              target="_blank"
              rel="noopener noreferrer"
            >
              Newberg School District (Oregon)
            </a>
          </li>
          <li>
            <a
              href="https://www.hawaiipublicschools.org/ConnectWithUs/Organization/OfficesAndBranches/Pages/Leilehua-Mililani-Waialua.aspx"
              target="_blank"
              rel="noopener noreferrer"
            >
              Oʻahu Leilehua-Mililani-Waialua Complex (Hawaii)
            </a>
          </li>
          <li>
            <a
              href="https://www.owatonna.k12.mn.us"
              target="_blank"
              rel="noopener noreferrer"
            >
              Owatonna Public Schools (Minnesota)
            </a>
          </li>
          <li>
            <a
              href="https://proudtobe.pusd.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pomona Unified School District (California)
            </a>
          </li>
          <li>
            <a
              href="https://www.riverdale.edu/index.cfm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Riverdale Country School (New York)
            </a>
          </li>
          <li>
            <a
              href="https://www.spps.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Saint Paul Public Schools (Minnesota)
            </a>
          </li>
          <li>
            <a
              href="https://www.slcschools.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Salt Lake City School District (Utah)
            </a>
          </li>
          <li>
            {/* <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
            > */}
              San Francisco Unified School District (California)
            {/* </a> */}
          </li>
          <li>
            <a
              href="https://www.hartfordjt1.k12.wi.us"
              target="_blank"
              rel="noopener noreferrer"
            >
              School District of Hartford Joint No. 1 (Wisconsin)
            </a>
          </li>
          <li>
            <a
              href="https://www.seattleschools.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Seattle Public Schools (Washington)
            </a>
          </li>
          <li>
            <a
              href="https://www.tumwater.k12.wa.us"
              target="_blank"
              rel="noopener noreferrer"
            >
              Tumwater School District (Washington)
            </a>
          </li>
          <li>
            <a
              href="https://www.winonaschools.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Winona Area Public Schools (Minnesota)
            </a>
          </li>
        </ul>
      </>
    ,
	},
]
