import React, { Component } from 'react'
import { Carrito, Sidebar } from './index'
import { Link } from 'react-router-dom'
import { Layout } from 'antd'

export default class HeaderBar extends Component {
  render() {
    return (
      <Layout.Header className="header"
        style={{
          background: '#fff',
          paddingLeft: 30,
          textAlign: 'center'
        }}
      >
        <Sidebar />
        <Carrito className="header-carrito" />
        <Link to="/">
          <h1 style={{ display: 'inline', textAlign: 'center' }}>
            TDO - Tienda
          </h1>
        </Link>
      </Layout.Header>
    )
  }
}
