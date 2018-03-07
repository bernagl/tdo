import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Formsy from 'formsy-react'
import { Button, message } from 'antd'
import { Minput } from '../components'

class PerfilForm extends Component {
  constructor(props) {
    super(props)
    this.disableButton = this.disableButton.bind(this)
    this.enableButton = this.enableButton.bind(this)
    this.submit = this.submit.bind(this)
    this.state = { canSubmit: false, loading: false }
  }

  componentWillMount() {
    const { usuario } = this.props
    usuario
      ? this.setState({ uid: usuario.ID, titulo: 'Guardar perfil' })
      : this.setState({
          titulo: 'Registrarme',
          usuario: {
            user_login: '',
            user_phone: '',
            user_email: '',
            user_pass: ''
          }
        })
  }

  disableButton() {
    this.setState({ canSubmit: false })
  }

  enableButton() {
    this.setState({ canSubmit: true })
  }

  async submit(model) {
    model.uid = this.state.uid
    this.setState({ loading: true })
    if (this.props.usuario) model.credentials = this.props.usuario
    const response = await this.props.action(model)
    this.setState({ loading: false })

    if (response) {
      response.uid
        ? this.props.titulo !== 'Registrarme'
          ? message.success('Perfil actualizado')
          : this.props.history.push('/')
        : message.error(response.message)
    } else {
      message.error(response.message)
    }
  }

  render() {
    const { usuario } = this.props.usuario ? this.props : this.state
    console.log(usuario)
    return (
      <Formsy
        onValidSubmit={this.submit}
        onValid={this.enableButton}
        onInvalid={this.disableButton}
      >
        <Minput
          name="user_login"
          placeholder="Nombre"
          type="text"
          icon="user"
          validations="minLength:1"
          value={usuario.user_login}
          validationError="Ingresa un nombre válido"
          required
        />
        <Minput
          name="user_email"
          placeholder="Correo"
          type="email"
          icon="mail"
          validations="isEmail"
          value={usuario.user_email}
          validationError="Ingresa un correo electrónico válido"
          required
        />
        <Minput
          name="user_pass"
          placeholder="Contraseña"
          type="password"
          icon="unlock"
          validations="minLength:6"
          value={usuario.user_pass}
          validationError="Ingresa una contraseña de más de 6 dígitos"
          required
        />
        <Minput
          name="confirmar"
          placeholder="Confirmar"
          type="password"
          icon="lock"
          validations="equalsField:user_pass"
          value={usuario.user_pass}
          validationError="Las contraseñas no coinciden"
          required
        />
        <Button
          type="primary"
          htmlType="submit"
          loading={this.state.loading}
          disabled={!this.state.canSubmit}
          className="fw"
        >
          {this.state.titulo}
        </Button>
      </Formsy>
    )
  }
}

export default withRouter(PerfilForm)
