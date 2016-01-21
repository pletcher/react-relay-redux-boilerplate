import Header from 'components/ui/Header'
import React, { Component } from 'react'
import Relay from 'react-relay'

class App extends Component {
  render() {
    const { children, viewer } = this.props

    return (
      <div className="fit">
        <Header viewer={viewer} />
        {children && React.cloneElement(children, {
          viewer
        })}
      </div>
    )
  }
}

export default Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
      fragment Home on User {
        ${Header.getFragment('viewer')}
      }
    `
  }
})
