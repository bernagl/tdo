import React, { Component } from 'react'
import Formsy from 'formsy-react'
import { Button } from 'antd'
import { Minput } from '../components'

export default class Prueba extends Component {
  constructor(props) {
    super(props)
    this.disableButton = this.disableButton.bind(this)
    this.enableButton = this.enableButton.bind(this)
    this.submit = this.submit.bind(this)
    this.state = { canSubmit: false, loading: false }
  }

  disableButton() {
    this.setState({ canSubmit: false })
  }

  enableButton() {
    this.setState({ canSubmit: true })
  }

  submit(model) {
    console.log(model)
    this.setState({ loading: true })
  }

  render() {
    return (
      <Formsy
        onValidSubmit={this.submit}
        onValid={this.enableButton}
        onInvalid={this.disableButton}
      >
        <Minput
          name="email"
          type="email"
          label="Correo"
          validations="isEmail"
          validationError="This is not a valid email"
          required
        />
        <Minput
          name="nombre"
          type="text"
          label="Nombre completo"
          validationError="This is not a valid name"
          required
        />
        <Button
          type="primary"
          htmlType="submit"
          loading={this.state.loading}
          disabled={!this.state.canSubmit}
          className="fw"
        >
          Submit
        </Button>
      </Formsy>
    )
  }
}
