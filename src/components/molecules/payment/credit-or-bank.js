import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'

const CreditOrBank = class extends Component {
  render() {
    return (
      <React.Fragment>
        <Alert variant="warning"><i className="fas fa-exclamation-triangle"></i>&nbsp;Listicle iPhone chicharrones umami before they sold out freegan art party tilde hammock glossier. Readymade brunch retro raclette mumblecore. Wolf tilde paleo synth. Hot chicken dreamcatcher readymade vape. Cornhole master cleanse poke echo park pop-up tacos before they sold out man braid twee distillery tote bag. Cold-pressed knausgaard live-edge chillwave gentrify humblebrag. Schlitz polaroid disrupt twee DIY bespoke.</Alert>
        <div className="d-flex justify-content-center flex-wrap">
          <Button className="m-2" variant="outline-primary" onClick={() => this.props.setCreditOrBank('Credit')}>Credit</Button>
          <Button className="m-2" variant="outline-primary" onClick={() => this.props.setCreditOrBank('Bank')}>Bank</Button>
        </div>
      </React.Fragment>
    )
  }
}

export default CreditOrBank