import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import { Button, Card, message } from 'antd'
import { connect } from 'react-redux'
import { agregarProducto } from '../actions/carrito_actions'
import { setImgHeight } from '../actions/general_actions'
const { Meta } = Card

class Producto extends Component {
  state = { height: '65%' }

  formatearPrecio(precio) {
    return Number(precio)
      .toFixed(2)
      .replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
  }

  componentDidMount() {
    const { id, imgHeight, setImgHeight } = this.props
    setTimeout(() => {
      const height = document.getElementById(`card-${id}`).clientHeight
      // this.setState({ height })
      height && height !== '65%' ? setImgHeight(height) : setImgHeight('65%')
    }, 1000)
  }

  agregarProducto = e => {
    e.preventDefault()
    const { producto } = this.props
    producto.cantidad = 1
    this.props.agregarProducto(producto)
    message.success('Producto agregado', 1)
  }

  render() {
    const { id, imgHeight, link, producto } = this.props
    const productoItem = (
      <Card
        className="product-card-item"
        hoverable
        cover={
          <img
            alt={producto.name}
            src={producto.images[0].src}
            id={`card-${id}`}
          />
        }
      >
        <Meta
          title={`$ ${this.formatearPrecio(producto.price)}`}
          description={producto.name}
        />
        <Button
          icon="shopping-cart"
          shape="circle"
          className="producto-btn-cart"
          onClick={this.agregarProducto}
          style={{
            top: Number(imgHeight) ? imgHeight - 20 : imgHeight
          }}
        />
      </Card>
    )
    return (
      <div className="col-xs-6" style={{ display: 'flex', padding: '.5rem' }}>
        {link ? (
          <Link
            to={`/producto/${producto.id}`}
            key={producto.id}
            style={{ display: 'flex' }}
          >
            {productoItem}
          </Link>
        ) : (
          { productoItem }
        )}
      </div>
      // </Col>
    )
  }
}

const mapDispatchToProps = ({ general: { imgHeight } }) => ({ imgHeight })

export default connect(mapDispatchToProps, { agregarProducto, setImgHeight })(
  Producto
)
