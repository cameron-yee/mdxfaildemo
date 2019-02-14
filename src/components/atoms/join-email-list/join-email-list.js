import axios from 'axios'
import React, { Component } from 'react'

import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import JoinModal from './join-modal/join-modal'

// ---------------------------------------------------------------------------------------------------------


// Promise.config({
//   cancellation: true,
// });



const JoinEmailList = class extends Component {
  constructor(props) {
    super(props)

    this.state = {
      modalShow: false,
    }

    this.launch = this.launch.bind(this)
    this.close = this.close.bind(this)
  }

  launch = () => { this.setState({modalShow: true}) }
  close = () => { this.setState({modalShow: false}) }

  render() {
    return (
      <ButtonToolbar>
        <Button id="submit-button" variant="outline-primary" onClick={this.launch}>Join Email List</Button>
        <JoinModal show={this.state.modalShow} onHide={this.close} />
      </ButtonToolbar>
    )
  }
}

export default JoinEmailList

// const launch = (id) => {
//   let elem = document.getElementById(id);
//   elem.classList.add('is-active');
// }

// const ConnectStyled = styled.div`
//     .touch-link {
//       color: rgba(48, 135, 180, 1) !important;
//       transition: 0.25s linear;

//       &:hover,
//       &:active,
//       &:focus, {
//         color: rgba(41, 52, 118, 1) !important;
//         transition: 0.25s linear;
//       }
//     }

//     .active {
//       color: rgba(41, 52, 118, 1) !important;
//       pointer-events: none;
//     }
// `
// const EmailInput = styled.input`
//   @media only screen and (max-width: 768px) {
//     border-right: 1px solid #dbdbdb;
//     border-top-right-radius: 4px;
//     border-bottom-right-radius: 4px;
//   }

//   @media only screen and (min-width: 769px) {
//     border-right: none;
//     border-top-right-radius: 0;
//     border-bottom-right-radius: 0;
//   }
// `

// const SignUp = styled.div`
//   @media only screen and (max-width: 768px) {
//     border-top-left-radius: 4px;
//     border-bottom-left-radius: 4px;
//     font-size: 1rem;
//     margin-top: 24px;
//   }

//   @media only screen and (min-width: 769px) {
//     > a {
//       border-top-left-radius: 0;
//       border-bottom-left-radius: 0;
//     }
//   }

//   > a {
//     width: 100%;
//   }
// `

// const ConnectColumnLeft = styled.div`
//     align-items: center;
//     display: flex;
//     justify-content: left;
// `

// const ConnectColumnRight = styled.div`
//     align-items: center;
//     display: flex;
//     justify-content: flex-end;
// `