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
    // const { destacados } = this.props.productos
    // const length = Math.round(destacados.length / 2)
    // this.setState({ length })
    this.props.getProductosDestacados()
    this.props.getProductos()
  }

  renderProducto(columna) {
    // const { destacados } = this.props.productos
    // const productos = []
    // const i = columna !== 1 ? this.state.length : 0
    // const l = columna === 1 ? this.state.length : destacados.length
    // for (let index = i; index < l; index++) {
    //   productos.push(<Producto producto={destacados[index]} link key={index} />)
    // }

    // return productos

    const { data } = this.props.productos
    const productos = []

    for (const producto in data) {
      productos.push( <Producto producto={data[producto]} link key={data[producto].id} /> )
    }

    return productos
    // return data.map((producto, key) => {
    //   return <Producto producto={producto} link key={key} />
    // })
  }

  render() {
    console.log(this.props)
    if (this.props.productos.data.length <= 0) {
      return <LoadingCard cantidad={5} />
    }
    return (
      <div className="row">
        {/* <Row type="flex" justify="space-around"  style={{ alignItems: 'stretch' }}>  */}
        {/* <Col span={12}> */}
        {/* <Row>{this.renderProducto(1)}</Row> */}
        {/* </Col> */}
        {/* <Col span={12}> */}
        {/* <Row>{this.renderProducto()}</Row> */}
        {/* </Col> */}
        {this.renderProducto()}
        {/* </Row> */}
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
