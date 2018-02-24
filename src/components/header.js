import React, { Component } from 'react'
import { Carrito, Sidebar } from './index'
import { Link } from 'react-router-dom'
import { Layout } from 'antd'
import logo from '../assets/td.png'

export default class HeaderBar extends Component {
  render() {
    return (
      <Layout.Header
        className="header"
        style={{
          background: '#fff',
          paddingLeft: 30,
          textAlign: 'center'
        }}
      >
        <Sidebar />
        <Carrito className="header-carrito" />
        <Link to="/">
          <img src={logo} alt="" />
          {/* <h1 style={{ display: 'inline', textAlign: 'center' }}>
            TDO - Tienda
          </h1> */}
        </Link>
      </Layout.Header>
    )
  }
}
