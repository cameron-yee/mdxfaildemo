import React, { Component } from 'react'
import { graphql, Link } from 'gatsby'
import SEO from '../../components/seo'
import { Location } from '@reach/router'

import Layout from '../../components/layout/layout'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import PageTitle from '../../components/layout/page-title/page-title'
import SearchBy from '../../components/atoms/search-by/search-by'
import FilterByDropdown from '../../components/molecules/filter-by/filter-by-dropdown/filter-by-dropdown'
import FilterByRow from '../../components/molecules/filter-by/filter-by-row/filter-by-row'
import ResourceCategories from '../../components/molecules/resource-categories/resource-categories'

import './educator-resource-center.scss'
import '../../global-scss/index.scss'

import ReactPlaceholder from 'react-placeholder'
import 'react-placeholder/lib/reactPlaceholder.css'


const EducatorResourceCenter = class extends Component {
  constructor(props) {
    super(props)
    this.resources = props.data.allMdx.edges
    // this.filter_items = ["Classroom", "Professional Learning","District Planning", "Citizen Science"]
    this.filter_items = {
      //Index 0 for if multiple values are allowed to be selected
      gradeLevel: ['Grade Level', true, ['Elementary', 'Middle', 'High', 'Postsecondary']],
      discipline: ['Discipline', true, ['Life Sciences', 'Physical Sciences', 'Earth Sciences', 'Multidisciplinary Sciences']],
      programLength: ['Program Length', false, ['Full Year', 'Modules']]
    }
    this.state = {
      // filterHash: undefined,
      activeFilters: [],
      imagesLoaded: false
    }
    this.images_loaded = 0
  }

  componentDidMount() {
    setTimeout(() => {
      if(this.state.imagesLoaded !== true) {
        this.setState({imagesLoaded: true})
      }
    },
    3000)

    const cards = document.getElementsByClassName('erc-card-img')
    for(let i = 0; i < cards.length; i++) {
      if(cards[i].complete && this.images_loaded !== cards.length) {
        this.loaded()
      }
    }

    if(this.props.location.hash) {
      this.setState({filterHash: this.props.location.hash})
    }
  }

  loaded = () => {
    const cards = document.getElementsByClassName('erc-card')
    if(this.images_loaded < cards.length) {
      this.images_loaded = this.images_loaded + 1
    } else {
      return
    }

    if(this.images_loaded === cards.length && this.state.imagesLoaded !== true) {
      this.setState({imagesLoaded: true})
    }
  }

  render() {
    return (
      <React.Fragment>
        <SEO
          title="BSCS offers resources for educators"
          description="Discover resources to support classroom instruction, professional learning, district planning, and citizen science."
          canonical="https://bscs.org/resources/educator-resource-center/"
        />
        <Layout location={this.props.location}>
          <section className="section">
            <Container>
              <PageTitle title="Educator Resource Center"></PageTitle>
              <Row>
                <Col xs={12}>
                  <p>Welcome to the Educator Resource Center — where you will discover resources to support classroom instruction, professional learning, district planning, and citizen science efforts.</p>
                </Col>
              </Row>
              <ResourceCategories
                // navigate={false}
                // filterHash={this.state.filterHash}
                // setFilterHash={(filter_hash) => {this.setState({filterHash: filter_hash})}}
                activeFilters={this.state.activeFilters}
                setActiveFilters={(activeFilters) => {this.setState({activeFilters: activeFilters})}}
              />
              <hr />
            </Container>
          </section>
          <section className="section" style={{ padding: '.75rem 1.5rem' }}>
            <Container>
              <div className="d-sm-flex">
                <div className="p-2">
                  <SearchBy />
                </div>
                <div className="p-2 ml-auto">
                  <FilterByDropdown
                    items={this.filter_items}
                    // filterHash={this.state.filterHash}
                    activeFilters={this.state.activeFilters}
                    setActiveFilters={(activeFilters) => this.setState({activeFilters: activeFilters})}
                  />
                </div>
              </div>
              {/* {this.state.activeFilters.length > 0 && */}
                <FilterByRow
                  activeFilters={this.state.activeFilters}
                  setActiveFilters={(activeFilters) => this.setState({activeFilters: activeFilters})}
                />
              {/* } */}
              <hr />
            </Container>
          </section>
          <section className="section">
            <Container>
              <Row>
                {
                  this.resources.map((edge, index) => {
                    let data_filter = JSON.parse(JSON.stringify(edge.node.frontmatter))
                    data_filter['excerpt'] = edge.node.excerpt
                    return(
                      <Col
                        md={6}
                        lg={4}
                        xl={3}
                        className="rrc-card-col"
                        key={`resource-${index}`}
                      >
                        {/* {!this.state.imagesLoaded &&
                          <ReactPlaceholder
                            type='rect'
                            ready={this.state.imagesLoaded}
                            color='#E0E0E0'
                            showLoadingAnimation={true}
                            style={{width: '349.984px', height: '653.078px', borderRadius: '4px'}}
                            // style={{width: '100%', height: '100%', borderRadius: '4px'}}
                          ><span>Worthless Children Prop</span></ReactPlaceholder>
                        } */}
                        <Card
                          id={`resource-${index}`}
                          data-filter={JSON.stringify(data_filter)}
                          // data-type={edge.node.frontmatter.type}
                          className={`h-100 erc-card ${edge.node.frontmatter.type.toLowerCase().replace(/ /g, '-')}`}
                          // style={{display: 'none'}}
                        >
                        <Card.Img
                          className="erc-card-img"
                          variant="top"
                          src={edge.node.frontmatter.image}
                          alt={edge.node.frontmatter.alt}
                          onLoad={this.loaded}
                          style={{display: 'none'}}
                        />
                        <ReactPlaceholder
                          type='rect'
                          ready={this.state.imagesLoaded}
                          // color='#E0E0E0'
                          color='rgb(205,205,205)'
                          showLoadingAnimation={true}
                          // style={{width: '349.984px', height: '653.078px', borderRadius: '4px'}}
                          style={{
                            width: '349.984px',
                            height: '260.98px',
                            borderTopLeftRadius: '4px',
                            borderTopRightRadius: '4px'

                          }}
                        >
                          <Card.Img
                            className="erc-card-img"
                            variant="top"
                            style={{
                                minHeight: '260.98px',
                                backgroundColor: 'rgba(205,205,205, .5)',
                                // backgroundColor: 'rgba(41, 52, 118, 1)',
                                // borderTopLeftRadius: '4px',
                                // borderTopRightRadius: '4px',
                            }}
                            src={edge.node.frontmatter.image}
                            alt={edge.node.frontmatter.alt}
                          />
                        </ReactPlaceholder>
                          <Card.Body>
                            <Card.Title
                              style={{
                                marginBottom: '1.5rem'
                              }}
                            >
                              {edge.node.frontmatter.title}
                            </Card.Title>
                            <Card.Text>
                              {edge.node.frontmatter.cardDescription}
                              {!edge.node.frontmatter.cardDescription && edge.node.excerpt}
                            </Card.Text>
                            {/* <p className="card-text">
                              {edge.node.frontmatter.cardDescription && !edge.node.frontmatter.cardDescriptionStyles &&
                                edge.node.frontmatter.cardDescription
                              }
                              {edge.node.frontmatter.cardDescription
                              && edge.node.frontmatter.cardDescriptionStyles
                              && edge.node.frontmatter.cardDescriptionStyles.length === 1
                              && edge.node.frontmatter.cardDescriptionStyles[0] === 'Italic' &&
                                <span style={{fontStyle: 'italic'}}>{edge.node.frontmatter.cardDescription}</span>
                              }
                              {edge.node.frontmatter.cardDescription
                              && edge.node.frontmatter.cardDescriptionStyles
                              && edge.node.frontmatter.cardDescriptionStyles.length === 1
                              && edge.node.frontmatter.cardDescriptionStyles[0] === 'Bold' &&
                                <span style={{fontWeight: 'bold'}}>{edge.node.frontmatter.cardDescription}</span>
                              }
                              {edge.node.frontmatter.cardDescription
                              && edge.node.frontmatter.cardDescriptionStyles
                              && edge.node.frontmatter.cardDescriptionStyles.length === 2 &&
                                <span style={{fontWeight: 'bold', fontStyle: 'italic'}}>{edge.node.frontmatter.cardDescription}</span>
                              }
                              {!edge.node.frontmatter.cardDescription && edge.node.excerpt}
                            </p> */}
                          </Card.Body>
                          <Card.Footer
                            style={{
                              background: 'white',
                              borderTop: 'none',
                              marginBottom: '.5rem',
                            }}
                          >
                            <div className="d-flex">
                              <div className="ml-auto align-self-end">
                                <Link
                                  to={`/resources/educator-resource-center/${edge.node.frontmatter.title.replace(/\s/g, '-').replace(/[^a-zA-Z0-9-]/g, '').toLowerCase()}`}
                                >
                                  <Button variant="outline-secondary" className={`${edge.node.frontmatter.type.toLowerCase().replace(/ /g, '-')}`}>
                                  {/* <Button variant="outline-secondary" className="purple"> */}
                                    Read More
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          </Card.Footer>
                        </Card>
                        {/* </ReactPlaceholder> */}
                      </Col>
                    )
                  })
                }
              </Row>
            </Container>
          </section>
        </Layout>
      </React.Fragment>
    )
  }
}

export default props => (
  <Location>
    {locationProps => <EducatorResourceCenter {...locationProps} {...props} />}
  </Location>
)

export const educatorResourceQuery = graphql`
  query educatorResourceQuery {
    allMdx(
      filter: {frontmatter: { page: {eq: "educator-resource-center"}}}
      sort: {
        fields: [frontmatter___sortOrder, frontmatter___title],
      }
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 200)
          frontmatter {
            additionalTags,
            alt,
            # courseId,
            cardDescription,
            # cardDescriptionStyles,
            date,
            discipline,
            gradeLevel,
            image,
            #price,
            programLength,
            sortOrder,
            title,
            type,
            page
          }
        }
      }
    }
  }
`
