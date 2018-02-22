import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  getProductos,
  getProductosDestacados
} from '../actions/productos_actions'
import { LoadingCard } from '../components'
import { Producto } from '../components'

class Inicio extends Component {
  constructor(props) {
    super(props)
    this.renderProducto = this.renderProducto.bind(this)
    this.state = { length: 0, current: 0 }
  }

  componentDidMount() {
    const { destacados } = this.props.productos
    const length = Math.round(destacados.length / 2)
    this.setState({ length })
    this.props.getProductosDestacados()
    this.props.getProductos()
  }

  renderProducto(columna) {
    const { destacados } = this.props.productos
    const productos = []
    const i = columna !== 1 ? this.state.length : 0
    const l = columna === 1 ? this.state.length : destacados.length
    for (let index = i; index < l; index++) {
      // columna === 1 && index <= this.state.length
      //   ?
      productos.push(<Producto producto={destacados[index]} link key={index} />)
      // : productos.push(
      //     <Producto producto={destacados[index]} link key={index} />
      //   )
    }

    return productos
  }

  render() {
    console.log(this.state)
    if (this.props.productos.destacados.length <= 0) {
      return <LoadingCard cantidad={5} />
    }

    return (
      <div className="row">
        <div className="col-xs-6 productos-col-left">
          <div className="row">{this.renderProducto(1)}</div>
        </div>
        <div className="col-xs-6 productos-col-right">
          <div className="row">{this.renderProducto()}</div>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps({ productos, categorias }) {
  return { productos, categorias }
}

export default connect(mapDispatchToProps, {
  getProductos,
  getProductosDestacados
})(Inicio)
