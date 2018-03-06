import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Formsy from 'formsy-react'
import { setDireccion } from '../actions/direccion_actions'
import { Button, Col, Icon, message, Row } from 'antd'
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
        calle: '',
        numero: '',
        colonia: '',
        cp: '',
        ciudad: '',
        estado: ''
      }
    }
  }

  componentDidMount() {
    const { direccion } = this.props
    console.log(direccion)
    direccion && this.setState({ direccion: { ...direccion } })
  }

  disableButton() {
    this.setState({ canSubmit: false })
  }

  enableButton() {
    this.setState({ canSubmit: true })
  }

  async submit(model) {
    const { props } = this
    model.uid = props.uid
    model.id = props.id
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
        <div className="col-xs-12">
          <h4>Dirección de envío</h4>
        </div>
        <div className="col-xs-12">
          <Formsy
            onValidSubmit={this.submit}
            onValid={this.enableButton}
            onInvalid={this.disableButton}
          >
            <Minput
              placeholder="Calle"
              name="calle"
              type="text"
              validations="minLength:6"
              value={direccion.calle || ''}
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
              name="cp"
              type="text"
              validations="minLength:2"
              value={direccion.cp || ''}
              validationError="Ingresa una código postal válida"
              required
            />
            <Minput
              placeholder="Ciudad"
              name="ciudad"
              type="text"
              validations="minLength:2"
              value={direccion.ciudad || ''}
              validationError="Ingresa una ciudad válida"
              required
            />

            <Mselect
              placeholder="Estado"
              name="estado"
              type="text"
              value={direccion.estado || ''}
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

function mapDispatchToProps({ direccion }) {
  return { direccion }
}

export default withRouter(
  connect(mapDispatchToProps, { setDireccion })(DireccionForm)
)
