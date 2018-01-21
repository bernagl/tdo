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
    this.renderImagenes = this.renderImagenes.bind(this)
    this.renderCategorias = this.renderCategorias.bind(this)
    this.renderVariaciones = this.renderVariaciones.bind(this)
  }

  componentDidMount() {
    this.props.getProducto(this.props.match.params.id)
  }

  componentWillUpdate(newProps) {
    Number(newProps.match.params.id) !== newProps.seleccionado.id &&
      this.props.getProducto(newProps.match.params.id)
  }

  agregarProducto(producto) {
    producto.cantidad = 1
    this.props.agregarProducto(producto)
  }

  renderCategorias() {
    return this.props.seleccionado.categories.length > 0 ? (
      this.props.seleccionado.categories.map((categoria, key) => {
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
    return this.props.variaciones.map((producto, key) => {
      if (producto.attributes.length > 0) {
        let varianteText = ''
        varianteText += producto.attributes.map((variacion, key) => {
          return `${variacion.name}: ${variacion.option} `
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
    const producto = this.props.seleccionado
    // console.log(producto)
    // let precio = 0
    // let isProducto = false
    // if (Object.keys(this.props.seleccionado).length === 0) {
    //   isProducto = false
    // } else if (
    //   Number(this.props.match.params.id) === Number(this.props.seleccionado.id)
    // ) {
    //   isProducto = true
    //   precio = Number(producto.price)
    //     .toFixed(2)
    //     .replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
    // }

    return Object.keys(producto).length === 0 ||
      producto.id !== Number(this.props.match.params.id) ? (
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
                {this.props.variaciones.length > 0 ? (
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
    variaciones: productos.variaciones
  }
}

export default connect(mapDispatchToProps, {
  agregarProducto,
  getProducto,
  getVariaciones
})(Producto)
