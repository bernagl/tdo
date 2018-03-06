import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Button,
  Form,
  Icon,
  Input,
  Layout,
  message,
  Radio,
  Row,
  Col
} from 'antd'
import { CarritoItem, DireccionForm } from '../components'
import { enviarPedido, vaciarCarrito } from '../actions/carrito_actions'
import { getDirecciones } from '../actions/perfil_actions'
import empty_cart from '../empty_cart.png'
const { Footer } = Layout
const { Group } = Radio

class Carrito extends Component {
  constructor(props) {
    super(props)
    this.renderProductos = this.renderProductos.bind(this)
    this.enviarPedido = this.enviarPedido.bind(this)
    this.atras = this.atras.bind(this)
    this.siguiente = this.siguiente.bind(this)
    this.state = {
      paso: 0,
      direccion: '',
      status: 'to-top',
      total: 0,
      titulo: 'Enviar pedido'
    }
  }

  componentDidMount() {
    const { paso } = this.props.match.params
    this.getTotal(this.props.carrito)
    // this.props.getDirecciones(this.props.auth.uid)
    this.props.getDirecciones(this.props.auth)
    paso && this.setState({ paso: Number(paso) })
  }

  componentWillReceiveProps(newProps) {
    this.getTotal(newProps.carrito)
  }

  getTotal(carrito) {
    let total = 0
    for (const producto in carrito) {
      total +=
        Number(carrito[producto].cantidad) * Number(carrito[producto].price)
    }
    total = total.toFixed(2)
    this.setState({ total })
  }

  renderProductos() {
    let items = []
    for (const producto in this.props.carrito) {
      items.push(
        <CarritoItem producto={this.props.carrito[producto]} key={producto} />
      )
    }
    return items
  }

  async enviarPedido() {
    let productos = []
    for (const producto in this.props.carrito) {
      productos.push({
        product_id: producto,
        quantity: this.props.carrito[producto].cantidad
      })
    }
    const billing = this.props.direccion.direcciones[this.state.direccion]
    const usuario = this.props.auth
    const direccion = {
      first_name: usuario.nombre,
      last_name: usuario.apellido,
      address_1: billing.calle,
      address_2: '',
      city: billing.ciudad,
      state: billing.estado,
      postcode: billing.cp,
      country: 'MX',
      email: usuario.correo,
      phone: usuario.telefon
    }
    const pedido = {
      billing: direccion,
      shipping: direccion,
      line_items: productos
    }
    this.setState({ status: 'loading', titulo: 'Enviando pedido' })
    const result = await this.props.enviarPedido({
      uid: this.props.auth.uid,
      pedido
    })
    if (result) {
      const body = JSON.parse(result.body)
      this.setState({ status: 'check-circle' })
      this.props.vaciarCarrito()
      message.success(`Tu pedido se ha creado con el id #${body.id}`, 2)
      this.props.history.push(`/pedido/${body.id}`)
    }
  }

  handleDireccion = e => {
    this.setState({
      direccion: e.target.value
    })
  }

  formatearPrecio(precio) {
    return Number(precio)
      .toFixed(2)
      .replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
  }

  renderDirecciones() {
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px'
    }

    return this.props.direccion.direcciones.map((direccion, key) => {
      return (
        <Radio style={radioStyle} value={key} key={direccion.id}>
          {direccion.calle} {direccion.numero}, {direccion.estado}
        </Radio>
      )
    })
  }

  renderUsuarioInfo() {
    const { shipping } = this.state
    return (
      <React.Fragment>
        <Form.Item label="Nombre:">
          <Input
            defaultValue={`${shipping.first_name} ${shipping.last_name}`}
          />
        </Form.Item>
        <Form.Item label="Dirección:">
          <Input defaultValue={shipping.address_1} />
        </Form.Item>
        <Form.Item label="Ciudad:">
          <Input defaultValue={shipping.city} />
        </Form.Item>
        <Form.Item label="Estado:">
          <Input defaultValue={shipping.state} />
        </Form.Item>
        <Form.Item label="Código postal:">
          <Input defaultValue={shipping.postcode} />
        </Form.Item>
      </React.Fragment>
    )
  }

  siguiente() {
    let { paso } = this.state
    paso < 1 && this.setState({ paso: paso + 1 })
  }

  atras() {
    let { paso } = this.state
    paso > 0 && this.setState({ paso: paso - 1 })
  }

  render() {
    const { direcciones } = this.props.direccion
    console.log(this.props)
    if (Object.keys(this.props.carrito).length > 0) {
      return (
        <div className="carrito">
          <div className="carrito-container">
            {this.state.paso === 0 && this.renderProductos()}
            {this.state.paso === 1 && (
              <Row>
                <Col span={24}>
                  <DireccionForm />
                </Col>
              </Row>
            )}
          </div>
          <Footer className="carrito-footer">
            <Row type="flex" justify="space-around" align="middle">
              <Col span={24} className="carrito-precio-col">
                <h1 className="carrito-precio">
                  Total: ${this.formatearPrecio(this.state.total)}
                </h1>
              </Col>
              <Col span={24}>
                <Button.Group size="large" className="carrito-grupo-de-botones">
                  <Button
                    onClick={this.atras}
                    disabled={this.state.paso === 0 && true}
                    type="primary"
                    className="carrito-atras-siguiente-btn"
                  >
                    <Icon type="left" />Atrás
                  </Button>
                  {this.state.paso < 1 ? (
                    <Button
                      onClick={this.siguiente}
                      type="primary"
                      className="carrito-atras-siguiente-btn"
                    >
                      Siguiente<Icon type="right" />
                    </Button>
                  ) : (
                    <Button
                      type="primary"
                      icon={this.state.status}
                      onClick={this.enviarPedido}
                      className="carrito-atras-siguiente-btn"
                      disabled={
                        !this.props.direccion &&
                        this.state.direccion !== 0 &&
                        true
                      }
                    >
                      {this.state.titulo}
                    </Button>
                  )}
                </Button.Group>
              </Col>
            </Row>
          </Footer>
        </div>
      )
    }
    return (
      <div>
        <img src={empty_cart} style={{ width: '100%' }} alt="" />
      </div>
    )
  }
}

function mapDispatchToProps({ auth, carrito, direccion }) {
  return { auth, carrito, direccion }
}

export default connect(mapDispatchToProps, {
  enviarPedido,
  getDirecciones,
  vaciarCarrito
})(Carrito)
