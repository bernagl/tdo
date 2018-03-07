import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Col, List, message, Row } from 'antd'
import { connect } from 'react-redux'
import { getPedidos } from '../actions/pedido_actions'

class PedidoList extends Component {
  constructor(props) {
    super(props)
    this.renderPedidos = this.renderPedidos.bind(this)
    this.state = { loading: true }
  }

  async componentDidMount() {
    message.destroy()
    this.setState({ marginTop: 45 })
    message.config({ top: 125 })
    message.loading('Verificando nuevos pedidos', 10000)
    const response = await this.props.getPedidos(this.props.uid)
    console.log('didmount')
  }

  componentDidUpdate() {
    console.log('didupdate')
  }

  componentWillReceiveProps(newsProps) {
    const newData = newsProps.pedido.data
    const oldData = this.props.pedido.data
    message.destroy()
    message.config({ top: 16 })
    newData.length > oldData.length
      ? message.success(`Se cargaron ${newData.length} nuevos pedidos`)
      : message.info('No se encontró ningún pedido nuevo', 1.5)
    this.setState({ marginTop: 0 })
  }

  componentWillUnmount() {
    message.destroy()
    message.config({ top: 16 })
    console.log('unmount')
  }

  renderPedidos() {
    return this.props.pedido.data.map(pedido => {
      return (
        <List.Item key={pedido.id}>
          <Link to={`pedido/${pedido.id}`} className="fw">
            <List.Item.Meta
              avatar={
                <Row
                  type="flex"
                  align="center"
                  className="pedido-item center-text"
                >
                  <Col span={24}>{pedido.id}</Col>
                </Row>
              }
              title={`Total: $${pedido.total}`}
              description={`${pedido.line_items.length} productos`}
            />
          </Link>
        </List.Item>
      )
    })
  }

  render() {
    const { marginTop } = this.state
    const { data } = this.props.pedido
    console.log(marginTop)
    return (
      <div style={{ marginTop: marginTop }}>
        {data.length > 0 ? (
          <List className="pedido-list">{this.renderPedidos()}</List>
        ) : (
          <Row type="flex">
            <Col span={24}>
              {/* <Icon type="loading" /> */}
              <span>No tienes ningún pedido</span>
            </Col>
          </Row>
        )}
      </div>
    )
  }
}

function mapStateToProps({ pedido }) {
  return { pedido }
}

export default connect(mapStateToProps, { getPedidos })(PedidoList)
