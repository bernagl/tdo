import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { getProductosPorCategoria } from '../actions/productos_actions'
import { getProductosByCategoria } from '../actions/categorias_actions'
import { toggleLoading } from '../actions/general_actions'
import { LoadingCard, Producto } from '../components'

class Categoria extends Component {
  constructor(props) {
    super(props)
    this.renderProductos = this.renderProductos.bind(this)
  }

  componentDidMount() {
    this.props.getProductosByCategoria(this.props.match.params.id)
    // this.props.productos[this.props.match.params.id].length === 0 &&
    //   this.props.productos[this.props.match.params.id]
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      // this.props.productos.categoria = []
      // this.props.toggleLoading(true)
      this.props.getProductosByCategoria(newProps.match.params.id)
    }
  }

  componentDidCatch() {
    console.log('error')
  }

  renderProductos() {
    return this.props.productos[this.props.match.params.id].map(
      (producto, key) => {
        return <Producto producto={producto} link key={key} />
      }
    )
  }

  render() {
    const { match, productos } = this.props
    return productos[match.params.id] ? (
      <div className="row">{this.renderProductos()}</div>
    ) : (
      <LoadingCard cantidad={5} />
    )
    // productos[]
    // if (
    // this.props.productos.categoria.length <= 0 ||
    // this.props.productos.categoria_seleccionada !== this.props.match.params.id
    // ) {
    //   return (
    //     <div>
    //       <LoadingCard cantidad={5} />
    //     </div>
    //   )
    // }
    // return <div className="row">...</div>
    // return <div className="row">{this.renderProductos()}</div>
  }
}

function mapDispatchToProps({ categorias: { productos }, carrito }) {
  return { productos, carrito }
}

export default connect(mapDispatchToProps, {
  getProductosByCategoria,
  toggleLoading
})(Categoria)
