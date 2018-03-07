import React, { Component } from 'react'
import { connect } from 'react-redux'
import { cerrarSesion } from '../actions/auth_acions'
import { actualizarPerfil } from '../actions/perfil_actions'
import { Direcciones, PedidoList, PerfilForm } from '../components'
import { Col, Divider, Icon, Row, Tabs } from 'antd'
const { TabPane } = Tabs

class Perfil extends Component {
  // componentWillMount() {
  //   const usuario = this.props.auth
  //   this.setState({ ...usuario })
  // }

  render() {
    const usuario = this.props.auth
    return (
      <div className="perfil-view">
        <Row type="flex" justify="center" />
        <Row>
          <Col span={24}>
            <Tabs>
              <TabPane
                tab={
                  <span>
                    <Icon type="user" /> Perfil
                  </span>
                }
                key="1"
              >
                <Row>
                  <Col span={24}>
                    <PerfilForm
                      titulo="Guardar"
                      action={this.props.actualizarPerfil}
                      usuario={usuario}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Divider />
                  </Col>
                  <Col span={24} className="center-text">
                    <span onClick={this.props.cerrarSesion}>Cerrar sesión</span>
                  </Col>
                </Row>
              </TabPane>
              {/* <TabPane
                tab={
                  <span>
                    <Icon type="home" />Dirección
                  </span>
                }
                key="2"
              >
                <Direcciones uid={this.props.auth.uid} view="perfil" />
              </TabPane> */}
              <TabPane
                tab={
                  <span>
                    <Icon type="exception" />Pedidos
                  </span>
                }
                key="3"
              >
                <PedidoList uid={this.props.auth.ID} />
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
    )
  }
}

function mapDispatchToProps({ auth }) {
  return { auth }
}

export default connect(mapDispatchToProps, { actualizarPerfil, cerrarSesion })(
  Perfil
)
