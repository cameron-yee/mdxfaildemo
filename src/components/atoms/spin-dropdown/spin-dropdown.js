import React, { Component } from 'react'

const SpinDropdown = class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      focus_element: undefined, // FOR DROPDOWN ARROWS
      focus_counter: 0, // FOR DROPDOWN ARROWS
    }
  }

  componentDidMount() {
    this.setState({focus_element: document.activeElement})
    const nav_link_list = document.getElementsByClassName('dropdown-toggle');
    if(nav_link_list.length > 0) {
      for(let i = 0; i < nav_link_list.length; i++) {
        nav_link_list[i].addEventListener('click', e => {
          e.preventDefault();
          if(e.target === this.state.focus_element && this.state.focus_counter % 2 === 1) {
            e.target.blur()
            let new_count = this.state.focus_counter + 1
            this.setState({focus_element: e.target, focus_counter: new_count})
          } else {
            e.target.focus()
            if(e.target === this.state.focus_element) {
              let new_count = this.state.focus_counter + 1
              this.setState({focus_element: e.target, focus_counter: new_count})
            } else {
              this.setState({focus_element: e.target, focus_counter: 1})
            }
          }
        })
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.props.children}
      </React.Fragment>
    )
  }
}

export default SpinDropdown