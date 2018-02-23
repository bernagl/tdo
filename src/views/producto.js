import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getProducto, getVariaciones } from '../actions/productos_actions'
import { agregarProducto } from '../actions/carrito_actions'
import { LoadingCard } from '../components'
import { Tag, Button, Icon, Layout, Carousel, Row, Col } from 'antd'
const { Footer } = Layout

class Producto extends Component {
  constructor(props) {
    super(props)
    this.state = { producto: false }
    this.renderImagenes = this.renderImagenes.bind(this)
    this.renderCategorias = this.renderCategorias.bind(this)
    this.renderVariaciones = this.renderVariaciones.bind(this)
  }

  componentDidMount() {
    // this.props.getProducto(this.props.match.params.id)
    this.props.getVariaciones(this.props.match.params.id)
  }

  // componentWillReceiveProps(newProps) {
  //   const { productos } = newProps
  //   console.log('productos', productos)
  //   let producto
  //   producto =
  //     productos.length > 0
  //       ? productos.find(producto => producto.id === this.props.match.params.id)
  //       : this.props.getProducto(this.props.match.params.id)

  //   this.setState({ producto })
  // }

  // componentWillUpdate(newProps) {
  //   Number(newProps.match.params.id) !== newProps.seleccionado.id &&
  //     this.props.getProducto(newProps.match.params.id)
  // }

  agregarProducto(producto) {
    producto.cantidad = 1
    this.props.agregarProducto(producto)
  }

  renderCategorias() {
    const producto = this.props.productos[this.props.match.params.id]
    return producto.categories.length > 0 ? (
      producto.categories.map((categoria, key) => {
        return (
          <Tag color="#108ee9" key={key}>
            <Link to={`/categoria/${categoria.id}`}>{categoria.name}</Link>
          </Tag>
        )
      })
    ) : (
      <span>No hay ninguna categoría</span>
    )
  }

  renderImagenes() {
    return this.props.seleccionado.images.map((imagen, key) => {
      return <img src={`${imagen.src}`} alt={`${imagen.name}`} key={key} />
    })
  }

  renderVariaciones() {
    // this.props.match.params.id === this.props.variaciones.id ?
    // console.log(this.props.variaciones.data)
    return this.props.variaciones.data.map((producto, key) => {
      if (producto.attributes.length > 0) {
        let varianteText = ''
        varianteText += producto.attributes.map((variacion, key) => {
        return ` ${variacion.name}: ${variacion.option}`
        })
        return (
          <Tag color="#108ee9" key={key}>
            <Link to={`/producto/${producto.id}`}>{varianteText}</Link>
          </Tag>
        )
      } else {
        return (
          <Tag color="#108ee9" key={key}>
            <Link to={`/producto/${producto.id}`}>
              {producto.attributes[0].option}
            </Link>
          </Tag>
        )
      }
    })
  }

  formatearPrecio(precio) {
    return Number(precio)
      .toFixed(2)
      .replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
  }

  render() {
    const { match, productos, getProducto, variaciones } = this.props
    const producto = productos[match.params.id]
    !producto && getProducto(match.params.id)
    return !producto ? (
      <LoadingCard cantidad={1} />
    ) : (
      <div>
        <Row className="producto-main-row">
          <Col span={24}>
            {producto.images.length > 1 ? (
              <Carousel>{this.renderImagenes()}</Carousel>
            ) : (
              <img
                src={producto.images[0].src}
                style={{ width: '100%' }}
                alt={producto.name}
              />
            )}
          </Col>
          <Col span={24} className="producto-nombre-col">
            <h3>{producto.name}</h3>
          </Col>
          <Col span={24}>
            <p>{producto.description}</p>
            <hr />
          </Col>
          <Col span={24}>
            <h4>Categorías:</h4>
            {this.renderCategorias()}
          </Col>
          <Col span={24} className="producto-variaciones-col">
            {producto.variations.length > 0 && (
              <div>
                <h4>Variantes:</h4>
                {this.props.variaciones.id === match.params.id ? (
                  <div>{this.renderVariaciones()}</div>
                ) : (
                  <Icon type="loading" />
                )}
              </div>
            )}
          </Col>
        </Row>
        <Footer className="producto-footer">
          <Row type="flex" justify="space-around" align="middle">
            <Col span={12} className="producto-precio-col">
              <h1 className="producto-precio">
                ${this.formatearPrecio(producto.price)}
              </h1>
            </Col>
            <Col span={12}>
              <Button
                onClick={this.agregarProducto.bind(this, producto)}
                type="primary"
                icon="shopping-cart"
                className="add-to-cart-button"
              >
                Agregar
              </Button>
            </Col>
          </Row>
        </Footer>
      </div>
    )
  }
}

function mapDispatchToProps({ productos }) {
  return {
    seleccionado: productos.seleccionado,
    productos: productos.data,
    variaciones: productos.variaciones
  }
}

export default connect(mapDispatchToProps, {
  agregarProducto,
  getProducto,
  getVariaciones
})(Producto)
