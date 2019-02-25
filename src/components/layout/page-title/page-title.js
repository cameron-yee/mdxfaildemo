import React from 'react'
import { Location } from '@reach/router'

import BSCSBreadcrumb from '../breadcrumb/breadcrumb'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const PageTitle = class extends React.Component {

  render() {
    return(
      <React.Fragment>
        <BSCSBreadcrumb pathname={this.props.location.pathname} title={this.props.title} replace={this.props.replace} />
        <Row>
          <Col>
            <h1>{this.props.title}</h1>
            <hr />
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

export default props => (
  <Location>
    {locationProps => <PageTitle {...locationProps} {...props} />}
  </Location>
)