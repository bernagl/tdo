import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Aplicacion, Routes } from './router'
import { checkSession } from './actions/auth_acions'
import { connect } from 'react-redux'
import { Button, Layout, Modal } from 'antd'
import { Sidebar, Carrito } from './components'
import logo from './assets/td.png'
import './App.css'

const { Header, Content } = Layout

class App extends Component {
  state = { error: false }

  render() {
    const { auth, error } = this.props
    return !error ? (
      auth ? (
        <div id="outer-container">
          <Sidebar />
          <Layout id="page-wrap">
            <Header
              style={{
                paddingLeft: 30,
                textAlign: 'center'
              }}
            >
              <Carrito />
              <Link to="/">
                <img
                  src={logo}
                  alt=""
                  style={{ width: '20%', maxHeight: 64 }}
                />
                {/* <h2 style={{ display: 'inline', textAlign: 'center' }}>
                TDO - Tienda
              </h2> */}
              </Link>
            </Header>
            <Content style={{ margin: '10px' }}>
              <Aplicacion />
            </Content>
          </Layout>
        </div>
      ) : (
        <Routes />
      )
    ) : (
      <Modal
        title="Ocurrió un error"
        visible={error}
        onOk={() => window.location.reload()}
        okText="Recargar la aplicación"
      >
        <p>
          Lamentamos que esto haya sucedido, para continuar navegando por favor
          reacarga la aplicación
        </p>
      </Modal>
    )
  }
}

function mapDispatchToProps({ auth, general: { error } }) {
  return { auth, error }
}

export default withRouter(connect(mapDispatchToProps, { checkSession })(App))
// export default App
