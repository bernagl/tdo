import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, Col, Divider, message, Row } from 'antd'
import { connect } from 'react-redux'
import { agregarProducto } from '../actions/carrito_actions'
const { Meta } = Card

class Producto extends Component {
  formatearPrecio(precio) {
    return Number(precio)
      .toFixed(2)
      .replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
  }

  agregarProducto = e => {
    e.preventDefault()
    const { producto } = this.props
    producto.cantidad = 1
    this.props.agregarProducto(producto)
    message.success('Producto agregado')
  }

  render() {
    const { link, producto } = this.props
    const productoItem = (
      <Card
        className="product-card-item"
        hoverable
        cover={<img alt={producto.name} src={producto.images[0].src} />}
      >
        <Meta
          title={`$ ${this.formatearPrecio(producto.price)}`}
          description={producto.name}
        />
        <Button
          icon="shopping-cart"
          shape="circle"
          className="producto-btn-cart"
          onClick={this.agregarProducto}
        />
        {/* <Divider style={{ margin: '15px 0 10px 0' }} /> */}
        {/* <div className="row center-text">
          <div className="col-xs-12">${producto.price}</div>
        </div> */}
      </Card>
    )
    return (
      // <Col span={12} style={{}}>
      <div className="col-xs-6" style={{ display: 'flex', padding: '.5rem' }}>
        {link ? (
          <Link
            to={`/producto/${producto.id}`}
            key={producto.id}
            style={{ display: 'flex' }}
          >
            {productoItem}
          </Link>
        ) : (
          { productoItem }
        )}
      </div>
      // </Col>
    )
  }
}

export default connect(null, { agregarProducto })(Producto)
