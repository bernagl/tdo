import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Badge, Button } from 'antd'
import { connect } from 'react-redux'

class Carrito extends Component {
  render() {
    return (
      //   <Affix offsetTop={120} onChange={affixed => console.log(affixed)}>
      <Link to="/carrito" className="carrito-icon">
        <Button type="primary" shape="circle" icon="shopping-cart" className="carrito-btn">
          <Badge count={Object.keys(this.props.carrito).length} className="carrito-btn-badge" />
        </Button>
      </Link>
      //   </Affix>
    )
  }
}

function mapStateToProps({ carrito }) {
  return { carrito }
}

export default connect(mapStateToProps)(Carrito)
