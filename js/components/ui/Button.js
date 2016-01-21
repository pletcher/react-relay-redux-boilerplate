import classnames from 'classnames'
import React, { Component, PropTypes } from 'react'

export default class Button extends Component {
  static propTypes = {
    block: PropTypes.bool,
    disabled: PropTypes.bool,
    type: PropTypes.oneOf([
      'default',
      'primary',
    ])
  }

  static defaultProps = {
    type: 'default'
  }

  render() {
    const {
      block,
      children,
      disabled,
      type,
    } = this.props
    const classes = classnames(`btn btn-${type} center`, {
      block,
      'is-disabled': disabled,
    })

    return (
      <a className={classes} {...this.props}>
        {children}
      </a>
    )
  }
}
