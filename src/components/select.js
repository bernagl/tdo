import React, { Component } from 'react'
import { withFormsy } from 'formsy-react'
import { Form, Select } from 'antd'
import estados from '../data/estados'
const { Item } = Form

class Mselect extends Component {
  constructor(props) {
    super(props)
    this.handleInput = this.handleInput.bind(this)
  }

  handleInput(value) {
    // setValue() will set the value of the component, which in
    // turn will validate it and the rest of the form
    // Important: Don't skip this step. This pattern is required
    // for Formsy to work.
    console.log(value)
    this.props.setValue(value)
  }

  renderOptions() {
    return estados.map(({ estado, value }, key) => {
      return (
        <Select.Option key={key} value={value}>
          {estado}
        </Select.Option>
      )
    })
  }

  render() {
    const isValid = this.props.getErrorMessage()
    return (
      <Item
        validateStatus={isValid ? 'error' : ''}
        help={isValid ? isValid : ''}
      >
        <Select
          value={this.props.getValue()}
          onChange={this.handleInput}
          placeholder="Selecciona un estado"
        >
          {this.renderOptions()}
        </Select>
      </Item>
    )
  }
}

export default withFormsy(Mselect)
