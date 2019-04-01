import React, { Component } from 'react'

import axios from 'axios'
import * as BlueBirdPromise from 'bluebird'

import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'

BlueBirdPromise.config({
  cancellation: true,
});

const JoinEmailFormModal = class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: undefined,
      email_touched: false,
      firstname: undefined,
      firstname_touched: false,
      lastname: undefined,
      lastname_touched: false,
      phone: undefined,
      phone_touched: false,
      schoolOrOrganization: undefined,
      title: undefined,
      street: undefined,
      city: undefined,
      state: undefined,
      zip: undefined,
      scienceEducationInterest: [],
      level: [],
      currentlyUsing: undefined,
      topicsOfInterest: undefined,
      signed_up: false,
      loading: false,
      notificationShow: false
    }

    this.cancelToken = axios.CancelToken.source()
    this.getContactId = undefined

    this.token = process.env.CONSTANT_CONTACT_TOKEN //import from .env (define in Netlify dashboard) }
    this.api_key = process.env.CONSTANT_CONTACT_API_KEY
  }

  componentWillUnmount() {
    try {
      this.cancelToken.cancel()
      if(this.getContactId) {
        this.getContactId.cancel()
      }
    } catch(error) {
      console.log(error);
    }
  }

  showNotification = () => {
    this.setState({notificationShow: true})
  }

  hideNotification = () => {
    this.setState({notificationShow: false})
  }

  setEmail = (e) => {
    e.preventDefault()
    let input_elem = document.getElementById('email-list-input');
    /[\w]+[@][\w]+[.][\w]+/.test(input_elem.value) === false ? this.setState({email: undefined}) : this.setState({email: input_elem.value})
  }

  blurEmail = (e) => {
    e.preventDefault()
    this.setState({email_touched: true})
  }

  setFirstName = (e) => {
    e.preventDefault()
    let input_elem = document.getElementById('first-name-input');
    input_elem.value === '' ? this.setState({firstname: undefined}) : this.setState({firstname: input_elem.value})
  }

  blurFirstName = (e) => {
    e.preventDefault()
    this.setState({firstname_touched: true})
  }

  setLastName = (e) => {
    e.preventDefault()
    let input_elem = document.getElementById('last-name-input');
    input_elem.value === '' ? this.setState({lastname: undefined}) : this.setState({lastname: input_elem.value})
  }

  blurLastName = (e) => {
    e.preventDefault()
    this.setState({lastname_touched: true})
  }

  setSchoolOrOrganization = (e) => {
    e.preventDefault()
    let input_elem = document.getElementById('school-or-organization-input');
    this.setState({schoolOrOrganization: input_elem.value})
  }

  setTitle = (e) => {
    e.preventDefault()
    let input_elem = document.getElementById('title-input');
    this.setState({title: input_elem.value})
  }

  setStreet = (e) => {
    e.preventDefault()
    let input_elem = document.getElementById('street-input');
    this.setState({street: input_elem.value})
  }

  setCity = (e) => {
    e.preventDefault()
    let input_elem = document.getElementById('city-input');
    this.setState({city: input_elem.value})
  }

  setContactState = (e) => {
    e.preventDefault()
    let input_elem = document.getElementById('state-input');
    this.setState({state: input_elem.value})
  }

  setZip = (e) => {
    e.preventDefault()
    let input_elem = document.getElementById('zip-input');
    this.setState({zip: input_elem.value})
  }

  setPhone = (e) => {
    e.preventDefault()
    let input_elem = document.getElementById('sc-phone-input');
    (((/[A-Za-z~!#@$%^&*{}|?<>`=\s]+/.test(input_elem.value) === true) //None of these characters are in the phone #
    ||
    (/\d{2,}/.test(input_elem.value) === false) //There are at least 2 digits in a row at some point
    ||
    // eslint-disable-next-line
    (/^[^-][\d\(\)\-\+]{7,}[^-+]$/.test(input_elem.value) === false)) //The input is at least 7 characters long. Can't start with '-', can't end with '-' or '+'
    &&
    (input_elem.value !== (undefined || ''))) //Phone # may be omitted
    ?
    this.setState({phone: 'errors'})
    :
    this.setState({phone: input_elem.value})
  }

  blurPhone = (e) => {
    e.preventDefault()
    this.setState({phone_touched: true})
  }

  setCurrentlyUsing = (e) => {
    e.preventDefault()
    let input_elem = document.getElementById('currently-using-input');
    this.setState({currentlyUsing: input_elem.value})
  }

  setTopicsOfInterest = (e) => {
    e.preventDefault()
    let input_elem = document.getElementById('topics-of-interest-input');
    this.setState({topicsOfInterest: input_elem.value})
  }

  getCheckboxValues = () => {
    let tags = []
    let checkedBoxes = document.querySelectorAll('input.custom-control-input:checked')
    for(let i = 0; i < checkedBoxes.length; i++) {
      tags.push(checkedBoxes[i].nextSibling.textContent)
    }

    return tags
  }

  checkIfContactExists = (e) => {
    e.preventDefault()

    // let submit_button = document.getElementById('submit-button')
    // submit_button.classList.add('is-loading')
    this.setState({ loading: true })

    let data = {"email": this.state.email}

    axios({
      // url: 'http://127.0.0.1:8888/check-if-contact-exists',
      url: 'https://pymail.bscs.org/check-if-contact-exists',
      method: 'post',
      data: data,
      cancelToken: this.cancelToken.token
    })
    .then(response => {
      this.getContactId = new BlueBirdPromise((resolve, reject, onCancel) => {
        //eslint-disable-next-line
        onCancel(() => {throw "Promise canceled."})
        if(!Array.isArray(response.data.data.results) || !response.data.data.results.length) {
          this.createContact()
          resolve(0)
        } else {
          if(!Array.isArray(response.data.data.results[0].lists) || !response.data.data.results[0].lists.length) {
            resolve(response.data.data.results[0].id)
          } else {
            for(let i = 0; i < response.data.data.results[0].lists.length; i++) {
              if(response.data.data.results[0].lists[i].id === '1613300557') { //Constant Contact email list id number
                // alert('You are already registered on the email list')
                this.showNotification()
                resolve(0)
              } else if(response.data.data.results[0].lists.length - 1 === i) {
                  //Contact exists, but is not in eCommunity; Only resolving after every list has been checked
                  resolve(response.data.data.results[0].id)
              }
            }
          }
        }
      })

      return this.getContactId
        .catch(error => {
          console.log(error)
        })
    })
    .then(contact_id => {
      if(contact_id !== 0) {
        this.addContactToEmailList(contact_id)
      } else {
          this.setState({signed_up: true, loading: false});
      }
    })
    .catch(error => {
      axios.isCancel(error) ? console.log(`Request canceled: ${error}`) : console.log(error)
    })
  }

  createContact = () => {
    let data = {"email": this.state.email, "firstname": this.state.firstname, "lastname": this.state.lastname}

    axios({
      //Also enrolls them in eCommunity upon contact creation
      // url: 'http://127.0.0.1:8888/create-contact',
      url: 'https://pymail.bscs.org/create-contact',
      method: 'post',
      data: data,
      cancelToken: this.cancelToken.token
    })
    .then(response => {
      console.log(response);
      if(response.status === 200) {
        this.setState({signed_up: true, loading: false});
      }
    })
    .catch(error => {
      axios.isCancel(error) ? console.log(`Request canceled: ${error}`) : console.log(error)
    })
  }

  addContactToEmailList = async (contact_id) => {
    let data = {
      "email": this.state.email,
      "first_name": this.state.firstname,
      "last_name": this.state.lastname,
      "contact_id": contact_id,
      "cell_phone": this.state.phone,
      "company_name": this.state.schoolOrOrganization,
      "addresses": [{
        "address_type": "BUSINESS",
        "line1": this.state.street,
        "city": this.state.city,
        "state": this.state.state,
        "postal_code": this.state.zip
      }],
      "job_title": this.state.title,
      "source": "BSCS main website join email form",
      "tags": await this.getCheckboxValues(),
      "currentlyUsing": this.state.currentlyUsing,
      "topicsOfInterest": this.state.topicsOfInterest
    }

    axios({
      // url: 'http://127.0.0.1:8888/add-contact-to-email-list',
      url: 'https://pymail.bscs.org/add-contact-to-email-list',
      method: 'post',
      data: data,
      cancelToken: this.cancelToken.token
    })
    .then(response => {
      if(response.status === 200) {
        this.setState({signed_up: true, loading: false});
      }
    })
    .catch(error => {
      axios.isCancel(error) ? console.log(`Request canceled: ${error}`) : console.log(error)
    })
  }

  render() {
    return (
      <Modal
      {...this.props}
      size="lg"
      aria-labelledby="join-email-modal"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="join-email-modal">
          Join E-mail List
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={(e) => this.checkIfContactExists(e)}>
        <Modal.Body>
          <Alert show={this.state.notificationShow} onClose={this.hideNotification} dismissible variant="success">
            You are already enrolled in the email list.
          </Alert>
          <Row>
            <Col xs={12}>
              <p>Be the first to know about BSCS's upcoming professional learning programs, field-test opportunities, project news, and more!</p>
            </Col>
            <Col xs={12}>
              <Form.Group>
                <Form.Label><span style={{color: 'red'}}>*</span> First Name</Form.Label>
                <Form.Control
                  id="first-name-input"
                  size="sm"
                  type="text"
                  placeholder=""
                  maxLength="50"
                  onKeyUp={this.setFirstName}
                  onBlur={this.blurFirstName}
                  isInvalid={this.state.firstname_touched && (!this.state.firstname || this.state.firstname === '')}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a first name.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group>
                <Form.Label><span style={{color: 'red'}}>*</span> Last Name</Form.Label>
                <Form.Control
                  id="last-name-input"
                  type="text"
                  size="sm"
                  placeholder=""
                  maxLength="50"
                  onKeyUp={this.setLastName}
                  onBlur={this.blurLastName}
                  isInvalid={this.state.lastname_touched && (!this.state.lastname || this.state.lastname === '')}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a last name.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12}>
              <Form.Group>
                <Form.Label><span style={{color: 'red'}}>*</span> Email</Form.Label>
                <Form.Control
                  id="email-list-input"
                  type="email"
                  size="sm"
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
              <hr />
              <h4 className="mb-4" style={{fontWeight: '300'}}><strong>Optional Fields</strong></h4>
            </Col>
            <Col xs={6}>
              <Form.Group>
                <Form.Label>School/Organization</Form.Label>
                <Form.Control
                  id="school-or-organization-input"
                  type="text"
                  size="sm"
                  maxLength="50"
                  placeholder=""
                  onKeyUp={this.setSchoolOrOrganization}
                />
              </Form.Group>
            </Col>
            <Col xs={6}>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  id="title-input"
                  type="text"
                  size="sm"
                  maxLength="50"
                  placeholder=""
                  onKeyUp={this.setTitle}
                />
              </Form.Group>
            </Col>
            <Col xs={6}>
              <Form.Group>
                <Form.Label>Street</Form.Label>
                <Form.Control
                  id="street-input"
                  type="text"
                  size="sm"
                  maxLength="50"
                  placeholder=""
                  onKeyUp={this.setStreet}
                />
              </Form.Group>
            </Col>
            <Col xs={6}>
              <Form.Group>
                <Form.Label>City</Form.Label>
                <Form.Control
                  id="city-input"
                  type="text"
                  size="sm"
                  maxLength="50"
                  placeholder=""
                  onKeyUp={this.setCity}
                />
              </Form.Group>
            </Col>
            <Col xs={6}>
              <Form.Group>
                <Form.Label>State</Form.Label>
                <Form.Control
                  id="state-input"
                  type="text"
                  size="sm"
                  maxLength="50"
                  placeholder=""
                  onKeyUp={this.setContactState}
                />
              </Form.Group>
            </Col>
            <Col xs={6}>
              <Form.Group>
                <Form.Label>Zip</Form.Label>
                <Form.Control
                  id="zip-input"
                  type="text"
                  size="sm"
                  maxLength="10"
                  placeholder=""
                  onKeyUp={this.setZip}
                />
              </Form.Group>
            </Col>
            <Col xs={12}>
              <Form.Group>
                <Form.Label>Phone number</Form.Label>
                <Form.Control
                  id="sc-phone-input"
                  type="text"
                  size="sm"
                  placeholder=""
                  maxLength="20"
                  onKeyUp={this.setPhone}
                  onBlur={this.blurPhone}
                  isInvalid={this.state.phone_touched && this.state.phone === 'errors'}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid phone number.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12}>
              <Form.Label>Science Education interest (select all that apply):</Form.Label>
            </Col>
            <Col xs={6}>
              <Form.Group>
                <Form.Check custom type="checkbox" id="biology-interest" label="Biology" />
                <Form.Check custom type="checkbox" id="physics-interest" label="Physics" />
                <Form.Check custom type="checkbox" id="health-interest" label="Health" />
                <Form.Check custom type="checkbox" id="earth-science-interest" label="Earth Science" />
              </Form.Group>
            </Col>
            <Col xs={6}>
              <Form.Group>
                <Form.Check custom type="checkbox" id="tpl-interest" label="Teacher Professional Learning" />
                <Form.Check custom type="checkbox" id="chemistry-interest" label="Chemistry" />
                <Form.Check custom type="checkbox" id="methods-interest" label="Methods (University Level)" />
                <Form.Check custom type="checkbox" id="integrated-science-interest" label="Integrated Science" />
              </Form.Group>
            </Col>
            <Col xs={12}>
              <Form.Label>Level:</Form.Label>
            </Col>
            <Col xs={6}>
              <Form.Group>
                <Form.Check custom type="checkbox" id="elementary-level" label="Elementary" />
                <Form.Check custom type="checkbox" id="middle-junior-high-level" label="Middle / Junior High" />
                <Form.Check custom type="checkbox" id="high-school-level" label="High School" />
              </Form.Group>
            </Col>
            <Col xs={6}>
              <Form.Group>
                <Form.Check custom type="checkbox" id="college-university-level" label="College / University" />
                <Form.Check custom type="checkbox" id="other-level" label="Other" />
              </Form.Group>
            </Col>
            <Col xs={12}>
              <Form.Label>List any BSCS Programs you're currently using (max 300 chars):</Form.Label>
              <Form.Group>
                <Form.Control
                  as="textarea"
                  id="currently-using-input"
                  type="text"
                  size="sm"
                  maxLength="300"
                  placeholder=""
                  onKeyUp={this.setCurrentlyUsing}
                />
              </Form.Group>
            </Col>
            <Col xs={12}>
              <Form.Label>Topics of Interest (max 300 chars):</Form.Label>
              <Form.Group>
                <Form.Control
                  as="textarea"
                  id="topics-of-interest-input"
                  type="text"
                  size="sm"
                  maxLength="300"
                  placeholder=""
                  onKeyUp={this.setTopicsOfInterest}
                />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          { !this.state.loading && this.state.signed_up &&
            <Button variant="outline-success" disabled>Signed up</Button>
          }
          { !this.state.signed_up && (!this.state.firstname || !this.state.lastname || !this.state.email) &&
            <Button variant="outline-primary" disabled>Sign up</Button>
          }
          { !this.state.signed_up && !this.state.loading && !this.state.signed_up && this.state.firstname && this.state.lastname && this.state.email &&
            <Button variant="outline-primary" type="submit">Sign up</Button>
          }
          { this.state.loading &&
            <Button variant="outline-success" disabled>
              <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
              Sign up
            </Button>
          }
        </Modal.Footer>
      </Form>
    </Modal>
    )
  }
}

export default JoinEmailFormModal
