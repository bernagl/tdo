import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { PerfilForm } from '../components'
import { registro } from '../actions/auth_acions'
import { Col, Layout, Row } from 'antd'
const { Content } = Layout

class Registro extends Component {
  render() {
    return (
      <div className="registro">
        <div className="top-background" />
        <Layout>
          <Content style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <Row style={{ border: '1px #96D8E9 solid' }} className="bw p20">
              <Col span={24} className="center-text">
                <h2>Registro</h2>
              </Col>
              <Col span={24}>
                <PerfilForm
                  titulo="Registrarme"
                  action={this.props.registro}
                  usuario={null}
                />
              </Col>
              <Col
                span={24}
                className="mt-20"
                style={{ borderTop: '1px solid lightgray ' }}
              >
                <div className="mt-20 center-text">
                  <Link to="/login">Iniciar sesión </Link>
                </div>
              </Col>
            </Row>
          </Content>
        </Layout>
      </div>
    )
  }
}

export default connect(null, { registro })(Registro)
