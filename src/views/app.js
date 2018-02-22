import React, { Component } from 'react'
import '../App.css'
import { Aplicacion } from '../router'
import { Link, withRouter } from 'react-router-dom'
import { Sidebar, Carrito } from '../components'
import { Layout } from 'antd'
const { Header, Content } = Layout

class Main extends Component {
  render() {
    return (
      <div id="outer-container">
        <Layout style={{ minHeight: '100vh' }}>
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
                <h2 style={{ display: 'inline', textAlign: 'center' }}>
                  TDO - Tienda
                </h2>
              </Link>
            </Header>
            <Content style={{ margin: '10px' }}>
              <div style={{ background: '#fff' }}>
                <Aplicacion />
              </div>
            </Content>
          </Layout>
        </Layout>
      </div>
    )
  }
}

export default withRouter(Main)
// export default App
