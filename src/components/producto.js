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
        // actions={[
        //   <Button
        //     type="normal"
        //     icon="shopping-cart"
        //     size="large"
        //     onClick={this.agregarProducto.bind(this, this.props.producto)}
        //   >
        //     Agregar
        //   </Button>
        // ]}
      >
        <Meta
          title={this.props.producto.name}
          description={this.props.producto.description}
        />
        <Divider />
        <Row className="center-text">
          <Col span={11}>Disponible</Col>
          <Col span={2}>
            <Divider type="vertical" />
          </Col>
          <Col span={11}>${this.props.producto.price}</Col>
        </Row>
      </Card>
    )
    return this.props.link ? (
      <Link
        to={`/producto/${this.props.producto.id}`}
        key={this.props.producto.id}
      >
        {producto}
      </Link>
    ) : (
      <div>{producto}</div>
    )
  }
}

export default connect(null, { agregarProducto })(Producto)
