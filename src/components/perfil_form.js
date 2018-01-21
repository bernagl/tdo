import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Formsy from 'formsy-react'
import { Button, Col, Icon, message, Row } from 'antd'
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
    usuario && this.setState({ uid: usuario.uid })
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
    console.log(this.props.usuario)
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
    const { usuario } = this.props
    return !usuario ? (
      <Row type="flex" align="middle" justify="center">
        <Col span={24}>
          <Icon type="loading" />
        </Col>
      </Row>
    ) : (
      <Formsy
        onValidSubmit={this.submit}
        onValid={this.enableButton}
        onInvalid={this.disableButton}
      >
        <Minput
          name="nombre"
          type="text"
          icon="user"
          validations="minLength:6"
          value={usuario.nombre}
          validationError="Ingresa un nombre de mínimo 6 caracteres"
          required
        />
        <Minput
          name="celular"
          type="text"
          icon="mobile"
          validations={{ minLength: 10, maxLength: 10 }}
          value={usuario.celular}
          validationError="Ingresa un número de teléfono válido"
          required
        />
        <Minput
          name="correo"
          type="email"
          icon="mail"
          validations="isEmail"
          value={usuario.correo}
          validationError="Ingresa un correo electrónico válido"
          required
        />
        <Minput
          name="contrasena"
          type="password"
          icon="unlock"
          validations="minLength:6"
          value={usuario.contrasena}
          validationError="Ingresa una contraseña de más de 6 dígitos"
          required
        />
        <Minput
          name="confirmar"
          type="password"
          icon="lock"
          validations="equalsField:contrasena"
          value={usuario.contrasena}
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
          Guardar perfil
        </Button>
      </Formsy>
    )
  }
}

export default withRouter(PerfilForm)
