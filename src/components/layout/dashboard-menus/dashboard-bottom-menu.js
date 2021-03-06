import React, { Component } from 'react'

import Scrollspy from 'react-scrollspy'

import Container from 'react-bootstrap/Container'

import './dashboard-menus.scss'

const DashboardBottomMenu = class extends Component {
  render() {
    let scrollspy_items = []
    for(let i = 0; i < this.props.items.length; i++) {
      scrollspy_items.push(this.props.items[i][0])
    }

    return (
      <Container id="side-menu-bottom" className="d-block d-lg-none fixed-bottom p-0" fluid>
        <Scrollspy
          // items={this.props.items.filter(item => item[0])}
          items={scrollspy_items}
          currentClassName="active"
          componentTag="div"
          // className="d-flex justify-content-center flex-wrap flex-sm-nowrap flex-basis"
          className="d-flex justify-content-center"
          style={{height: '100%'}}
        >
          {this.props.items.map((item, index) => {
            const item_title = item[0].charAt(0).toUpperCase() + item[0].slice(1).replace('-', ' ')
            return (
              <div
                // xs={2}
                className={`bottom-menu-link p-2 text-center flex-fill flex-menu-item-${index}`}
                key={`bottom-menu-${index}`}
                onClick={(e) => document.getElementById(`${item[0]}`).scrollIntoView({behavior: "smooth", block: "start"})}
                style={{fontSize: '1rem'}}
              >
                <i className={`fas ${item[1]}`}></i>
                <br />
                <span className="d-none d-sm-block bm-span">{item_title}</span>
              </div>
            )
          })}
        </Scrollspy>
      </Container>
    )
  }
}

export default DashboardBottomMenu