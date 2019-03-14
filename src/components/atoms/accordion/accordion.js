import React, { Component } from 'react'


const Accordion = class extends Component {
  // constructor(props) {
  //   super(props)

  //   this.state = {
  //     accordionPanels: {
  //       collapseOne: {
  //         expanded: true
  //       },
  //       collapseTwo: {
  //         expanded: false
  //       },
  //       collapseThree: {
  //         expanded: false
  //       },
  //       collapseFour: {
  //         expanded: false
  //       }
  //     }
  //   }

  //   // this.handleChangeExpandedState = this.handleChangeExpandedState.bind(this)
  // }

  // handleChangeExpandedState = (event) => {
  //   const key = event.target.id
  //   this.setState(prevState => ({
  //     accordionPanels: {
  //       ...prevState.accordionPanels,
  //       [key]: {
  //         expanded: !prevState.accordionPanels[key].expanded
  //       },
  //     },
  //   }), 
  //   function () {
  //     console.log(key)
  //     console.log(this.state.accordionPanels[key].expanded)
  //     console.log(this.state.accordionPanels)
  //   })
  // }

  // constructor(props) {
  //   super(props)

  // }

  state = {
    collapseID: ""
  }

  toggleCollapse = (collapseID) => {
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ""
    }))
  }

  componentDidMount() {
    let collapseHeight= []

    this.intervalId = setInterval(
      () => this.props.panels.map(
        (panel, index) => collapseHeight[index] = document.getElementById(`collapse${index}`).scrollHeight
      ), 500
    )
    this.setState({
      collapseHeight
    })
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  render() {
    const {
      collapseID,
      collapseHeight
    } = this.state

    let styles = []
    this.props.panels.map((panel, index) => {
      return styles[index] = {maxHeight: collapseID === `collapse${index}` ? `${collapseHeight[index]}px` : '0px'}
    })

    return (
      <div className="accordion" id="accordion">
        { this.props.panels.map((panel, index) => {
          return(
            <div 
              className="card accordion-card"
              key={index}
            >
              <button
                className="btn btn-link accordion-button"
                type="button"
                data-toggle="collapse"
                data-target={`#collapse${index}`}
                aria-expanded="true"
                aria-controls={`collapse${index}`}
                onClick={() => this.toggleCollapse(`collapse${index}`)}
              >
                <div className="d-flex">
                  <div className="mr-auto">
                    <h2
                      style={{
                        marginBottom: '0',
                        lineHeight: '1.5'
                      }}
                    >
                      { panel.heading }
                    </h2>
                  </div>
                  <div className="ml-auto">
                    <i
                      className={
                        collapseID === `collapse${index}`
                        ?
                        "fa fa-angle-down counterclockwise-180"
                        :
                        "fa fa-angle-down clockwise-to-zero"
                      }
                    />
                  </div>
                </div>
              </button>
              <div
                id={`collapse${index}`}
                className={
                  collapseID === `collapse${index}`
                  ? 
                  'collapse accordionCollapse show' 
                  : 
                  'collapse accordionCollapse'
                }
                style={ styles[index] }
                aria-labelledby="headingOne"
                data-parent="#accordion"
              >
                <div className="card-body">
                  { panel.content }
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

export default Accordion
