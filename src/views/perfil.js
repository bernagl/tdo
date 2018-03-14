import React, { Component } from 'react'
import { connect } from 'react-redux'
import { cerrarSesion } from '../actions/auth_acions'
import { vaciarCarrito } from '../actions/carrito_actions'
import { vaciarDireccion } from '../actions/direccion_actions'
import { vaciarPedidos } from '../actions/pedido_actions'
// import { actualizarPerfil } from '../actions/perfil_actions'
import { PedidoList, PerfilForm } from '../components'
import DocumentTitle from 'react-document-title'
import { Col, Divider, Icon, Row, Tabs } from 'antd'
const { TabPane } = Tabs

class Perfil extends Component {
  // componentWillMount() {
  //   const usuario = this.props.auth
  //   this.setState({ ...usuario })
  // }

  cerrarSesion = () => {
    this.props.cerrarSesion()
    this.props.vaciarCarrito()
    this.props.vaciarPedidos()
    this.props.vaciarDireccion()
  }

  render() {
    const usuario = this.props.auth
    return (
      <DocumentTitle title="Perfil">
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
                        // action={this.props.actualizarPerfil}
                        usuario={usuario}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Divider />
                    </Col>
                    <Col span={24} className="center-text">
                      <span onClick={this.cerrarSesion}>Cerrar sesión</span>
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
      </DocumentTitle>
    )
  }
}

function mapDispatchToProps({ auth }) {
  return { auth }
}

export default connect(mapDispatchToProps, {
  // actualizarPerfil,
  cerrarSesion,
  vaciarCarrito,
  vaciarDireccion,
  vaciarPedidos
})(Perfil)
