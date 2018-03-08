import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Aplicacion, Routes } from './router'
import { checkSession } from './actions/auth_acions'
import { search } from './actions/general_actions'
import { connect } from 'react-redux'
import { Button, Input, Layout, Modal } from 'antd'
import { BreadCrumb, Carrito, Sidebar } from './components'
import logo from './assets/td.png'
import './App.css'

const { Search } = Input
const { Header, Content } = Layout

class App extends Component {
  state = { error: false }

  render() {
    const { auth, error, history, location } = this.props
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

            <Content style={{ margin: '0px 10px 10px 10px' }}>
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

export default withRouter(
  connect(mapDispatchToProps, { checkSession, search })(App)
)
// export default App
