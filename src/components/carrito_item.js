import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Popconfirm } from 'antd'
import { connect } from 'react-redux'
import {
  agregarProducto,
  eliminarProducto,
  restarProducto
} from '../actions/carrito_actions'
import { showAlert } from '../actions/general_actions'

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
    const { producto } = this.props
    return (
      <div className="row middle-xs carrito-item">
        <div className="col-xs-7">
          <div className="row middle-xs">
            <div className="col-xs-4">
              <Link to={`producto/${producto.id}`}>
                <img
                  src={producto.images[0].src}
                  alt=""
                  style={{ width: '100%' }}
                />
              </Link>
            </div>
            <div className="col-xs-8">
              <span>{producto.name}</span>
            </div>
          </div>
        </div>
        <div className="col-xs-5 carrito-item-actions-row">
          <div className="row middle-xs">
            <div className="col-xs-12 center-xs carrito-item-buttons">
              {/* <Icon type="minus" className="minus" /> */}
              <div className="row">
                <div className="col-xs-4">
                  {producto.cantidad === 0 ? (
                    <Popconfirm
                      title="¿Desea eliminar este producto?"
                      onConfirm={this.eliminarProducto.bind(this, producto)}
                      okText="Si"
                      placement="bottom"
                      cancelText="No"
                    >
                      <Button type="primary" shape="circle" icon="minus" />
                    </Popconfirm>
                  ) : (
                    <Button
                      type="primary"
                      shape="circle"
                      icon="minus"
                      onClick={this.restarProducto.bind(this, producto)}
                    />
                  )}
                </div>
                <div className="col-xs-4 col-cantidad">
                  <span className="cantidad">
                    <b>{`${producto.cantidad}`}</b>
                  </span>
                </div>
                <div className="col-xs-4">
                  <Button
                    type="primary"
                    shape="circle"
                    icon="plus"
                    onClick={this.agregarProducto.bind(this, producto)}
                  />
                </div>
              </div>
              {/* <Icon type="plus" className="cprimary bold" className="plus" /> */}
            </div>
            <div className="col-xs-12 end-xs">
              <span className="precio">
                ${' '}
                {Number(producto.price)
                  .toFixed(2)
                  .replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}
              </span>
            </div>
          </div>
        </div>
      </div>
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
