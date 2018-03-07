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
  }

  componentDidMount() {
    // this.props.getProductosDestacados()
    this.props.getProductos()
  }

  renderProducto(columna) {
    const { data } = this.props.productos
    const productos = []

    for (const producto in data) {
      productos.push(
        <Producto producto={data[producto]} link key={data[producto].id} />
      )
    }

    return productos
  }

  render() {
    console.log(this.props)
    if (Object.keys(this.props.productos.data).length <= 0) {
      return <LoadingCard cantidad={5} />
    }
    return (
      <div className="row">
        {this.renderProducto()}
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
