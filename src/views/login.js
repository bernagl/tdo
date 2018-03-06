import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Formsy from 'formsy-react'
import { facebookLogin } from '../actions/auth_acions'
import { login } from '../actions/wp_actions'
import { Button, Col, Divider, Layout, message, Row } from 'antd'
import { Minput } from '../components'
const { Content } = Layout

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      correo: { value: '', label: '' },
      contrasena: { value: '', label: '' },
      loading: false,
      button: true
    }
    this.submit = this.submit.bind(this)
    this.disableButton = this.disableButton.bind(this)
    this.enableButton = this.enableButton.bind(this)
  }

  async submit(model) {
    this.setState({ loading: true })
    console.log(model)
    const response = await this.props.login(model)
    if (response) this.props.history.push('/')
    else {
      message.error('Usuario o contraseña incorrectos')
      this.setState({ loading: false })
    }
  }

  disableButton() {
    this.setState({ canSubmit: false })
  }

  enableButton() {
    this.setState({ canSubmit: true })
  }

  render() {
    return (
      <div className="login">
        <div className="top-background" />
        <Layout>
          <Content style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <Row style={{ border: '1px #96D8E9 solid' }} className="bw p20">
              <Col span={24} className="center-text">
                <h2>Inicio de sesión</h2>
              </Col>
              <Col span={24}>
                <Formsy
                  onValidSubmit={this.submit}
                  onValid={this.enableButton}
                  onInvalid={this.disableButton}
                >
                  <Minput
                    placeholder="Correo"
                    name="correo"
                    type="text"
                    validations="isEmail"
                    value=""
                    validationError="Ingresa un correo válido"
                    required
                  />
                  <Minput
                    placeholder="Contraseña"
                    name="contrasena"
                    type="password"
                    validations="minLength: 6"
                    value=""
                    validationError="Las contraseñas deben tener al menos 6 caracteres"
                    required
                  />
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={this.state.loading}
                    disabled={!this.state.canSubmit}
                    className="fw"
                  >
                    Iniciar sesión
                  </Button>
                </Formsy>
              </Col>
              <Col span={24} className="mt-20">
                <Row type="flex" justify="space-between">
                  <Col span={24}>
                    <Divider>ó</Divider>
                  </Col>
                  <Col span={11}>
                    <Button
                      onClick={this.props.facebookLogin}
                      icon="facebook"
                      className="facebook-login--btn fw"
                    />
                  </Col>
                  <Col span={11}>
                    <Button icon="google" className="google-login--btn fw" />
                  </Col>
                </Row>
              </Col>
              <Col
                span={24}
                className="mt-20"
                style={{ borderTop: '1px solid lightgray ' }}
              >
                <div className="mt-20 center-text">
                  <Link to="/registro">Registrarme </Link> |
                  <Link to="/registro"> Recuperar contraseña</Link>
                </div>
              </Col>
            </Row>
          </Content>
        </Layout>
      </div>
    )
  }
}

export default connect(null, { facebookLogin, login })(Login)
