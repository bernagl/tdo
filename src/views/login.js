import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { facebookLogin, login } from '../actions/auth_acions'
import {
  Button,
  Col,
  Divider,
  Form,
  Icon,
  Input,
  Layout,
  message,
  Row
} from 'antd'
const { Item } = Form
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
    this.login = this.login.bind(this)
    this.handleInput = this.handleInput.bind(this)
  }

  async login() {
    this.setState({ loading: true })
    const response = await this.props.login(
      this.state.correo.value,
      this.state.contrasena.value
    )
    console.log(response)
    if (response) this.props.history.push('/')
    else {
      message.error('Usuario o contraseña incorrectos')
      this.setState({ loading: false })
    }
  }

  handleInput(e) {
    const name = e.target.name
    const value = e.target.value

    value.length < 6
      ? this.setState({ [name]: { value, label: 'error' }, button: true })
      : this.setState({ [name]: { value, label: '' }, button: false })

    name === 'correo' &&
      (!this.validateMail(value)
        ? this.setState({ [name]: { value, label: 'error' }, button: true })
        : this.setState({ [name]: { value, label: '' }, button: false }))
  }

  validateMail(email) {
    var re = /\S+@\S+\.\S+/
    return re.test(email)
  }

  render() {
    return (
      <div className="login">
        <div className="top-background" />
        <Layout>
          <Content style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <Row style={{ border: '1px #96D8E9 solid' }} className="bw p20">
              <Col span={24} className="center-text">
                <h2>Inicio se sesión</h2>
              </Col>
              <Col span={24}>
                <Form>
                  <Item validateStatus={this.state.correo.label}>
                    <Input
                      value={this.state.correo.value}
                      onChange={this.handleInput}
                      placeholder="Correo"
                      name="correo"
                      prefix={
                        <Icon
                          type="mail"
                          style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                      }
                    />
                  </Item>
                  <Item validateStatus={this.state.contrasena.label}>
                    <Input
                      onChange={this.handleInput}
                      placeholder="Contraseña"
                      name="contrasena"
                      type="password"
                      prefix={
                        <Icon
                          type="unlock"
                          style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                      }
                    />
                  </Item>
                </Form>
              </Col>
              <Col span={24}>
                <Button
                  onClick={this.login}
                  disabled={this.state.button}
                  type="primary"
                  loading={this.state.loading}
                  className="fw"
                >
                  Iniciar sesión
                </Button>
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
