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
    usuario
      ? this.setState({ uid: usuario.uid, titulo: 'Guardar perfil' })
      : this.setState({
          titulo: 'Registrarme',
          usuario: { nombre: '', celular: '', correo: '', contrasena: '' }
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
    // return !this.state.uid ? (
    //   <Row type="flex" align="middle" justify="center">
    //     <Col span={24}>
    //       <Icon type="loading" />
    //     </Col>
    //   </Row>
    // ) : (
    return (
      <Formsy
        onValidSubmit={this.submit}
        onValid={this.enableButton}
        onInvalid={this.disableButton}
      >
        <Minput
          name="nombre"
          placeholder="Nombre"
          type="text"
          icon="user"
          validations="minLength:6"
          value={usuario.nombre}
          validationError="Ingresa un nombre de mínimo 6 caracteres"
          required
        />
        <Minput
          name="celular"
          placeholder="Celular"
          type="text"
          icon="mobile"
          validations={{ minLength: 10, maxLength: 10 }}
          value={usuario.celular}
          validationError="Ingresa un número de teléfono válido"
          required
        />
        <Minput
          name="correo"
          placeholder="Correo"
          type="email"
          icon="mail"
          validations="isEmail"
          value={usuario.correo}
          validationError="Ingresa un correo electrónico válido"
          required
        />
        <Minput
          name="contrasena"
          placeholder="Contraseña"
          type="password"
          icon="unlock"
          validations="minLength:6"
          value={usuario.contrasena}
          validationError="Ingresa una contraseña de más de 6 dígitos"
          required
        />
        <Minput
          name="confirmar"
          placeholder="Confirmar"
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
          {this.state.titulo}
        </Button>
      </Formsy>
    )
  }
}

export default withRouter(PerfilForm)
