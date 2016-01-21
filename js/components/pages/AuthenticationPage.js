import React, { Component } from 'react'

export default class AuthenticationPage extends Component {
  render() {
    return (
      <div className="mx-auto sm-col-6">
        <div className="center">
          <h2 className="h2 caps mt4 mb0 regular">CHANGE ME</h2>
        </div>
        {this.props.children}
      </div>
    )
  }
}
