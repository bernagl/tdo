import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Pre, Routes } from './router'
import { checkSession } from './actions/auth_acions'
import { connect } from 'react-redux'
import { Modal } from 'antd'
import './App.css'

class App extends Component {
  state = { error: false }

  render() {
    const logged = localStorage.getItem('logged')
    const { error } = this.props
    return !error ? (
      logged ? (
        <Pre />
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

function mapDispatchToProps({ general: { error } }) {
  return { error }
}

export default withRouter(connect(mapDispatchToProps, { checkSession })(App))
// export default App
