import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  getProductos,
  getProductosDestacados
} from '../actions/productos_actions'
import { Producto } from '../components'
import DocumentTitle from 'react-document-title'
import empty_cart from '../empty_cart.png'

class Search extends Component {
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
    const { search } = this.props.match.params
    const productos = []
    for (const producto in data) {
      data[producto].name.toLowerCase().includes(search.toLowerCase()) &&
        productos.push(
          <Producto
            producto={data[producto]}
            link
            key={data[producto].id}
            id={data[producto].id}
          />
        )
    }

    return productos.length > 0 ? (
      productos
    ) : (
      <img src={empty_cart} style={{ width: '100%' }} alt="" />
    )

    // return (
    //   productos || <img src={empty_cart} style={{ width: '100%' }} alt="" />
    // )
  }

  render() {
    return (
      <DocumentTitle title="Búsqueda">
        <div className="row">
          {/* <InputSearch history={this.props.history} /> */}
          <div className="col-xs-12">
            <h4>Resultados para: {this.props.match.params.search}</h4>
          </div>
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
})(Search)
