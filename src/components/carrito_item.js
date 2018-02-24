import React, { Component } from 'react'
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
    console.log(this.props)
    return (
      <div className="row middle-xs carrito-item" style={{ margin: '5px 0' }}>
        <div className="col-xs-7">
          <div className="row middle-xs">
            <div className="col-xs-4">
              <img
                src={this.props.producto.images[0].src}
                alt=""
                style={{ width: '100%' }}
              />
            </div>
            <div className="col-xs-8">
              <span>{this.props.producto.name}</span>
            </div>
          </div>
        </div>
        <div className="col-xs-5">
          <div className="row middle-xs">
            <div className="col-xs-6 center-xs middle-xs">
              {/* <Icon type="minus" className="minus" /> */}
              {this.props.producto.cantidad === 0 ? (
                <Popconfirm
                  title="¿Desea eliminar este producto?"
                  onConfirm={this.eliminarProducto.bind(
                    this,
                    this.props.producto
                  )}
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
                  onClick={this.restarProducto.bind(this, this.props.producto)}
                />
              )}
              <span className="cantidad">{`${
                this.props.producto.cantidad
              }`}</span>
              <Button
                type="primary"
                shape="circle"
                icon="plus"
                onClick={this.agregarProducto.bind(this, this.props.producto)}
              />
              {/* <Icon type="plus" className="cprimary bold" className="plus" /> */}
            </div>
            <div className="col-xs-6 end-xs">
              <span className="precio">
                ${' '}
                {Number(this.props.producto.price)
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
