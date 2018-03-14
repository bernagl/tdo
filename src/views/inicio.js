import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  getProductos,
  getProductosDestacados
} from '../actions/productos_actions'
import { LoadingCard } from '../components'
import { InputSearch, Producto, Sidebar } from '../components'
import DocumentTitle from 'react-document-title'

class Inicio extends Component {
  constructor(props) {
    super(props)
    this.renderProducto = this.renderProducto.bind(this)
  }

  componentDidMount() {
    this.props.getProductos()
  }

  renderProducto(columna) {
    const { data } = this.props.productos
    const productos = []

    for (const producto in data) {
      productos.push(
        <Producto
          producto={data[producto]}
          link
          key={data[producto].id}
          id={data[producto].id}
        />
      )
    }

    return productos
  }

  render() {
    if (Object.keys(this.props.productos.data).length <= 0) {
      return <LoadingCard cantidad={5} />
    }
    return (
      <DocumentTitle title="Inicio">
        <div className="row">
          <InputSearch history={this.props.history} />
          {this.renderProducto()}
        </div>
      </DocumentTitle>
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
