import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getPedido } from '../actions/pedido_actions'
import { Col, Divider, Icon, List, Row } from 'antd'

class Pedido extends Component {
  constructor(props) {
    super(props)
    this.renderProductos = this.renderProductos.bind(this)
    this.state = { cargando: false }
  }

  componentDidMount() {
    this.props.getPedido(this.props.match.params.id)
  }

  renderProductos(pedido) {
    return pedido.line_items.map(producto => {
      return (
        <List.Item key={producto.id}>
          <Link to={`/producto/${producto.product_id}`}>
            <span>{`${producto.name} `}</span>{' '}
          </Link>
          <Divider type="vertical" />
          <span>{`${producto.quantity} x $${producto.price}`}</span>
        </List.Item>
      )
    })
  }

  render() {
    const { match, pedido } = this.props
    let seleccionado = pedido.data.find(
      pedido => pedido.id === +match.params.id
    )
    !seleccionado && (seleccionado = pedido.seleccionado)
    return Object.keys(seleccionado).length > 0 &&
      seleccionado.id === Number(match.params.id) ? (
      <div className="pedido">
        <Row>
          <Col span={24}>
            <Divider>Detalles del pedido</Divider>
            <span>{`Total: $${seleccionado.total}`}</span>
            <br />
            <span>{`Productos: ${seleccionado.line_items.length}`}</span>
            <br />
            <span>{`Estado del pedido: ${seleccionado.status}`}</span>
          </Col>
          <Col span={24}>
            <Divider>Datos del envío</Divider>
            <span>
              {`Nombre: ${seleccionado.shipping.first_name} ${
                seleccionado.shipping.last_name
              }`}
            </span>
            <br />
            <span>
              {`Dirección: ${seleccionado.shipping.address_1}`}
              <br />
              {`${seleccionado.shipping.city}, ${
                seleccionado.shipping.state
              }, ${seleccionado.shipping.postcode}`}
            </span>
          </Col>
          <Col span={24}>
            <Divider>Productos</Divider>
            <List size="small">{this.renderProductos(seleccionado)}</List>
          </Col>
        </Row>
      </div>
    ) : (
      <Row type="flex" align="middle" className="center-text">
        <Col span={24}>
          <Icon type="loading" />
        </Col>
      </Row>
    )
  }
}

function mapDispatchToProps({ pedido }) {
  return { pedido }
}

export default connect(mapDispatchToProps, { getPedido })(Pedido)
