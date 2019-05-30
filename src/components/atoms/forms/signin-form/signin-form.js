import React, { Component } from 'react'
import { Link } from 'gatsby'

import axios from 'axios'

import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'

import signin from '../../../../queries/bscsapi/signin'

/* SigninForm functions
  *
  * constructor(props) {...}
  * componentDidMount() {...}
  * componentWillUnmount() {...}
  * showNotification = () => {...}
  * hideNotification = () => {...}
  * showErrorNotification = () => {...}
  * hideErrorNotification = () => {...}
  * setEmail = (e) => {...}
  * blurEmail = (e) => {...}
  * setPassword = (e) => {...}
  * handleSignin = (e) => {...}
  * render() {...}
  *
*/

const SigninForm = class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: undefined,
      email_touched: false,
      password: undefined,
      password_touched: undefined,

      loading: false,
      notificationShow: false,
      on_dashboard: false,
      submitted: false,
      showErrorNotification: false,
      errors: false
    }

    this.cancelToken = axios.CancelToken.source()
  }

  componentDidMount() {
    try {
      if(window.location.pathname === '/dashboard') {
        this.setState({on_dashboard: true})
      }
    } catch(error) {
      console.log(error)
    }
  }

  componentWillUnmount() {
    try {
      this.cancelToken.cancel()
    } catch(error) {
      console.log(error)
    }
  }

  showNotification = () => {
    this.setState({notificationShow: true})
  }

  hideNotification = () => {
    this.setState({notificationShow: false})
  }

  showErrorNotification = () => {
    this.setState({showErrorNotification: true})
  }

  hideErrorNotification = () => {
    this.setState({showErrorNotification: false})
  }

  setEmail = (e) => {
    e.preventDefault()
    let input_elem = document.getElementById('login-email-input');
    /[\w]+[@][\w]+[.][\w]+/.test(input_elem.value) === false ? this.setState({email: undefined}) : this.setState({email: input_elem.value})
  }

  blurEmail = (e) => {
    e.preventDefault()
    this.setState({email_touched: true})
  }

  setPassword = (e) => {
    e.preventDefault()
    let input_elem = document.getElementById('login-password-input');
    input_elem.value === '' ? this.setState({password: undefined}) : this.setState({password: input_elem.value})
  }

  handleSignin = (e) => {
    e.preventDefault()
    this.setState({loading: true})

    signin(this.cancelToken, this.state.email, this.state.password)
      .then(response => {
        console.log(response);
        if (response.status === 200 && !response.data.errors) {
            this.setState({notificationShow: true, loading: false, submitted: true, showErrorNotification: false});
            this.props.setSignedIn()
        } else if (response.status === 200 && response.data.errors) {
            this.setState({errors: false, loading: false, showErrorNotification: true});
        }
      })
      .catch(error => {
        if(axios.isCancel(error)) {
          console.log(`Request canceled: ${error}`);
          this.setState({errors: true, loading: false, showErrorNotification: true});
        } else {
          console.log(error);
          this.setState({errors: true, loading: false, showErrorNotification: true});
        }
      })
  }

  render() {
    return (
      <React.Fragment>
        <Form>
          <Row>
            <Col xs={12}>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  className="form-control"
                  id="login-email-input"
                  type="email"
                  placeholder=""
                  onKeyUp={this.setEmail}
                  onBlur={this.blurEmail}
                  isInvalid={this.state.email_touched && (!this.state.email || this.state.email === '')}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid email address.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12}>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  className="form-control"
                  id="login-password-input"
                  type="password"
                  placeholder=""
                  maxLength="50"
                  onKeyUp={this.setPassword}
                  onBlur={this.blurPassword}
                  isInvalid={this.state.password_touched && (!this.state.password || this.state.password === '')}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a password.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
        </Form>
        <Container>
          <Row>
            <Col xs={12}>
              <Alert show={this.state.notificationShow} onClose={this.hideNotification} dismissible variant="success">
                Signed in!
              </Alert>
              <Alert show={this.state.showErrorNotification} onClose={this.hideErrorNotification} dismissible variant="danger">
                No user account found with email/password.
              </Alert>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <div className="d-flex justify-content-end">
                { !this.state.errors && !this.state.loading && !this.state.submitted
                  && (!this.state.email
                  || !this.state.password)
                  &&
                  <div className="d-flex">
                    <Button className="m-2" variant="outline-primary" disabled>Sign In</Button>
                    {/* For non-modal signin or register */}
                    {this.props.register &&
                      <Button className="m-2" variant="outline-primary" onClick={() => this.props.register(true)}>Register</Button>
                    }
                  </div>
                }
                { !this.state.errors && !this.state.loading && !this.state.submitted
                  && this.state.email
                  && this.state.password
                  &&
                  <div className="d-flex p-2">
                    <Button className="m-2" variant="outline-primary" onClick={(e) => this.handleSignin(e)}>Sign In</Button>
                    {/* For non-modal signin or register */}
                    {this.props.register &&
                      <Button className="m-2" variant="outline-primary" onClick={() => this.props.register(true)}>Register</Button>
                    }
                  </div>
                }
                { !this.state.errors && this.state.loading &&
                  <Button className="m-2" variant="outline-success" disabled>
                    <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                    Signing in...
                  </Button>
                }
                { !this.state.errors && !this.state.loading && this.state.submitted &&
                  <React.Fragment>
                    {!this.state.on_dashboard &&
                      <Link to="/dashboard" className="m-2"><Button variant="outline-primary">Go to Dashboard</Button></Link>
                    }
                    <Button className="m-2" variant="outline-success" disabled>Signed In</Button>
                  </React.Fragment>
                }
                { this.state.errors &&
                  <Button className="m-2" variant="outline-danger" disabled>Error</Button>
                }
              </div>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    )
  }
}

export default SigninForm
