import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Card, Col, Divider, Row } from 'antd'
import { connect } from 'react-redux'
import { agregarProducto } from '../actions/carrito_actions'
const { Meta } = Card

class Producto extends Component {
  // agregarProducto(producto) {
  //   producto.cantidad = 1
  //   this.props.agregarProducto(producto)
  // }

  render() {
    const producto = (
      <Card
        hoverable
        style={{ width: '100%', margin: '10px 0px' }}
        cover={
          <img
            alt={this.props.producto.name}
            src={this.props.producto.images[0].src}
          />
        }
      >
        <Meta
          title={this.props.producto.name}
          description={this.props.producto.description}
        />
        <Divider style={{ margin: '15px 0 10px 0' }} />
        <div className="row center-text">
          <div className="col-xs-12">${this.props.producto.price}</div>
        </div>
      </Card>
    )
    return (
      <div className="col-xs-12">
        {this.props.link ? (
          <Link
            to={`/producto/${this.props.producto.id}`}
            key={this.props.producto.id}
          >
            {producto}
          </Link>
        ) : (
          { producto }
        )}
      </div>
    )
  }
}

export default connect(null, { agregarProducto })(Producto)
