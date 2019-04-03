import React from 'react'
import { Location } from '@reach/router'

import BSCSBreadcrumb from '../breadcrumb/breadcrumb'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const PageTitle = class extends React.Component {

  render() {
    return(
      <React.Fragment>
        <BSCSBreadcrumb
          pathname={this.props.location.pathname}
          title={this.props.title}
          replace={this.props.replace}
        />
        <Row>
          <Col>
            { this.props.titleLogo &&
              <div className="d-flex flex-row bd-highlight mb-3">
                <div className="p-2 bd-highlight">
                  <img
                    src={this.props.titleLogo}
                    alt={this.props.titleLogoAlt}
                    style={{
                      width: "120px",
                      minWidth: "90px"
                    }}
                    className="img-fluid"
                  />
                </div>
                <div className="p-2 bd-highlight">
                  <h1 className="jumbotron-heading" style={{ color: '#212529' }}>
                    <h1 style={{ marginTop: '.5rem' }}>{this.props.title}</h1>
                  </h1>
                </div>
              </div>
            }
            {!this.props.titleLogo &&
              <h1 style={{ marginTop: '.5rem' }}>{this.props.title}</h1>
            }
            <p><em>{this.props.date}</em></p>
            <hr style={{ marginBottom: '2.5rem' }} />
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
