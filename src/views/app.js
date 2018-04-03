import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Aplicacion } from '../router'
import { withRouter } from 'react-router-dom'
import { Layout } from 'antd'
import '../App.css'

const { Content } = Layout

class Main extends Component {
  render() {
    return (
      <div id="outer-container">
        <Layout id="page-wrap">
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
