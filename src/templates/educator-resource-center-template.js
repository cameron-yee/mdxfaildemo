import React, { Component } from 'react';
import { graphql } from 'gatsby';
import { Location } from '@reach/router'

import Layout from '../components/layout/layout';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import PageTitle from '../components/atoms/page-title';
import BSCSBreadcrumb from '../components/layout/breadcrumb/breadcrumb';

import './educator-resource-center-template.scss'
import '../global-scss/index.scss';

// export default ({ data, props }) => {
const EducatorResourceCenterTemplate = class extends Component {
  constructor(props) {
    super(props)
    this.html = this.props.data.markdownRemark.html
    this.resource = this.props.data.markdownRemark.frontmatter
  }
  // const paths = [["/educator-this.resource-center", "Educator Resource Center"], [`/${this.resource.slug}`, `${this.resource.title}`, "is-active"]];

  render() {
    return (
      <Layout location={this.props.location}>
        <Container>
          <BSCSBreadcrumb pathname={this.props.location.pathname} />
          <PageTitle title={this.resource.title} />
          <hr />
          <Row>
            {this.resource.template === 'Image Right' &&
              (<React.Fragment>
                <Col>
                  <div className="markdown-div" dangerouslySetInnerHTML={{ __html: this.html }}></div>
                  {this.resource.facilitator && (<p><strong>Facilitator: </strong>{this.resource.facilitator}</p>)}
                  {this.resource.price !== 0.0 && this.resource.price !== null && (<p><strong>Price: </strong>{`$${this.resource.price}`}</p>)}
                  {this.resource.price === 0.0 && this.resource.price !== null && (<p><strong>Price: </strong>Free</p>)}
                  <br />
                  {/* {this.resource.courseId !== null && this.resource.courseId !== 0 && <CanvasRegister courseId={this.resource.courseId} />} */}
                </Col>
                <Col>
                  <img style={{clipPath: "polygon(0 0, 0 100%, 100% 50%"}}src={this.resource.image} alt={this.resource.alt} />
                </Col>
              </React.Fragment>)
            }
            {this.resource.template === 'Image Left' &&
              (<React.Fragment>
                <Col>
                  <img style={{clipPath: "polygon(0 50%, 100% 100%, 100% 0"}}src={this.resource.image} alt={this.resource.alt} />
                </Col>
                <Col>
                  <div className="markdown-div" dangerouslySetInnerHTML={{ __html: this.html }}></div>
                  {this.resource.facilitator && (<p><strong>Facilitator: </strong>{this.resource.facilitator}</p>)}
                  {this.resource.price !== 0.0 && (<p><strong>Price: </strong>{`$${this.resource.price}`}</p>)}
                  {this.resource.price === 0.0 && (<p><strong>Price: </strong>Free</p>)}
                  <br />
                  {/* {this.resource.courseId !== null && this.resource.courseId !== 0 && <CanvasRegister courseId={this.resource.courseId} />} */}
                </Col>
              </React.Fragment>)
            }
            {this.resource.template === 'Image in content' &&
              (<React.Fragment>
              <Col>
                <div className="markdown-div" dangerouslySetInnerHTML={{ __html: this.html }}></div>
                {this.resource.facilitator && (<p><strong>Facilitator: </strong>{this.resource.facilitator}</p>)}
                {this.resource.price !== 0.0 && (<p><strong>Price: </strong>{`$${this.resource.price}`}</p>)}
                {this.resource.price === 0.0 && (<p><strong>Price: </strong>Free</p>)}
                <br />
                {/* {this.resource.courseId && <CanvasRegister courseId={this.resource.courseId} />} */}
              </Col>
              </React.Fragment>)
            }
          </Row>
        </Container>
      </Layout>
    )
  }
}

export default props => (
  <Location>
    {locationProps => <EducatorResourceCenterTemplate {...locationProps} {...props} />}
  </Location>
)

export const query = graphql`
  query($nodeId: String!) {
    markdownRemark(id: {eq: $nodeId}) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY"),
        additionalTags,
        alt,
        courseId,
        discipline,
        gradeLevel,
        image,
        price,
        programLength,
        facilitator,
        template,
        title,
        type
      }
    }
  }
`
