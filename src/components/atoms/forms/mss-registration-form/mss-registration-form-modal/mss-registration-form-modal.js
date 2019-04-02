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

const MSSRegistrationFormModal = class extends Component {
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
      school: undefined,
      school_touched: false,
      street: undefined,
      street_touched: false,
      country: undefined,
      country_touched: false,
      city: undefined,
      city_touched: false,
      state: undefined,
      state_touched: false,
      zip: undefined,
      zip_touched: false,
      gradesTeaching: undefined,
      gradesTeaching_touched: false,
      howManyStudents: undefined,
      additionalComments: undefined,
      hearAboutOpportunity: undefined,
      registered: false,
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
    let input_elem = document.getElementById('mss-email-input');
    /[\w]+[@][\w]+[.][\w]+/.test(input_elem.value) === false ? this.setState({email: undefined}) : this.setState({email: input_elem.value})
  }

  blurEmail = (e) => {
    e.preventDefault()
    this.setState({email_touched: true})
  }

  setFirstName = (e) => {
    e.preventDefault()
    let input_elem = document.getElementById('mss-first-name-input');
    input_elem.value === '' ? this.setState({firstname: undefined}) : this.setState({firstname: input_elem.value})
  }

  blurFirstName = (e) => {
    e.preventDefault()
    this.setState({firstname_touched: true})
  }

  setLastName = (e) => {
    e.preventDefault()
    let input_elem = document.getElementById('mss-last-name-input');
    input_elem.value === '' ? this.setState({lastname: undefined}) : this.setState({lastname: input_elem.value})
  }

  blurLastName = (e) => {
    e.preventDefault()
    this.setState({lastname_touched: true})
  }

  setSchool = (e) => {
    e.preventDefault()
    let input_elem = document.getElementById('mss-school-input');
    this.setState({school: input_elem.value})
    input_elem.value === '' ? this.setState({school: undefined}) : this.setState({school: input_elem.value})
  }

  blurSchool = (e) => {
    e.preventDefault()
    this.setState({school_touched: true})
  }

  setStreet = (e) => {
    e.preventDefault()
    let input_elem = document.getElementById('mss-street-input');
    input_elem.value === '' ? this.setState({street: undefined}) : this.setState({street: input_elem.value})
  }

  blurStreet = (e) => {
    e.preventDefault()
    this.setState({street_touched: true})
  }

  setCity = (e) => {
    e.preventDefault()
    let input_elem = document.getElementById('mss-city-input');
    input_elem.value === '' ? this.setState({city: undefined}) : this.setState({city: input_elem.value})
  }

  blurCity = (e) => {
    e.preventDefault()
    this.setState({city_touched: true})
  }

  setContactState = (e) => {
    e.preventDefault()
    let input_elem = document.getElementById('mss-state-input');
    input_elem.value === '' ? this.setState({state: undefined}) : this.setState({state: input_elem.value})
  }

  blurContactState = (e) => {
    e.preventDefault()
    this.setState({state_touched: true})
  }

  setCountry = (e) => {
    e.preventDefault()
    let input_elem = document.getElementById('mss-country-input');
    input_elem.value === '' ? this.setState({country: undefined}) : this.setState({country: input_elem.value})
  }

  blurCountry = (e) => {
    e.preventDefault()
    this.setState({country_touched: true})
  }

  setZip = (e) => {
    e.preventDefault()
    let input_elem = document.getElementById('mss-zip-input');
    input_elem.value === '' ? this.setState({zip: undefined}) : this.setState({zip: input_elem.value})
  }

  blurZip = (e) => {
    e.preventDefault()
    this.setState({zip_touched: true})
  }

  setPhone = (e) => {
    e.preventDefault()
    let input_elem = document.getElementById('mss-phone-input');
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

  setGradesTeaching = (e) => {
    e.preventDefault()
    let input_elem = document.getElementById('mss-grades-teaching-input');
    input_elem.value === '' ? this.setState({gradesTeaching: undefined}) : this.setState({gradesTeaching: input_elem.value})
  }

  blurGradesTeaching = (e) => {
    e.preventDefault()
    this.setState({gradesTeaching_touched: true})
  }

  setHowManyStudents = (e) => {
    e.preventDefault()
    let input_elem = document.getElementById('mss-how-many-students-input');
    this.setState({howManyStudents: input_elem.value})
  }

  setAdditionalComments = (e) => {
    e.preventDefault()
    let input_elem = document.getElementById('mss-additional-comments-input');
    this.setState({additionalComments: input_elem.value})
  }

  setHearAboutOpportunity = (e) => {
    e.preventDefault()
    let input_elem = document.getElementById('mss-hear-about-opportunity-input');
    this.setState({hearAboutOpportunity: input_elem.value})
  }

  getPreviewOrUse = () => {
    let preview_or_use = document.querySelectorAll('input.custom-control-input.p-or-u:checked')[0].nextSibling.textContent
    return preview_or_use
  }

  getComputers = () => {
    let computers = document.querySelectorAll('input.custom-control-input[id$="computers"]:checked')[0].nextSibling.textContent
    return computers
  }

  controlComputers = (e) => {
    e.preventDefault()
    const elem = document.getElementById(e.target.id)
    let computers = document.querySelectorAll('input.custom-control-input[id$="computers"]:checked')
    for(let i = 0; i < computers.length; i++) {
      if(computers[i] != elem) {
        computers[i].removeAttribute('checked')
      } else {
        console.log(elem)
        computers[i].setAttribute('checked', true)
      }
    }

  }

  postMSSRegistrationForm = async (e) => {
    e.preventDefault()
    this.setState({loading: true})

    let data = {
      "email": this.state.email,
      "firstname": this.state.firstname,
      "lastname": this.state.lastname,
      "phone": this.state.phone,
      "school": this.state.school,
      "street": this.state.street,
      "city": this.state.city,
      "state": this.state.state,
      "country": this.state.country,
      "previewOrUse": await this.getPreviewOrUse(),
      "computers": await this.getComputers(),
      "gradesTeaching": this.state.gradesTeaching,
      "additionalComments": this.state.additionalComments,
      "hearAboutOpportunity": this.state.hearAboutOpportunity,
      "sendto": this.props.sendto
    }

    if(this.props.infoat) {
      data["infoat"] = this.props.infoat === "true"
    }

    console.log(data)
    axios({
      // url: 'http://127.0.0.1:8888/post-specific-form',
      url: 'https://pymail.bscs.org/post-mss-registration-form',
      method: 'post',
      data: data,
      cancelToken: this.cancelToken.token
    })
    .then(response => {
      console.log(response);
      if(response.status === 200) {
          this.setState({notificationShow: true, loading: false, sent: true});
      }
    })
    .catch(error => {
      if(axios.isCancel(error)) {
        console.log(`Request canceled: ${error}`);
      } else {
        console.log(error);
      }
    })
  }

  render() {
    return (
      <Modal
      {...this.props}
      size="lg"
      aria-labelledby="mss-registration-modal"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="mss-registration-modal">
          Register for BSCS Middle School Science
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={(e) => this.postMSSRegistrationForm(e)}>
        <Modal.Body>
          <Alert show={this.state.notificationShow} onClose={this.hideNotification} dismissible variant="success">
            Thank you for registering for BSCS Middle School Science.  You should receive an email within 1 week with your login information and additional course information.
          </Alert>
          <Row>
            <Col xs={12}>
              <Form.Group>
                <Form.Label>First Name<span style={{color: 'red'}}>*</span></Form.Label>
                <Form.Control
                  id="mss-first-name-input"
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
            <Col xs={12}>
              <Form.Group>
                <Form.Label>Last Name<span style={{color: 'red'}}>*</span></Form.Label>
                <Form.Control
                  id="mss-last-name-input"
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
                <Form.Label>Email<span style={{color: 'red'}}>*</span></Form.Label>
                <Form.Control
                  id="mss-email-input"
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
            <Col xs={6}>
              <Form.Group>
                <Form.Label>School<span style={{color: 'red'}}>*</span></Form.Label>
                <Form.Control
                  id="mss-school-input"
                  type="text"
                  size="sm"
                  maxLength="50"
                  placeholder=""
                  onKeyUp={this.setSchool}
                  onBlur={this.blurSchool}
                  isInvalid={this.state.school_touched && (!this.state.school || this.state.school === '')}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a school.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={6}>
              <Form.Group>
                <Form.Label>Street<span style={{color: 'red'}}>*</span></Form.Label>
                <Form.Control
                  id="mss-street-input"
                  type="text"
                  size="sm"
                  maxLength="50"
                  placeholder=""
                  onKeyUp={this.setStreet}
                  isInvalid={this.state.street_touched && (!this.state.street || this.state.street === '')}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a street.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={6}>
              <Form.Group>
                <Form.Label>City<span style={{color: 'red'}}>*</span></Form.Label>
                <Form.Control
                  id="mss-city-input"
                  type="text"
                  size="sm"
                  maxLength="50"
                  placeholder=""
                  onKeyUp={this.setCity}
                  isInvalid={this.state.city_touched && (!this.state.city || this.state.city === '')}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a city.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={6}>
              <Form.Group>
                <Form.Label>State<span style={{color: 'red'}}>*</span></Form.Label>
                <Form.Control
                  id="mss-state-input"
                  type="text"
                  size="sm"
                  maxLength="50"
                  placeholder=""
                  onKeyUp={this.setContactState}
                  isInvalid={this.state.state_touched && (!this.state.state || this.state.state === '')}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a state.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={6}>
              <Form.Group>
                <Form.Label>Zip<span style={{color: 'red'}}>*</span></Form.Label>
                <Form.Control
                  id="mss-zip-input"
                  type="text"
                  size="sm"
                  maxLength="10"
                  placeholder=""
                  onKeyUp={this.setZip}
                  isInvalid={this.state.zip_touched && (!this.state.zip || this.state.zip === '')}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a ZIP code.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={6}>
              <Form.Group>
                <Form.Label>Country<span style={{color: 'red'}}>*</span></Form.Label>
                <Form.Control
                  id="mss-country-input"
                  type="text"
                  size="sm"
                  maxLength="50"
                  placeholder=""
                  onKeyUp={this.setCountry}
                  isInvalid={this.state.country_touched && (!this.state.country || this.state.country === '')}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a ZIP code.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12}>
              <Form.Group>
                <Form.Label>Phone number</Form.Label>
                <Form.Control
                  id="mss-phone-input"
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
              <Form.Label>I would like access to the curriculum to<span style={{color: 'red'}}>*</span></Form.Label>
            </Col>
            <Col xs={6}>
              <Form.Group>
                <Form.Check custom type="radio" className="p-or-u" id="like-to-preview" label="Preview" defaultChecked />
                <Form.Check custom type="radio" className="p-or-u" id="like-to-use" label="Use" />
              </Form.Group>
            </Col>
            <Col xs={12}>
              <Form.Label>What grade(s) will you be teaching for the 2014-15 school year? (If not a teacher, type "None")<span style={{color: 'red'}}>*</span></Form.Label>
              <Form.Group>
                <Form.Control
                  id="mss-grades-teaching-input"
                  type="text"
                  size="sm"
                  maxLength="100"
                  placeholder=""
                  onKeyUp={this.setGradesUsing}
                  onBlur={this.blurPhone}
                  isInvalid={this.state.gradesTeaching_touched && (!this.state.gradesTeaching || this.state.gradesTeaching === '')}
                />
                <Form.Control.Feedback type="invalid">
                  Please tell us what grades you are teaching.  Enter "None" if you are not a teacher.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12}>
              <Form.Label>How many students are/will be in your class? (If teaching)</Form.Label>
              <Form.Group>
                <Form.Control
                  id="mss-how-many-students-input"
                  type="number"
                  step="1"
                  size="sm"
                  placeholder=""
                />
              </Form.Group>
            </Col>
            <Col xs={6}>
              <Form.Label>Classroom Computers<span style={{color: 'red'}}>*</span></Form.Label>
              <Form.Group>
                <Form.Check custom type="radio" id="mss-one-projector-computers" className="computers" label="My classroom has one computer that I can project." defaultChecked onClick={(e) => this.controlComputers(e)} />
                <Form.Check custom type="radio" id="mss-multiple-computers" className="computers" label="My classroom has multiple computers for students to use in groups." onClick={(e) => this.controlComputers(e)} />
                <Form.Check custom type="radio" id="mss-one-per-student-computers" className="computers" label="My classroom has one computer for each student to use." onClick={(e) => this.controlComputers(e)} />
                <Form.Check custom type="radio" id="mss-tablets-computers" className="computers" label="My classroom has tablets for students to use. " onClick={(e) => this.controlComputers(e)} />
                <Form.Check custom type="radio" id="mss-not-a-teacher-computers" className="computers" label="I am not a classroom teacher." onClick={(e) => this.controlComputers(e)} />
              </Form.Group>
            </Col>
            <Col xs={12}>
              <Form.Label>Additional Comments</Form.Label>
              <Form.Group>
                <Form.Control
                  as="textarea"
                  id="mss-additional-comments-input"
                  type="text"
                  size="sm"
                  maxLength="300"
                  placeholder=""
                  onKeyUp={this.setAdditionalComments}
                />
              </Form.Group>
            </Col>
            <Col xs={12}>
              <Form.Label>How did you hear about this opportunity?</Form.Label>
              <Form.Group>
                <Form.Control
                  id="mss-hear-about-opportunity-input"
                  type="text"
                  size="sm"
                  maxLength="300"
                  placeholder=""
                  onKeyUp={this.setHearAboutOpportunity}
                />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          { !this.state.loading && this.state.registered &&
            <Button variant="outline-success" disabled>Registered</Button>
          }
          {/* { !this.state.registered && (!this.state.firstname || !this.state.lastname || !this.state.email) && */}
          { !this.state.registered && !this.state.loading && (!this.state.registered || !this.state.firstname || !this.state.lastname || !this.state.email || !this.state.school || !this.state.street || !this.state.state || !this.state.zip || !this.state.country || !this.state.gradesUsing || !this.state.classroomComputers) &&
            <Button variant="outline-primary" disabled>Register</Button>
          }
          { !this.state.registered && !this.state.loading && !this.state.registered && this.state.firstname && this.state.lastname && this.state.email && this.state.school && this.state.street && this.state.state && this.state.zip && this.state.country && this.state.gradesUsing && this.state.classroomComputers &&
            <Button variant="outline-primary" type="submit">Register</Button>
          }
          { this.state.loading &&
            <Button variant="outline-success" disabled>
              <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
              Register
            </Button>
          }
        </Modal.Footer>
      </Form>
    </Modal>
    )
  }
}

export default MSSRegistrationFormModal
