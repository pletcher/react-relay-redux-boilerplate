import React, { Component } from 'react'

export default class DefaultPage extends Component {
  render() {
    return (
      <div className="mx-auto p4">
        {this.props.children}
      </div>
    )
  }
}
