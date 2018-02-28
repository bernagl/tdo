import React, { Component } from 'react'
import './App.css'
import { Aplicacion, Routes } from './router'
import { withRouter } from 'react-router-dom'
import { checkSession } from './actions/auth_acions'
import { connect } from 'react-redux'
import { Button, Modal } from 'antd'

class App extends Component {
  state = { error: false }
  // componentWillMount() {
  //   this.redirect(this.props)
  // }

  // componentWillUpdate(props) {
  //   this.redirect(props)
  // }

  // redirect(props) {
  //   if (
  //     Object.keys(props.auth).length === 0 &&
  //     props.location.pathname !== '/login' &&
  //     props.location.pathname !== '/registro' &&
  //     props.location.pathname !== '/recuperar'
  //   ) {
  //     props.history.push('/login')
  //   } else if (
  //     props.location.pathname === '/login' ||
  //     props.location.pathname === '/registro' ||
  //     props.location.pathname === '/recuperar'
  //   ) {
  //     console.log('redirigiendo')
  //     Object.keys(props.auth).length > 0 && props.history.push('/')
  //   }
  // }

  render() {
    return !this.props.error ? (
      <Routes />
    ) : (
      <Modal
        title="Ocurrió un error"
        visible={this.props.error}
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
