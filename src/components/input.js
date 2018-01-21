import React, { Component } from 'react'
import { withFormsy } from 'formsy-react'
import { Form, Icon, Input } from 'antd'
const { Item } = Form

class Minput extends Component {
  constructor(props) {
    super(props)
    this.handleInput = this.handleInput.bind(this)
  }

  handleInput(event) {
    // setValue() will set the value of the component, which in
    // turn will validate it and the rest of the form
    // Important: Don't skip this step. This pattern is required
    // for Formsy to work.
    this.props.setValue(event.currentTarget.value)
  }

  render() {
    const isValid = this.props.getErrorMessage()
    const { icon, placeholder, type } = this.props
    return (
      <Item
        validateStatus={isValid ? 'error' : ''}
        help={isValid ? isValid : ''}
      >
        <Input
          placeholder={placeholder}
          type={type || 'text'}
          value={this.props.getValue()}
          onChange={this.handleInput}
          prefix={
            icon ? (
              <Icon type={icon} style={{ color: 'rgba(0,0,0,.25)' }} />
            ) : (
              ''
            )
          }
        />
      </Item>
    )
  }
}

export default withFormsy(Minput)
