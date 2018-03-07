import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Formsy from 'formsy-react'
import { setDireccion } from '../actions/direccion_actions'
import { Button, Col, Divider, Icon, message, Row } from 'antd'
import { Minput, Mselect } from '../components'

class DireccionForm extends Component {
  constructor(props) {
    super(props)
    this.disableButton = this.disableButton.bind(this)
    this.enableButton = this.enableButton.bind(this)
    this.submit = this.submit.bind(this)
    this.state = {
      canSubmit: false,
      loading: false,
      direccion: {
        user_login: '',
        last_name: '',
        user_email: '',
        user_phone: '',
        address_1: '',
        numero: '',
        colonia: '',
        postcode: '',
        city: '',
        state: ''
      }
    }
  }

  componentDidMount() {
    const { auth, direccion } = this.props
    direccion
      ? this.setState({ direccion: { ...direccion } })
      : this.setState({
          direccion: { first_name: auth.user_login, email: auth.email }
        })
  }

  disableButton() {
    this.setState({ canSubmit: false })
  }

  enableButton() {
    this.setState({ canSubmit: true })
  }

  async submit(model) {
    const { props } = this
    console.log(model)
    this.setState({ loading: true })
    const response = await props.setDireccion(model)
    // const response = await (props.id
    //   ? props.actualizarDireccion(model)
    //   : props.agregarDireccion(model))
    this.setState({ loading: false })
    response &&
      message.success(
        'Dirección agregada, puedes continuar con el proceso de compra'
      )
    // if (response) {
    //   let text = 'Dirección agregada'
    //   props.id && (text = 'Dirección actualizada')
    //   message.success(text)
    //   props.view === 'perfil'
    //     ? props.history.goBack()
    //     : props.history.push('/carrito/1')
    // }
  }

  render() {
    const { direccion } = this.props.id ? this.props : this.state
    return (
      <div className="row">
        {/* <div className="col-xs-12">
          <h2>Detalles del envío</h2>
        </div> */}
        <div className="col-xs-12">
          <Formsy
            onValidSubmit={this.submit}
            onValid={this.enableButton}
            onInvalid={this.disableButton}
          >
            <Divider>Información</Divider>
            <Minput
              placeholder="Nombre"
              name="first_name"
              type="text"
              validations="minLength:2"
              value={direccion.first_name || ''}
              validationError="Ingresa un nombre válido"
              required
            />
            <Minput
              placeholder="Apellidos"
              name="last_name"
              type="text"
              validations="minLength:2"
              value={direccion.last_name || ''}
              validationError="Ingresa un apellido válido"
              required
            />
            <Minput
              placeholder="Correo"
              name="email"
              type="text"
              validations="isEmail"
              value={direccion.email || ''}
              validationError="Ingresa un correo válido"
              required
            />
            <Minput
              placeholder="Teléfono"
              name="phone"
              type="text"
              validations="minLength:10"
              value={direccion.phone || ''}
              validationError="Ingresa un teléfono válido"
              required
            />
            <Divider>Dirección</Divider>
            <Minput
              placeholder="Calle"
              name="address_1"
              type="text"
              validations="minLength:6"
              value={direccion.address_1 || ''}
              validationError="Ingresa una calle de mínimo 6 caracteres"
              required
            />
            <Minput
              placeholder="Número"
              name="numero"
              type="text"
              validations={{ minLength: 2 }}
              value={direccion.numero || ''}
              validationError="Ingresa un número de mínimo 2 digítos"
              required
            />
            <Minput
              placeholder="Colonia"
              name="colonia"
              type="text"
              validations="minLength:2"
              value={direccion.colonia || ''}
              validationError="Ingresa una colonia válida"
              required
            />
            <Minput
              placeholder="Código postal"
              name="postcode"
              type="text"
              validations="minLength:2"
              value={direccion.postcode || ''}
              validationError="Ingresa una código postal válida"
              required
            />
            <Minput
              placeholder="Ciudad"
              name="city"
              type="text"
              validations="minLength:2"
              value={direccion.city || ''}
              validationError="Ingresa una ciudad válida"
              required
            />

            <Mselect
              placeholder="Estado"
              name="state"
              type="text"
              value={direccion.state || ''}
              validationError="Ingresa un estado válido"
              required
            />
            <Button
              type="primary"
              ghost
              htmlType="submit"
              loading={this.state.loading}
              disabled={!this.state.canSubmit}
            >
              Usar esta dirección
            </Button>
          </Formsy>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps({ auth, direccion }) {
  return { auth, direccion }
}

export default withRouter(
  connect(mapDispatchToProps, { setDireccion })(DireccionForm)
)
