import React, { Component, PropTypes } from 'react'

export default class HeroBanner extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
  }

  render() {
    return (
      <header className="center px3 py4">
        <h1 className="h1 h0-responsive caps mt4 mb0 regular">{this.props.text}</h1>
      </header>
    )
  }
}
