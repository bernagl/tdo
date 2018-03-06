import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Aplicacion } from '../router'
import { Link, withRouter } from 'react-router-dom'
import { Sidebar, Carrito } from '../components'
import { Layout } from 'antd'
import logo from '../assets/td.png'
import '../App.css'

const { Header, Content } = Layout

class Main extends Component {
  render() {
    return (
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
              <img src={logo} alt="" style={{ width: '20%', maxHeight: 64 }} />
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
    )
  }
}

const mapDispatchToProps = ({ auth }) => ({ auth })

export default withRouter(connect(mapDispatchToProps)(Main))
// export default App
