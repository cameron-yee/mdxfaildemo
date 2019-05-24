import React, { Component } from 'react'

import Scrollspy from 'react-scrollspy'

import Col from 'react-bootstrap/Col'

import './dashboard-menus.scss'

const DashboardSideMenu = class extends Component {
  constructor(props) {
    super(props)

    this.state = {
      expanded: true,
      icon_class: 'mr-3'
      // width: 2
    }
  }

  toggleSideMenu = (e) => {
    e.preventDefault()

    if(this.state.expanded) {
      document.getElementById('dashboard-side-menu').setAttribute('data-state', 'menu-collapsed')
      const titles = document.querySelectorAll("td[data-state='title-column-expanded']")
      for(let i = 0; i < titles.length; i++) {
        titles[i].setAttribute('data-state', 'title-column-collapsed')
      }

      this.setState({expanded: false, icon_class: ''})
      this.props.toggleSideMenu('collapse')
    } else {
      document.getElementById('dashboard-side-menu').setAttribute('data-state', 'menu-expanded')
      const titles = document.querySelectorAll("td[data-state='title-column-collapsed']")
      for(let i = 0; i < titles.length; i++) {
        titles[i].setAttribute('data-state', 'title-column-expanded')
      }

      this.setState({expanded: true, icon_class: 'mr-3'})
      this.props.toggleSideMenu('expand')
    }
  }

  render() {
    let scrollspy_items = []
    for(let i = 0; i < this.props.items.length; i++) {
      scrollspy_items.push(this.props.items[i][0])
    }

    return (
      <Col id="dashboard-side-menu" data-state="menu-expanded" className="d-none d-lg-block">
        <table id="side-menu-nav">
          <thead>
            <tr
              className="dashboard-menu-link list-group-item list-group-item-action toggle d-flex"
              onClick={(e) => this.toggleSideMenu(e)}
            >
              {this.state.expanded &&
                <td><i className="fas fa-angle-double-left close-arrow"></i></td>
              }
              {!this.state.expanded &&
                <td><i className="fas fa-angle-double-right close-arrow"></i></td>
              }
            </tr>
          </thead>
          <Scrollspy
            // items={this.props.items.filter(item => item[0])}
            items={scrollspy_items}
            className="d-none d-lg-block h-100"
            currentClassName="active"
            componentTag="tbody"
          >
            {this.props.items.map((item, index) => {
              let class_name, item_title

              if (index === 0) {
                class_name = "dashboard-menu-link list-group-item list-group-item-action first"
              } else {
                class_name = "dashboard-menu-link list-group-item list-group-item-action"
              }

              item_title = item[0].charAt(0).toUpperCase() + item[0].slice(1).replace('-', ' ')

              return (
              <tr
                className={`${class_name}`}
                key={`side-menu-row-${index}`}
                onClick={(e) => document.getElementById(`${item[0]}`).scrollIntoView({behavior: "smooth", block: "start"})}
              >
                <td><i className={`fas ${item[1]} ${this.state.icon_class}`}></i></td>
                <td data-state="title-column-expanded">{item_title}</td>
              </tr>
              )
            })}
          </Scrollspy>
        </table>
      </Col>
    )
  }
}

export default DashboardSideMenu