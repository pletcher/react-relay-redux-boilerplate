import HeroBanner from 'components/ui/HeroBanner'
import React, { Component, PropTypes } from 'react'
import SignupForm from 'components/authentication/SignupForm'

export default class LandingPage extends Component {
  static propTypes = {
    viewer: PropTypes.object,
  }

  render() {
    return (
      <div>
        <HeroBanner text="CHANGE ME" />
        <div className="mx-auto p4 sm-flex">
          <div className="border sm-col-4 flex flex-auto flex-center mr2" style={{ minHeight: 140 }}>
            <span className="center h4 mx-auto regular">
              Learn a new skill
            </span>
          </div>

          <div className="border sm-col-4 flex flex-auto flex-center mr2" style={{ minHeight: 140 }}>
            <span className="center h4 mx-auto regular">
              Gain real-world experience
            </span>
          </div>

          <div className="border sm-col-4 flex flex-auto flex-center mr2" style={{ minHeight: 140 }}>
            <div className="center h4 mx-auto regular">
              Teach others what you know
            </div>
          </div>
        </div>

        {this.renderSignupForm()}
      </div>
    )
  }

  renderSignupForm() {
    if (!this.props.viewer) {
      return (
        <div>
          <h2 className="center mb2">Get started</h2>
          <div className="border mx-auto px4 py3 sm-col-4">
            <SignupForm viewer={this.props.viewer} emailAddress="foo@bar.com" password="password" />
          </div>
        </div>
      )
    }
  }
}
