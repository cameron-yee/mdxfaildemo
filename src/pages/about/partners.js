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
          <SEO
            title="Partners &amp; Collaborators"
            description=""
            canonical="https://bscs.org/about/partners/"
          />
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
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.achieve.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Achieve
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.agilemind.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Agile Mind
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.aaas.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              American Association for the Advancement of Science (AAAS)
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.acs.org/content/acs/en.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              American Chemical Society
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.aibs.org/home/index.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              American Institute of Biological Sciences (AIBS)
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.amnh.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              American Museum of Natural History (AMNH)
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.azed.gov"
              target="_blank"
              rel="noopener noreferrer"
            >
              Arizona Department of Education
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://azsta.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Arizona Science Teachers Association
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://theaste.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Association for Science Teacher Education (ASTE)
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.aza.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Association of Zoos &amp; Aquariums
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www3.beacon-center.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              BEACON Center for the Study of Evolution in Action
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.smartshoot.com/blackdovestudios"
              target="_blank"
              rel="noopener noreferrer"
            >
              Blackdove Studios
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.botany.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Botanical Society of America
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://cset.stanford.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              Center to Support Excellence in Teaching, Stanford University (CSET)
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.utdanacenter.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Charles A. Dana Center at The University of Texas at Austin
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.childrenscolorado.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Children's Hospital Colorado
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://lists.colorado.edu/sympa/info/csen-all"
              target="_blank"
              rel="noopener noreferrer"
            >
              Colorado Science Education Network
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://concord.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Concord Consortium
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://create4stem.msu.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              CREATE for STEM (at MSU)
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://digitalpromise.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Digital Promise
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.globe.gov/about/gio"
              target="_blank"
              rel="noopener noreferrer"
            >
              GLOBE Implementation Office
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.moore.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Gordon and Betty Moore Foundation
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.gmri.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Gulf of Maine Research Institute
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            {/* <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
            > */}
              Horizon Research, Inc.
              {/* &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup> */}
            {/* </a> */}
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.hhmi.org/biointeractive"
              target="_blank"
              rel="noopener noreferrer"
            >
              Howard Hughes Medical Institute (HHMI) BioInteractive
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.kendallhunt.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Kendall Hunt Publishing Company
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.mcrel.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              McREL
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://education.mn.gov/mde/index.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              Minnesota Department of Education
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.montereybayaquarium.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Monterey Bay Aquarium
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.narst.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              National Association for Research in Science Teaching (NARST)
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://nabt.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              National Association of Biology Teachers (NABT)
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            {/* <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
            > */}
              National Council for Geographic Education
              {/* &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup> */}
            {/* </a> */}
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.nih.gov"
              target="_blank"
              rel="noopener noreferrer"
            >
              National Institutes of Health
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.nsela.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              National Science Education Leadership Association (NSELA)
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.nsf.gov"
              target="_blank"
              rel="noopener noreferrer"
            >
              National Science Foundation (NSF)
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.nsta.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              National Science Teachers Association (NSTA)
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.education.ne.gov"
              target="_blank"
              rel="noopener noreferrer"
            >
              Nebraska Department of Education
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://webnew.ped.state.nm.us"
              target="_blank"
              rel="noopener noreferrer"
            >
              New Mexico Public Education Department
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://naaee.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              North American Association for Environmental Education (NAAEE)
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.opb.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Oregon Public Broadcasting (OPB)
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://piscesfoundation.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pisces Foundation
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.seaperch.org/index"
              target="_blank"
              rel="noopener noreferrer"
            >
              SeaPerch at RoboNation
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.sree.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Society for Research on Educational Effectiveness (SREE)
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.terc.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              TERC
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://scied.ucar.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              UCAR Center for Science Education
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.ed.gov"
              target="_blank"
              rel="noopener noreferrer"
            >
              US Department of Education
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.wested.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              WestEd
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.wgbh.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              WGBH
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://edu.wyoming.gov"
              target="_blank"
              rel="noopener noreferrer"
            >
              Wyoming Department of Education
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
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
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.bc.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              Boston College
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.cpp.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              California State Polytechnic University– Pomona
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.coloradocollege.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              Colorado College
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.colostate.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              Colorado State University
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.depaul.edu/Pages/default.aspx"
              target="_blank"
              rel="noopener noreferrer"
            >
              DePaul University
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.famu.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              Florida Agricultural and Mechanical University
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.gtri.gatech.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              Georgia Tech Research Institute
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.luc.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              Loyola University
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.miami.miamioh.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              Miami University
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://msu.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              Michigan State University
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            {/* <a
              href="http://www.montana.edu/"
              target="_blank"
              rel="noopener noreferrer"
            > */}
              Montana State University
              {/* &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup> */}
            {/* </a> */}
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.northwestern.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              Northwestern University
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.rice.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              Rice University
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.stanford.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              Stanford University
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.berkeley.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              University of California, Berkeley
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.ucdavis.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              University of California, Davis
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.uchicago.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              University of Chicago
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.colorado.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              University of Colorado, Boulder
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.uccs.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              University of Colorado, Colorado Springs
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.uga.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              University of Georgia
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.uhv.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              University of Houston – Victoria
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://louisville.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              University of Louisville (Kentucky)
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://twin-cities.umn.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              University of Minnesota Twin Cities
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://missouri.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              University of Missouri
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.unmc.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              University of Nebraska Medical Center
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.unm.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              University of New Mexico
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.unco.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              University of Northern Colorado
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.unt.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              University of North Texas
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
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
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.achievementfirst.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Achievement First (Connecticut, New York, and Rhode Island)
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://alpineschools.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Alpine School District (Utah)
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            {/* <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
            > */}
              Arvada West High School (Colorado)
              {/* &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup> */}
            {/* </a> */}
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.bvsd.org/Pages/default.aspx"
              target="_blank"
              rel="noopener noreferrer"
            >
              Boulder Valley School District (Colorado)
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://cps.edu/Pages/home.aspx"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chicago Public Schools (Illinois)
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.d11.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Colorado Springs School District 11 (Colorado)
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.dalton.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              The Dalton School (New York)
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.dpsk12.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Denver Public Schools (Colorado)
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.fcps.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              Fairfax County Public Schools (Virginia)
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.fa.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Friends Academy (New York)
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.gunnisonschools.net"
              target="_blank"
              rel="noopener noreferrer"
            >
              Gunnison Watershed School District (Colorado)
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.hsd2.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Harrison School District 2 (Colorado)
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.jeffcopublicschools.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Jefferson County Public Schools (Colorado)
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.jefferson.kyschools.us"
              target="_blank"
              rel="noopener noreferrer"
            >
              Jefferson County Public Schools (Kentucky)
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://d51schools.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mesa County Valley School District 51 (Colorado)
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            {/* <a
              href="http://mpls.k12.mn.us"
              target="_blank"
              rel="noopener noreferrer"
            > */}
              Minneapolis Public Schools (Minnesota)
              {/* &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup> */}
            {/* </a> */}
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.newberg.k12.or.us"
              target="_blank"
              rel="noopener noreferrer"
            >
              Newberg School District (Oregon)
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.hawaiipublicschools.org/ConnectWithUs/Organization/OfficesAndBranches/Pages/Leilehua-Mililani-Waialua.aspx"
              target="_blank"
              rel="noopener noreferrer"
            >
              Oʻahu Leilehua-Mililani-Waialua Complex (Hawaii)
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.owatonna.k12.mn.us"
              target="_blank"
              rel="noopener noreferrer"
            >
              Owatonna Public Schools (Minnesota)
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://proudtobe.pusd.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pomona Unified School District (California)
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.riverdale.edu/index.cfm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Riverdale Country School (New York)
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.spps.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Saint Paul Public Schools (Minnesota)
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.slcschools.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Salt Lake City School District (Utah)
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            {/* <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
            > */}
              San Francisco Unified School District (California)
              {/* &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup> */}
            {/* </a> */}
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.hartfordjt1.k12.wi.us"
              target="_blank"
              rel="noopener noreferrer"
            >
              School District of Hartford Joint No. 1 (Wisconsin)
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.seattleschools.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Seattle Public Schools (Washington)
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.tumwater.k12.wa.us"
              target="_blank"
              rel="noopener noreferrer"
            >
              Tumwater School District (Washington)
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
          <li style={{ marginBottom: '.25rem' }}>
            <a
              href="https://www.winonaschools.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Winona Area Public Schools (Minnesota)
              &nbsp;<sup><i style={{ fontSize: '.65rem' }} class="fas fa-external-link-alt"></i></sup>
            </a>
          </li>
        </ul>
      </>
    ,
	},
]
