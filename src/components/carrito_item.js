import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Avatar, Card, Icon, Popconfirm } from 'antd'
import { connect } from 'react-redux'
import {
  agregarProducto,
  eliminarProducto,
  restarProducto
} from '../actions/carrito_actions'
import { showAlert } from '../actions/general_actions'

const { Meta } = Card
const alert = {
  show: true,
  message: 'Producto eliminado',
  type: 'success',
  showIcon: true
}

class CarritoItem extends Component {
  agregarProducto(producto) {
    this.props.agregarProducto(producto)
  }

  eliminarProducto(producto) {
    this.props.eliminarProducto(producto)
    this.props.showAlert(alert)
  }

  restarProducto(producto) {
    this.props.restarProducto(producto)
  }

  render() {
    return (
      <Card
        style={{ width: '100%', marginTop: 10 }}
        actions={[
          <Icon
            type="plus"
            onClick={this.agregarProducto.bind(this, this.props.producto)}
          />,
          this.props.producto.cantidad === 0 ? (
            <Popconfirm
              title="¿Desea eliminar este producto?"
              onConfirm={this.eliminarProducto.bind(this, this.props.producto)}
              okText="Si"
              placement="left"
              cancelText="No"
            >
              <Icon type="minus" />
            </Popconfirm>
          ) : (
            <Icon
              type="minus"
              onClick={this.restarProducto.bind(this, this.props.producto)}
            />
          ),
          <Popconfirm
            title="¿Desea eliminar este producto?"
            onConfirm={this.eliminarProducto.bind(this, this.props.producto)}
            okText="Si"
            placement="left"
            cancelText="No"
          >
            <Icon type="delete" />
          </Popconfirm>
        ]}
      >
        <Link to={`/producto/${this.props.producto.id}`}>
          <Meta
            avatar={
              <Avatar
                src={this.props.producto.images[0].src}
                shape="square"
                size="large"
              />
            }
            title={this.props.producto.name}
            description={`Cantidad: ${this.props.producto.cantidad} x $${Number(
              this.props.producto.price
            )
              .toFixed(2)
              .replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}`}
          />
        </Link>
      </Card>
    )
  }
}

function mapStateToProps({ carrito }) {
  return { carrito }
}

export default connect(mapStateToProps, {
  agregarProducto,
  eliminarProducto,
  restarProducto,
  showAlert
})(CarritoItem)
